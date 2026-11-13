"""
Causal Graph Compiler & Standardized Markdown Generator for Suzerain.

Implements:
1. Chunked output: lightweight public/data/causal-graph.json (< 2 MB) + lazy per-scene
   chunks under public/data/scenes/{conversationId}.json.
2. Non-dialogue variable producers/consumers: ConversationData.json, DecisionData.json,
   DecreeApprovalData.json, DecreeData.json, BillData.json.
3. Empty logic/connector node collapsing: propagates conditionsString & userScript from
   empty/group/connector nodes onto target child dialogue/choice nodes.
4. 3-tier semantic dictionary & standardized Scenes_Structured/*.md output.
"""

from __future__ import annotations

import json
import re
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from extract_base import ROOT_DIR, load_base_data

SCENES_MD_DIR = ROOT_DIR / "Suzerain Dialogues Database" / "Scenes_Structured"
PUBLIC_DATA_DIR = ROOT_DIR / "public" / "data"
PUBLIC_SCENES_DIR = PUBLIC_DATA_DIR / "scenes"
CAUSAL_GRAPH_PATH = PUBLIC_DATA_DIR / "causal-graph.json"

# Regexes for Lua Variable["..."] AND bare Namespace.Key predicates/mutations (used in TextAsset JSONs)
VAR_TOKEN = r'(?:Variable\[(?:"|\')([^"\']+)(?:"|\')\]|([A-Za-z_][A-Za-z0-9_]*\.[A-Za-z0-9_]+))'
VAR_REF_RE = re.compile(VAR_TOKEN)
# Assignment: Variable["X"] = <expr> or Namespace.Key = <expr> (not ==, ~=, <=, >=)
ASSIGN_RE = re.compile(
    VAR_TOKEN + r'\s*(=|\+=|-=)\s*([^;\n]+)'
)
# Comparison: Variable["X"] <op> <val> or Namespace.Key <op> <val>
PRED_RE = re.compile(
    VAR_TOKEN + r'\s*(==|~=|>=|<=|>|<)\s*([^\s\)\];,]+)'
)
# Helper calls like ChangeBudget(x), SetVariable("X", val), etc.
HELPER_VAR_RE = re.compile(
    r'(?:SetVariable|GetVariable|IncVariable)\(\s*(?:"|\')([^"\']+)(?:"|\')\s*(?:,\s*([^)]+))?\)'
)


def parse_predicates(cond_str: str) -> list[dict[str, str]]:
    """Extract VariablePredicate records from a Lua/TextAsset condition string."""
    if not cond_str or not cond_str.strip():
        return []
    preds: list[dict[str, str]] = []
    seen: set[tuple[str, str, str]] = set()
    for m in PRED_RE.finditer(cond_str):
        var = m.group(1) or m.group(2)
        op, val = m.group(3), m.group(4).strip()
        key = (var, op, val)
        if key not in seen:
            seen.add(key)
            preds.append({"var": var, "op": op, "value": val})
    # Also catch bare boolean checks like `Variable["X"]` or `BaseGame.Flag` without explicit == true
    for m in VAR_REF_RE.finditer(cond_str):
        var = m.group(1) or m.group(2)
        if not any(p["var"] == var for p in preds):
            start = max(0, m.start() - 6)
            prefix = cond_str[start : m.start()]
            val = "false" if ("not " in prefix or "!" in prefix) else "true"
            key = (var, "==", val)
            if key not in seen:
                seen.add(key)
                preds.append({"var": var, "op": "==", "value": val})
    return preds


