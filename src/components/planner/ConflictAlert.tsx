import { ConflictPair } from "../../utils/recommendation";
import { WarningIcon, InfoIcon } from "@phosphor-icons/react";

interface ConflictAlertProps {
  conflicts: ConflictPair[];
  variant?: "inter" | "intra";
}

export function ConflictAlert({ conflicts, variant = "inter" }: ConflictAlertProps) {
  if (conflicts.length === 0) return null;

  const isInter = variant === "inter";

  return (
    <div
      className={`border-l-4 p-4 ${
        isInter
          ? "border-red-500 bg-red-50 dark:bg-red-950/25"
          : "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
      }`}
    >
      <div className="flex items-start gap-3">
        {isInter ? (
          <WarningIcon
            weight="fill"
            className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
          />
        ) : (
          <InfoIcon
            weight="fill"
            className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
          />
        )}
        <div className="flex-1 min-w-0">
          <p
            className={`text-xs font-black uppercase tracking-widest mb-2 ${
              isInter
                ? "text-red-700 dark:text-red-400"
                : "text-amber-700 dark:text-amber-400"
            }`}
          >
            {isInter
              ? `${conflicts.length} Incompatible Pair${conflicts.length !== 1 ? "s" : ""} — Separate Playthroughs Required`
              : `${conflicts.length} Intra-Run Conflict${conflicts.length !== 1 ? "s" : ""} — Choose One Per Playthrough`}
          </p>
          <div className="space-y-2">
            {conflicts.map((conflict, idx) => (
              <div
                key={idx}
                className={`flex flex-wrap items-center gap-1.5 text-xs font-mono ${
                  isInter
                    ? "text-red-800 dark:text-red-300"
                    : "text-amber-800 dark:text-amber-300"
                }`}
              >
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    isInter
                      ? "bg-red-100 dark:bg-red-900/40"
                      : "bg-amber-100 dark:bg-amber-900/40"
                  }`}
                >
                  {conflict.achievementA}
                </span>
                <span className="text-slate-400 shrink-0">vs</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    isInter
                      ? "bg-red-100 dark:bg-red-900/40"
                      : "bg-amber-100 dark:bg-amber-900/40"
                  }`}
                >
                  {conflict.achievementB}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
