"""
Raw BASE extractor for Suzerain (Unity DialogueDatabase .dat + base64 TextAsset .json).
Parses Suzerain.dat binary asset and decodes BASE/TextAsset/*.json into structured Python dicts.
"""

from __future__ import annotations

import base64
import json
import os
import re
import struct
from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parents[2]
BASE_DIR = ROOT_DIR / "Suzerain Dialogues Database" / "BASE"
SUZERAIN_DAT_PATH = BASE_DIR / "MonoBehaviour" / "Suzerain.dat"
TEXT_ASSET_DIR = BASE_DIR / "TextAsset"


class BinaryReader:
    """Little-endian 4-byte-aligned Unity binary MonoBehaviour reader."""

    def __init__(self, data: bytes) -> None:
        self.data = data
        self.pos = 0

    def i32(self) -> int:
        val = struct.unpack_from("<i", self.data, self.pos)[0]
        self.pos += 4
        return val

    def f32(self) -> float:
        val = struct.unpack_from("<f", self.data, self.pos)[0]
        self.pos += 4
        return val

    def s(self) -> str:
        n = self.i32()
        if n < 0 or n > 20_000_000:
            raise ValueError(f"Invalid string length {n} at offset {self.pos - 4:#x}")
        raw = self.data[self.pos : self.pos + n]
        self.pos += n
        rem = n % 4
        if rem:
            self.pos += 4 - rem
        return raw.decode("utf-8", errors="replace")

    def skip(self, n: int) -> None:
        self.pos += n

    def skip_pptr(self) -> None:
        self.pos += 12

    def skip_pptr_list(self) -> None:
        cnt = self.i32()
        if cnt < 0 or cnt > 1_000_000:
            raise ValueError(f"Invalid PPtr list count {cnt} at offset {self.pos - 4:#x}")
        self.pos += cnt * 12


def _read_fields(r: BinaryReader) -> dict[str, str]:
    cnt = r.i32()
    if cnt < 0 or cnt > 1000:
        raise ValueError(f"Invalid field count {cnt} at offset {r.pos - 4:#x}")
    fields: dict[str, str] = {}
    for _ in range(cnt):
        title = r.s()
        val = r.s()
        _ftype = r.i32()
        _type_str = r.s()
        fields[title] = val
    return fields