def parse_mutations(script_str: str) -> list[dict[str, str]]:
    """Extract VariableMutation records from a Lua userScript / Instruction string."""
    if not script_str or not script_str.strip():
        return []
    muts: list[dict[str, str]] = []
    seen: set[tuple[str, str, str]] = set()
    for stmt in re.split(r"[;\n]+", script_str):
        stmt = stmt.strip()
        if not stmt:
            continue
        m = ASSIGN_RE.search(stmt)
        if m:
            var = m.group(1) or m.group(2)
            op, val = m.group(3), m.group(4).strip()
            if not val.startswith("="):
                key = (var, op, val)
                if key not in seen:
                    seen.add(key)
                    muts.append({"var": var, "op": op, "value": val})
                continue
        hm = HELPER_VAR_RE.search(stmt)
        if hm:
            var = hm.group(1)
            val = (hm.group(2) or "true").strip()
            key = (var, "=", val)
            if key not in seen:
                seen.add(key)
                muts.append({"var": var, "op": "=", "value": val})
    return muts


def _infer_story_pack_for_var(var_key: str) -> str:
    if var_key.startswith("Rizia"):
        return "StoryPack_Rizia"
    if var_key.startswith("BaseGame"):
        return "StoryPack_Main"
    return "Shared"


def _infer_category_for_var(var_key: str) -> str:
    if "." not in var_key:
        return "General"
    ns, rest = var_key.split(".", 1)
    if "Journal" in rest:
        return "Journal"
    if "Policy" in rest or "Decree" in rest:
        return "Policy"
    if "CollectionItem" in rest:
        return "Collectible"
    if "Relationship" in rest or "Relation" in rest:
        return "Relationship"
    if "Decision" in rest:
        return "Decision"
    if ns == "GameCondition":
        return "GameCondition"
    return ns


