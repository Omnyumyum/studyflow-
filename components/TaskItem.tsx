import React from "react";
import Link from "next/link";
import type { Task, StudyStatus } from "@/data/types";

export interface TaskItemProps {
  task: Task;
  onToggle?: (taskId: string) => void;
  showCourseTitle?: boolean;
  className?: string;
}

function getStatusBadgeClass(status: StudyStatus): string {
  switch (status) {
    case "완료":
      return "bg-emerald-50 text-emerald-700";
    case "진행 중":
      return "bg-orange-50 text-orange-600";
    case "시작 전":
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getPriorityBadgeClass(priority: Task["priority"]): string {
  switch (priority) {
    case "높음":
      return "bg-orange-50 text-orange-600";
    case "보통":
      return "bg-slate-100 text-slate-700";
    case "낮음":
    default:
      return "bg-emerald-50 text-emerald-700";
  }
}

export function TaskItem({
  task,
  onToggle,
  showCourseTitle = true,
  className = "",
}: TaskItemProps) {
  const isCompleted = task.status === "완료";

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}
    >
      <div className="flex items-start gap-3 min-w-0">
        {onToggle ? (
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            aria-label={`${task.title} 상태 전환`}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold transition-colors ${
              isCompleted
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-300 bg-white text-transparent hover:border-orange-600"
            }`}
          >
            ✓
          </button>
        ) : (
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
              isCompleted
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-300 bg-slate-50 text-transparent"
            }`}
            aria-hidden="true"
          >
            ✓
          </span>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {showCourseTitle && (
              <Link
                href={`/courses/${task.courseId}`}
                className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                {task.courseTitle}
              </Link>
            )}
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${getPriorityBadgeClass(
                task.priority
              )}`}
            >
              우선순위 {task.priority}
            </span>
          </div>

          <p
            className={`mt-1.5 text-sm font-bold ${
              isCompleted ? "line-through text-slate-400" : "text-slate-900"
            }`}
          >
            {task.title}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
        <span className="text-xs text-slate-500">
          마감일{" "}
          <strong className="font-bold text-slate-900">{task.dueDate}</strong>
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${getStatusBadgeClass(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;