def parse_suzerain_dat(dat_path: Path = SUZERAIN_DAT_PATH) -> dict[str, Any]:
    """Parse Suzerain.dat into actors, variables, and conversations."""
    raw = dat_path.read_bytes()
    r = BinaryReader(raw)

    # MonoBehaviour header (m_GameObject, m_Enabled, m_Script)
    r.skip(28)
    name = r.s()
    version = r.s()
    author = r.s()
    description = r.s()
    global_user_script = r.s()

    emp_count = r.i32()
    r.skip(emp_count * 28)
    _base_id = r.i32()

    # Actors
    actor_count = r.i32()
    actors: dict[int, dict[str, Any]] = {}
    for _ in range(actor_count):
        aid = r.i32()
        fields = _read_fields(r)
        r.skip_pptr()
        r.skip_pptr_list()
        r.skip_pptr()
        r.skip_pptr_list()
        display_name = (
            fields.get("Name en")
            or fields.get("Name")
            or fields.get("Technical Name")
            or f"Actor_{aid}"
        )
        actors[aid] = {
            "id": aid,
            "name": display_name,
            "isPlayer": fields.get("IsPlayer", "").lower() == "true",
            "fields": fields,
        }

    # Items (quests) & Locations
    for _ in range(r.i32()):
        r.i32()
        _read_fields(r)
    for _ in range(r.i32()):
        r.i32()
        _read_fields(r)

    # Variables
    var_count = r.i32()
    variables: list[dict[str, Any]] = []
    for _ in range(var_count):
        vid = r.i32()
        fields = _read_fields(r)
        variables.append(
            {
                "id": vid,
                "name": fields.get("Name", ""),
                "initialValue": fields.get("Initial Value", ""),
                "description": fields.get("Description", ""),
                "type": fields.get("Type", ""),
            }
        )

    # Conversations
    conv_count = r.i32()
    conversations: list[dict[str, Any]] = []
    total_entries = 0

    for _ in range(conv_count):
        cid = r.i32()
        cfields = _read_fields(r)
        r.skip(40)
        r.s()
        r.s()
        r.s()
        r.skip(16)
        r.s()
        r.skip(24)

        entry_count = r.i32()
        total_entries += entry_count
        entries: list[dict[str, Any]] = []

        for _ in range(entry_count):
            eid = r.i32()
            efields = _read_fields(r)
            ec_id = r.i32()
            is_root = r.i32() != 0
            is_group = r.i32() != 0
            _node_color = r.s()
            _delay_sim = r.i32()
            false_condition_action = r.s()
            condition_priority = r.i32()

            link_count = r.i32()
            outgoing_links: list[dict[str, Any]] = []
            for _ in range(link_count):
                orig_conv = r.i32()
                orig_dlg = r.i32()
                dest_conv = r.i32()
                dest_dlg = r.i32()
                is_connector = r.i32() != 0
                priority = r.i32()
                outgoing_links.append(
                    {
                        "originConversationID": orig_conv,
                        "originDialogueID": orig_dlg,
                        "destinationConversationID": dest_conv,
                        "destinationDialogueID": dest_dlg,
                        "isConnector": is_connector,
                        "priority": priority,
                    }
                )

            conditions_string = r.s()
            user_script = r.s()
            p_cnt = r.i32()
            if p_cnt != 0:
                raise ValueError(f"Unexpected non-zero UnityEvent persistentCalls ({p_cnt}) in conv {cid}, entry {eid}")
            r.skip(16)  # canvasRect

            entries.append(
                {
                    "id": eid,
                    "conversationID": ec_id,
                    "isRoot": is_root,
                    "isGroup": is_group,
                    "falseConditionAction": false_condition_action,
                    "conditionPriority": condition_priority,
                    "fields": efields,
                    "outgoingLinks": outgoing_links,
                    "conditionsString": conditions_string,
                    "userScript": user_script,
                }
            )

        r.skip(16)  # canvasScrollPosition + canvasZoom + padding

        conversations.append(
            {
                "id": cid,
                "title": cfields.get("Title", f"Conversation_{cid}"),
                "fields": cfields,
                "entries": entries,
            }
        )

    return {
        "name": name,
        "version": version,
        "author": author,
        "description": description,
        "globalUserScript": global_user_script,
        "actors": actors,
        "variables": variables,
        "conversations": conversations,
        "stats": {
            "actorCount": len(actors),
            "variableCount": len(variables),
            "conversationCount": len(conversations),
            "entryCount": total_entries,
        },
    }


def decode_text_asset(filename: str) -> Any:
    """Decode a base64-wrapped Unity TextAsset JSON file from BASE/TextAsset/."""
    path = TEXT_ASSET_DIR / filename
    with path.open("r", encoding="utf-8") as f:
        outer = json.load(f)
    raw = base64.b64decode(outer["m_Script"]).decode("utf-8")
    return json.loads(raw)


def _infer_turn_from_title(title: str) -> tuple[int, str]:
    lower = title.lower()
    if "prologue" in lower:
        return 0, "Prologue"
    if "epilogue" in lower:
        return 11, "Epilogue"
    m = re.search(r"turn\s*0*(\d+)", lower)
    if m:
        t = int(m.group(1))
        return t, f"Turn {t}"
    return -1, "General"