def _humanize_token(token: str) -> str:
    # Split CamelCase and underscores
    s = token.replace("_", " ")
    s = re.sub(r"([a-z])([A-Z])", r"\1 \2", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def build_semantic_dictionary(base_data: dict[str, Any]) -> dict[str, dict[str, str]]:
    """3-tier semantic dictionary: BASE TextAsset titles -> Suzerain.dat Variable.Description -> prefix rules."""
    dictionary: dict[str, dict[str, str]] = {}

    # Tier 1: BASE TextAsset entities (Journal, Decision, Decree, Codex, Bill)
    for item in base_data.get("journals", []):
        name = item.get("NameInDatabase", "")
        title = item.get("JournalEntryProperties", {}).get("Title", "") or item.get("Title", "")
        if name and title:
            for prefix in ("BaseGameSupport.", "RiziaDLCSupport.", ""):
                key = f"{prefix}{name}"
                dictionary[key] = {"label": title, "source": "JournalEntryData"}

    for item in base_data.get("decisions", []):
        name = item.get("NameInDatabase", "")
        title = item.get("DecisionProperties", {}).get("Title", "")
        if name and title:
            dictionary[name] = {"label": title, "source": "DecisionData"}

    for item in base_data.get("decrees", []):
        name = item.get("NameInDatabase", "")
        title = item.get("DecreeProperties", {}).get("Title", "")
        if name and title:
            dictionary[name] = {"label": title, "source": "DecreeData"}

    for item in base_data.get("codex", []):
        name = item.get("NameInDatabase", "")
        title = item.get("CodexEntryProperties", {}).get("Title", "")
        if name and title:
            dictionary[name] = {"label": title, "source": "CodexEntryData"}

    for item in base_data.get("bills", []):
        name = item.get("NameInDatabase", "")
        bp = item.get("BillProperties", {}) or {}
        title = bp.get("Title", "") or bp.get("HubTitle", "")
        if name and title:
            dictionary[name] = {"label": title, "source": "BillData"}

    # Tier 2: Suzerain.dat Variable Descriptions
    for var in base_data["database"]["variables"]:
        raw_key = var["name"]
        if not raw_key:
            continue
        desc = (var.get("description") or "").strip()
        if raw_key not in dictionary and desc:
            dictionary[raw_key] = {"label": desc, "source": "Suzerain.dat"}

    # Tier 3: Deterministic prefix/token rules for all remaining variables
    for var in base_data["database"]["variables"]:
        raw_key = var["name"]
        if not raw_key or raw_key in dictionary:
            continue
        cat = _infer_category_for_var(raw_key)
        pack = "Rizia" if raw_key.startswith("Rizia") else ("Sordland" if raw_key.startswith("BaseGame") else "Shared")
        short = raw_key.split(".", 1)[-1]
        for pfx in ("Policy_RD_", "Journal_", "Decision_", "CollectionItem_", "Turn0", "Turn1", "Turn"):
            if short.startswith(pfx):
                short = short[len(pfx) :]
                break
        label = f"[{pack} {cat}] {_humanize_token(short)}"
        dictionary[raw_key] = {"label": label, "source": "Rule"}

    return dictionary


def _is_empty_logic_node(entry: dict[str, Any]) -> bool:
    fields = entry["fields"]
    en = (fields.get("en") or "").strip()
    menu_en = (fields.get("Menu Text en") or "").strip()
    dlg = (fields.get("Dialogue Text") or "").strip()
    menu = (fields.get("Menu Text") or "").strip()
    has_text = bool(en or menu_en or dlg or menu)
    return entry["isGroup"] or not has_text


def collapse_logic_nodes(conv: dict[str, Any]) -> dict[int, dict[str, Any]]:
    """
    Refinement 3: Collapse empty logic/connector nodes in a conversation.
    Propagates conditionsString & userScript from empty/group/connector nodes
    onto their target child dialogue/choice nodes (with cycle protection).
    """
    entries_by_id: dict[int, dict[str, Any]] = {e["id"]: e for e in conv["entries"]}
    inherited_conds: dict[int, list[str]] = defaultdict(list)
    inherited_scripts: dict[int, list[str]] = defaultdict(list)

    # Topological / BFS propagation from every empty node that has logic or links
    for entry in conv["entries"]:
        if not _is_empty_logic_node(entry):
            continue
        own_cond = (entry.get("conditionsString") or "").strip()
        own_script = (entry.get("userScript") or "").strip()
        if not own_cond and not own_script:
            continue

        # Propagate down through any chain of empty/connector nodes to non-empty children
        queue: list[tuple[int, set[int]]] = [(entry["id"], {entry["id"]})]
        while queue:
            curr_id, visited = queue.pop(0)
            curr = entries_by_id.get(curr_id)
            if not curr:
                continue
            for link in curr.get("outgoingLinks", []):
                if link["destinationConversationID"] != conv["id"]:
                    continue
                dest_id = link["destinationDialogueID"]
                if dest_id in visited:
                    continue
                dest = entries_by_id.get(dest_id)
                if not dest:
                    continue
                if _is_empty_logic_node(dest) or link.get("isConnector"):
                    if len(visited) < 25:
                        queue.append((dest_id, visited | {dest_id}))
                else:
                    if own_cond and own_cond not in inherited_conds[dest_id]:
                        inherited_conds[dest_id].append(own_cond)
                    if own_script and own_script not in inherited_scripts[dest_id]:
                        inherited_scripts[dest_id].append(own_script)

    collapsed: dict[int, dict[str, Any]] = {}
    for eid, entry in entries_by_id.items():
        conds = list(inherited_conds.get(eid, []))
        own_c = (entry.get("conditionsString") or "").strip()
        if own_c and own_c not in conds:
            conds.append(own_c)

        scripts = list(inherited_scripts.get(eid, []))
        own_s = (entry.get("userScript") or "").strip()
        if own_s and own_s not in scripts:
            scripts.append(own_s)

        merged_cond = " and ".join(f"({c})" if len(conds) > 1 else c for c in conds) if conds else None
        merged_script = "\n".join(scripts) if scripts else ""

        collapsed[eid] = {
            **entry,
            "effectiveConditions": merged_cond,
            "effectiveUserScript": merged_script,
            "isEmptyLogic": _is_empty_logic_node(entry),
        }
    return collapsed


def _safe_filename(title: str, conv_id: int) -> str:
    slug = re.sub(r"[^A-Za-z0-9_\-]+", "_", title).strip("_")
    return f"{conv_id:03d}_{slug}.md"


def emit_scene_markdown(
    conv: dict[str, Any],
    collapsed_nodes: dict[int, dict[str, Any]],
    actors: dict[int, dict[str, Any]],
    vars_read: list[str],
    vars_mod: list[str],
    achievements_linked: list[str],
) -> None:
    """Write standardized Markdown with YAML frontmatter and DAG anchor references."""
    SCENES_MD_DIR.mkdir(parents=True, exist_ok=True)
    out_path = SCENES_MD_DIR / _safe_filename(conv["title"], conv["id"])

    lines: list[str] = [
        "---",
        f"conversationId: {conv['id']}",
        f'title: "{conv["title"]}"',
        f'storyPack: "{conv["storyPack"]}"',
        f"turn: {conv['turn']}",
        f'turnLabel: "{conv["turnLabel"]}"',
        f"isDevNote: {'true' if conv['isDevNote'] else 'false'}",
        "variablesRead:",
    ]
    for v in vars_read[:50]:
        lines.append(f'  - "{v}"')
    if not vars_read:
        lines[-1] = "variablesRead: []"

    lines.append("variablesModified:")
    for v in vars_mod[:50]:
        lines.append(f'  - "{v}"')
    if not vars_mod:
        lines[-1] = "variablesModified: []"

    lines.append("achievementsLinked:")
    for a in achievements_linked:
        lines.append(f'  - "{a}"')
    if not achievements_linked:
        lines[-1] = "achievementsLinked: []"

    lines.extend(["---", "", f"# Scene: {conv['title']}", ""])

    rendered: set[int] = set()

    def render_node(node_id: int, depth: int) -> None:
        if depth > 18:
            return
        node = collapsed_nodes.get(node_id)
        if not node:
            return
        indent = "  " * min(depth, 6)
        if node_id in rendered:
            if not node["isEmptyLogic"]:
                lines.append(f"{indent}- → Converges to `[Node #{node_id}]`")
            return
        rendered.add(node_id)

        fields = node["fields"]
        en = (fields.get("en") or fields.get("Dialogue Text") or "").strip()
        menu_en = (fields.get("Menu Text en") or fields.get("Menu Text") or "").strip()
        seq = (fields.get("Sequence en") or fields.get("Sequence") or "").strip()

        actor_id_str = fields.get("Actor", "")
        speaker = "Narrator"
        if actor_id_str.isdigit():
            speaker = actors.get(int(actor_id_str), {}).get("name", "Narrator")

        if menu_en:
            lines.append(f'{indent}- **Player Choice [Node #{node_id}]:** *"{menu_en}"*')
            if en and en != menu_en:
                lines.append(f'{indent}  - **Spoken ({speaker}):** *"{en}"*')
        elif en:
            lines.append(f'{indent}- **Dialogue [Node #{node_id}] ({speaker}):** *"{en}"*')

        if not node["isEmptyLogic"]:
            if node["effectiveConditions"]:
                lines.append(f"{indent}  - **Condition:** `{node['effectiveConditions']}`")
            if node["effectiveUserScript"]:
                lines.append(f"{indent}  - **Variable Effect:** `{node['effectiveUserScript'].replace(chr(10), '; ')}`")
            if seq and seq != "Continue()":
                lines.append(f"{indent}  - **Sequence:** `{seq}`")

        for link in node.get("outgoingLinks", []):
            if link["destinationConversationID"] == conv["id"]:
                render_node(link["destinationDialogueID"], depth + (0 if node["isEmptyLogic"] else 1))
            else:
                lines.append(
                    f"{indent}  - ↗ Cross-Scene Link → `[Conv #{link['destinationConversationID']} : Node #{link['destinationDialogueID']}]`"
                )

    root_id = 0 if 0 in collapsed_nodes else (min(collapsed_nodes.keys()) if collapsed_nodes else 0)
    if collapsed_nodes:
        render_node(root_id, 0)

    out_path.write_text("\n".join(lines), encoding="utf-8")


def build_all(emit_markdown: bool = True) -> dict[str, Any]:
    base_data = load_base_data()
    db = base_data["database"]
    actors = db["actors"]

    PUBLIC_DATA_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_SCENES_DIR.mkdir(parents=True, exist_ok=True)

    semantic_dict = build_semantic_dictionary(base_data)

    # Variable index accumulator
    var_meta: dict[str, dict[str, Any]] = {}
    for v in db["variables"]:
        raw_key = v["name"]
        if not raw_key:
            continue
        init_raw = v.get("initialValue", "")
        init_val: Any = init_raw
        if init_raw.lower() == "true":
            init_val = True
        elif init_raw.lower() == "false":
            init_val = False
        elif re.fullmatch(r"-?\d+(?:\.\d+)?", init_raw):
            init_val = float(init_raw) if "." in init_raw else int(init_raw)

        var_meta[raw_key] = {
            "rawKey": raw_key,
            "label": semantic_dict.get(raw_key, {}).get("label", raw_key),
            "category": _infer_category_for_var(raw_key),
            "storyPack": _infer_story_pack_for_var(raw_key),
            "initialValue": init_val,
            "mutatedIn": [],
            "readIn": [],
            "achievements": [],
        }

    def ensure_var(raw_key: str) -> dict[str, Any]:
        if raw_key not in var_meta:
            var_meta[raw_key] = {
                "rawKey": raw_key,
                "label": semantic_dict.get(raw_key, {}).get("label", raw_key),
                "category": _infer_category_for_var(raw_key),
                "storyPack": _infer_story_pack_for_var(raw_key),
                "initialValue": False,
                "mutatedIn": [],
                "readIn": [],
                "achievements": [],
            }
        return var_meta[raw_key]

    # 1. Index Achievements (ConditionalAchievementData.json)
    achievements_index: dict[str, Any] = {}
    for ach in base_data["conditionalAchievements"]:
        ach_id = ach.get("NameInDatabase", "")
        props = ach.get("ConditionalAchievementProperties", {})
        cond = props.get("Condition", "") or ""
        packs = ach.get("AppBundleProperties", {}).get("StoryPacks", [])
        preds = parse_predicates(cond)
        for p in preds:
            vm = ensure_var(p["var"])
            if ach_id and ach_id not in vm["achievements"]:
                vm["achievements"].append(ach_id)
        if ach_id:
            achievements_index[ach_id] = {
                "id": ach_id,
                "storyPacks": packs,
                "conditionRaw": cond,
                "predicates": preds,
            }

    # 2. Index Non-Dialogue Variable Producers/Consumers (Refinement 2)
    # 2a. ConversationData.json StoryFragmentProperties
    for item in base_data["conversationData"]:
        title = item.get("NameInDatabase", "")
        sf = item.get("StoryFragmentProperties", {}) or {}
        t_num = -1
        m_turn = re.search(r"Turn0*(\d+)", title, re.IGNORECASE)
        if m_turn:
            t_num = int(m_turn.group(1))
        for cond_field in ("StoryFragmentCondition",):
            c_str = sf.get(cond_field, "") or ""
            for p in parse_predicates(c_str):
                ensure_var(p["var"])["readIn"].append(
                    {
                        "sourceType": "conversation_fragment",
                        "entityId": title,
                        "title": title,
                        "turn": t_num,
                        "condition": f"{p['op']} {p['value']}",
                    }
                )
        for instr_field in ("OnStoryFragmentBeginInstruction", "OnStoryFragmentEndInstruction"):
            i_str = sf.get(instr_field, "") or ""
            for mut in parse_mutations(i_str):
                ensure_var(mut["var"])["mutatedIn"].append(
                    {
                        "sourceType": "conversation_fragment",
                        "entityId": title,
                        "title": title,
                        "turn": t_num,
                        "value": f"{mut['op']} {mut['value']}",
                    }
                )

    # 2b. DecisionData.json
    for item in base_data["decisions"]:
        eid = item.get("NameInDatabase", "")
        dp = item.get("DecisionProperties", {}) or {}
        title = dp.get("Title", eid)
        for opt in dp.get("Options", []):
            opt_text = opt.get("Text", "")
            for p in parse_predicates(opt.get("Condition", "") or ""):
                ensure_var(p["var"])["readIn"].append(
                    {
                        "sourceType": "decision",
                        "entityId": eid,
                        "title": f"{title}: {opt_text[:48]}",
                        "turn": -1,
                        "condition": f"{p['op']} {p['value']}",
                    }
                )
            for mut in parse_mutations(opt.get("Instruction", "") or ""):
                ensure_var(mut["var"])["mutatedIn"].append(
                    {
                        "sourceType": "decision",
                        "entityId": eid,
                        "title": f"{title}: {opt_text[:48]}",
                        "turn": -1,
                        "value": f"{mut['op']} {mut['value']}",
                    }
                )

    # 2c. DecreeApprovalData.json
    for item in base_data["decreeApprovals"]:
        eid = item.get("NameInDatabase", "")
        dap = item.get("DecreeApprovalProperties", {}) or {}
        for cond_obj in dap.get("DecreeApprovalConditions", []):
            for p in parse_predicates(cond_obj.get("Condition", "") or ""):
                ensure_var(p["var"])["readIn"].append(
                    {
                        "sourceType": "decree_approval",
                        "entityId": eid,
                        "title": eid,
                        "turn": -1,
                        "condition": f"{p['op']} {p['value']}",
                    }
                )

    # 2d. DecreeData.json
    for item in base_data["decrees"]:
        eid = item.get("NameInDatabase", "")
        dp = item.get("DecreeProperties", {}) or {}
        title = dp.get("Title", eid)
        for p in parse_predicates(dp.get("IsEnabled", "") or ""):
            ensure_var(p["var"])["readIn"].append(
                {
                    "sourceType": "decree",
                    "entityId": eid,
                    "title": title,
                    "turn": -1,
                    "condition": f"{p['op']} {p['value']}",
                }
            )
        for mut in parse_mutations(dp.get("OnDecreeEnact", "") or ""):
            ensure_var(mut["var"])["mutatedIn"].append(
                {
                    "sourceType": "decree",
                    "entityId": eid,
                    "title": title,
                    "turn": -1,
                    "value": f"{mut['op']} {mut['value']}",
                }
            )

    # 2e. BillData.json
    for item in base_data.get("bills", []):
        eid = item.get("NameInDatabase", "") or item.get("Id", "")
        bp = item.get("BillProperties", {}) or {}
        title = bp.get("Title", "") or bp.get("HubTitle", "") or eid
        for p in parse_predicates(bp.get("IsVetoDisabledCondition", "") or ""):
            ensure_var(p["var"])["readIn"].append(
                {
                    "sourceType": "bill",
                    "entityId": eid,
                    "title": title,
                    "turn": -1,
                    "condition": f"{p['op']} {p['value']}",
                }
            )
        for instr_field in ("SignVariables", "VetoVariables"):
            for mut in parse_mutations(bp.get(instr_field, "") or ""):
                ensure_var(mut["var"])["mutatedIn"].append(
                    {
                        "sourceType": "bill",
                        "entityId": eid,
                        "title": title,
                        "turn": -1,
                        "value": f"{mut['op']} {mut['value']}",
                    }
                )

    # 3. Process all 521 Conversations -> per-scene chunks + summary index
    scenes_summary: dict[str, Any] = {}
    total_nodes_processed = 0

    for conv in db["conversations"]:
        cid = conv["id"]
        collapsed = collapse_logic_nodes(conv)
        scene_nodes: dict[str, Any] = {}
        scene_vars_read: set[str] = set()
        scene_vars_mod: set[str] = set()
        decision_count = 0

        for eid, node in collapsed.items():
            total_nodes_processed += 1
            fields = node["fields"]
            en = (fields.get("en") or fields.get("Dialogue Text") or "").strip()
            menu_en = (fields.get("Menu Text en") or fields.get("Menu Text") or "").strip()
            is_choice = bool(menu_en)

            actor_id_str = fields.get("Actor", "")
            speaker = "Narrator"
            if actor_id_str.isdigit():
                speaker = actors.get(int(actor_id_str), {}).get("name", "Narrator")

            preds = parse_predicates(node["effectiveConditions"] or "")
            muts = parse_mutations(node["effectiveUserScript"] or "")

            if is_choice or preds or muts:
                decision_count += 1

            # Index into variables causal index (avoid double-counting empty nodes whose logic propagated)
            if not node["isEmptyLogic"] or not node.get("outgoingLinks"):
                for p in preds:
                    scene_vars_read.add(p["var"])
                    ensure_var(p["var"])["readIn"].append(
                        {
                            "convId": cid,
                            "nodeId": eid,
                            "turn": conv["turn"],
                            "condition": f"{p['op']} {p['value']}",
                        }
                    )
                for mut in muts:
                    scene_vars_mod.add(mut["var"])
                    ensure_var(mut["var"])["mutatedIn"].append(
                        {
                            "convId": cid,
                            "nodeId": eid,
                            "turn": conv["turn"],
                            "value": f"{mut['op']} {mut['value']}",
                        }
                    )

            outgoing = [
                {"convId": l["destinationConversationID"], "nodeId": l["destinationDialogueID"]}
                for l in node.get("outgoingLinks", [])
            ]

            scene_nodes[str(eid)] = {
                "id": eid,
                "speaker": speaker,
                "isPlayerChoice": is_choice,
                "text": menu_en or en,
                "conditionsRaw": node["effectiveConditions"],
                "variablesRead": preds,
                "variablesModified": muts,
                "outgoingIds": outgoing,
            }

        # Write lazy-loaded per-scene chunk
        chunk_rel = f"/data/scenes/{cid}.json"
        chunk_payload = {
            "conversationId": cid,
            "title": conv["title"],
            "storyPack": conv["storyPack"],
            "turn": conv["turn"],
            "turnLabel": conv["turnLabel"],
            "isDevNote": conv["isDevNote"],
            "rootNodeId": 0 if "0" in scene_nodes else (min(int(k) for k in scene_nodes) if scene_nodes else 0),
            "nodes": scene_nodes,
        }
        (PUBLIC_SCENES_DIR / f"{cid}.json").write_text(
            json.dumps(chunk_payload, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )

        # Linked achievements (via shared variables)
        linked_achs: set[str] = set()
        for v in scene_vars_mod | scene_vars_read:
            for a_id in var_meta.get(v, {}).get("achievements", []):
                linked_achs.add(a_id)

        scenes_summary[str(cid)] = {
            "conversationId": cid,
            "title": conv["title"],
            "storyPack": conv["storyPack"],
            "turn": conv["turn"],
            "turnLabel": conv["turnLabel"],
            "isDevNote": conv["isDevNote"],
            "rootNodeId": chunk_payload["rootNodeId"],
            "nodeCount": len(scene_nodes),
            "decisionCount": decision_count,
            "variablesRead": sorted(scene_vars_read),
            "variablesModified": sorted(scene_vars_mod),
            "achievementsLinked": sorted(linked_achs),
            "chunkPath": chunk_rel,
        }

        if emit_markdown:
            emit_scene_markdown(
                conv,
                collapsed,
                actors,
                sorted(scene_vars_read),
                sorted(scene_vars_mod),
                sorted(linked_achs),
            )

    # Filter variables to cross-scene, non-dialogue, or achievement-linked variables (keeps causal-graph.json < 2 MB)
    # Local single-scene variables remain in per-scene chunks (/data/scenes/{id}.json).
    active_variables: dict[str, Any] = {}
    compact_semantic: dict[str, Any] = {}
    for k, vm in var_meta.items():
        if "Isolated." in k and not vm["achievements"]:
            continue
        has_non_dialogue = any(
            (r.get("sourceType") and r.get("sourceType") != "dialogue")
            for r in (vm["mutatedIn"] + vm["readIn"])
        )
        conv_ids = {r.get("convId") for r in (vm["mutatedIn"] + vm["readIn"]) if r.get("convId") is not None}
        is_cross_scene = len(conv_ids) > 1 or (bool(vm["mutatedIn"]) and bool(vm["readIn"]))
        if not (vm["achievements"] or has_non_dialogue or is_cross_scene):
            continue
        if vm["mutatedIn"] or vm["readIn"] or vm["achievements"]:
            seen_m: set[tuple[Any, ...]] = set()
            dedup_m = []
            for m_rec in vm["mutatedIn"]:
                sig = (m_rec.get("sourceType"), m_rec.get("convId"), m_rec.get("entityId"), m_rec.get("value"))
                if sig not in seen_m:
                    seen_m.add(sig)
                    dedup_m.append(m_rec)
            seen_r: set[tuple[Any, ...]] = set()
            dedup_r = []
            for r_rec in vm["readIn"]:
                sig = (r_rec.get("sourceType"), r_rec.get("convId"), r_rec.get("entityId"), r_rec.get("condition"))
                if sig not in seen_r:
                    seen_r.add(sig)
                    dedup_r.append(r_rec)

            vm["mutatedIn"] = dedup_m[:3]
            vm["readIn"] = dedup_r[:3]
            compact_vm: dict[str, Any] = {
                "category": vm["category"],
                "storyPack": vm["storyPack"],
                "mutatedIn": vm["mutatedIn"],
                "readIn": vm["readIn"],
            }
            if vm["initialValue"] is not False:
                compact_vm["initialValue"] = vm["initialValue"]
            if vm["achievements"]:
                compact_vm["achievements"] = vm["achievements"]
            # Strip redundant entityId when title is already present on non-dialogue refs
            for ref in compact_vm["mutatedIn"] + compact_vm["readIn"]:
                if ref.get("title") and "entityId" in ref:
                    del ref["entityId"]
            active_variables[k] = compact_vm
            if k in semantic_dict and semantic_dict[k].get("source") != "Rule":
                compact_semantic[k] = semantic_dict[k]

    # Trim scene summary variable lists to keep causal-graph.json < 2 MB
    for s_sum in scenes_summary.values():
        s_sum["variablesRead"] = [
            v for v in s_sum["variablesRead"]
            if v in active_variables and bool(active_variables[v].get("achievements"))
        ][:10]
        s_sum["variablesModified"] = [
            v for v in s_sum["variablesModified"]
            if v in active_variables and bool(active_variables[v].get("achievements"))
        ][:10]
        s_sum.pop("chunkPath", None)

    graph = {
        "version": db["version"],
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "stats": {
            "sceneCount": len(scenes_summary),
            "totalNodes": total_nodes_processed,
            "activeVariableCount": len(active_variables),
            "achievementCount": len(achievements_index),
        },
        "scenes": scenes_summary,
        "variables": active_variables,
        "achievements": achievements_index,
        "semanticDictionary": compact_semantic,
    }

    graph_json = json.dumps(graph, ensure_ascii=False, separators=(",", ":"))
    CAUSAL_GRAPH_PATH.write_text(graph_json, encoding="utf-8")
    size_mb = len(graph_json.encode("utf-8")) / (1024 * 1024)
    print(f"Generated {CAUSAL_GRAPH_PATH} ({size_mb:.2f} MB)")
    print(f"Generated {len(scenes_summary)} scene chunks in {PUBLIC_SCENES_DIR}")
    print(f"Active variables: {len(active_variables)}, Achievements: {len(achievements_index)}, Total nodes: {total_nodes_processed}")
    return graph


if __name__ == "__main__":
    import sys
    emit_md = "--no-md" not in sys.argv
    build_all(emit_markdown=emit_md)
