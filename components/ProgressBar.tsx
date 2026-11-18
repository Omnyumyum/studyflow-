import React from "react";
import type { StudyStatus } from "@/data/types";

export interface ProgressBarProps {
  value?: number;
  progress?: number;
  label?: string;
  status?: StudyStatus;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  progress,
  label,
  status,
  showPercentage = true,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const rawValue = value ?? progress ?? 0;
  const clamped = Math.max(0, Math.min(100, Math.round(rawValue)));

  const isCompleted = status === "완료" || clamped === 100;
  const isNotStarted = status === "시작 전" || clamped === 0;

  const barColorClass = isCompleted
    ? "bg-emerald-600"
    : isNotStarted
    ? "bg-slate-400"
    : "bg-orange-600";

  const textColorClass = isCompleted
    ? "text-emerald-600"
    : isNotStarted
    ? "text-slate-600"
    : "text-orange-600";

  const heightClass =
    size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2.5";

  return (
    <div className={`w-full ${className}`.trim()}>
      {(label || showPercentage) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600">{label ?? "진행률"}</span>
          {showPercentage && (
            <span className={`font-bold ${textColorClass}`}>{clamped}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-slate-100 ${heightClass}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${heightClass} rounded-full transition-all duration-300 ${barColorClass}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