def load_base_data() -> dict[str, Any]:
    """Load Suzerain.dat and all relevant BASE/TextAsset JSON files, joined with Turn & StoryPack metadata."""
    db = parse_suzerain_dat()

    conv_data = decode_text_asset("ConversationData.json").get("items", [])
    game_flow = decode_text_asset("_GameFlow.json").get("items", [])
    cond_achievements = decode_text_asset("ConditionalAchievementData.json").get("items", [])
    decisions = decode_text_asset("DecisionData.json").get("items", [])
    decree_approvals = decode_text_asset("DecreeApprovalData.json").get("items", [])
    decrees = decode_text_asset("DecreeData.json").get("items", [])
    bills = decode_text_asset("BillData.json").get("items", [])
    journals = decode_text_asset("JournalEntryData.json").get("items", [])
    codex = decode_text_asset("CodexEntryData.json").get("items", [])

    # Build lookup from Conversation Title / NameInDatabase -> ConversationData item
    conv_meta_by_dialogue: dict[str, dict[str, Any]] = {}
    conv_meta_by_name: dict[str, dict[str, Any]] = {}
    for item in conv_data:
        name = item.get("NameInDatabase", "")
        dlg = item.get("ConversationProperties", {}).get("Dialogue", "")
        if dlg:
            conv_meta_by_dialogue[dlg] = item
        if name:
            conv_meta_by_name[name] = item

    # Build Turn & StoryPack lookup from _GameFlow.json
    # Fragment name -> (storyPack, turnNumber, turnLabel, stepIndex)
    flow_by_fragment: dict[str, tuple[str, int, str, int]] = {}
    for pack in game_flow:
        story_pack = pack.get("StoryPack", "StoryPack_Main")
        for turn_obj in pack.get("Turns", []):
            turn_id = turn_obj.get("Id", "") or turn_obj.get("Name", "")
            t_num, t_label = _infer_turn_from_title(str(turn_id))
            if t_num == -1 and isinstance(turn_obj.get("TurnNumber"), int):
                t_num = turn_obj["TurnNumber"]
                t_label = f"Turn {t_num}"
            for step_idx, step in enumerate(turn_obj.get("Steps", [])):
                for frag in step.get("Fragments", []):
                    frag_name = frag if isinstance(frag, str) else frag.get("NameInDatabase", "")
                    if frag_name:
                        flow_by_fragment[frag_name] = (story_pack, t_num, t_label, step_idx)

    # Enrich each conversation in db
    for conv in db["conversations"]:
        title = conv["title"]
        meta = conv_meta_by_dialogue.get(title) or conv_meta_by_name.get(title.split("/")[-1])

        story_pack = "StoryPack_Rizia" if title.startswith("Rizia") else "StoryPack_Main"
        is_dev_note = False
        notes = ""
        name_in_db = title.split("/")[-1]

        if meta:
            name_in_db = meta.get("NameInDatabase", name_in_db)
            packs = meta.get("AppBundleProperties", {}).get("StoryPacks", [])
            if packs:
                story_pack = packs[0]
            is_dev_note = bool(meta.get("IsWIP", False))
            notes = meta.get("Notes", "") or ""
            conv["storyFragmentProperties"] = meta.get("StoryFragmentProperties", {})
        else:
            conv["storyFragmentProperties"] = {}

        if name_in_db in flow_by_fragment:
            f_pack, f_turn, f_label, f_step = flow_by_fragment[name_in_db]
            story_pack = f_pack
            turn_num, turn_label = f_turn, f_label
            step_index = f_step
        else:
            turn_num, turn_label = _infer_turn_from_title(title)
            step_index = -1

        conv["storyPack"] = story_pack
        conv["turn"] = turn_num
        conv["turnLabel"] = turn_label
        conv["stepIndex"] = step_index
        conv["isDevNote"] = is_dev_note
        conv["notes"] = notes
        conv["nameInDatabase"] = name_in_db

    return {
        "database": db,
        "conversationData": conv_data,
        "gameFlow": game_flow,
        "conditionalAchievements": cond_achievements,
        "decisions": decisions,
        "decreeApprovals": decree_approvals,
        "decrees": decrees,
        "bills": bills,
        "journals": journals,
        "codex": codex,
    }


if __name__ == "__main__":
    data = load_base_data()
    stats = data["database"]["stats"]
    print(json.dumps(stats, indent=2))
    assert stats["actorCount"] == 103, f"Expected 103 actors, got {stats['actorCount']}"
    assert stats["variableCount"] == 12828, f"Expected 12828 variables, got {stats['variableCount']}"
    assert stats["conversationCount"] == 521, f"Expected 521 conversations, got {stats['conversationCount']}"
    assert stats["entryCount"] == 201686, f"Expected 201686 entries, got {stats['entryCount']}"
    print("BASE extraction parity check PASSED.")
