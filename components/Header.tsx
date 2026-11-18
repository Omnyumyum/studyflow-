"use client";

import React from "react";
import { usePathname } from "next/navigation";
import mockData from "@/data/mockData.json";
import { useTasksState } from "./TaskItem";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  completionRate?: number;
}

function getPageTitleByPath(pathname: string): string {
  if (pathname === "/" || pathname === "/dashboard") {
    return "대시보드 · 2026학년도 2학기 12주차";
  }
  if (pathname.startsWith("/courses/")) {
    return "과목 상세 · 2026학년도 2학기 12주차";
  }
  if (pathname === "/courses") {
    return "내 강의 · 2026학년도 2학기 12주차";
  }
  if (pathname === "/tasks") {
    return "할 일 관리 · 2026학년도 2학기 12주차";
  }
  if (pathname === "/questions") {
    return "질문방 · 2026학년도 2학기 12주차";
  }
  return "2026학년도 2학기 · 12주차 학습 현황";
}

export function Header({
  title,
  subtitle = "오늘도 목표한 학습 분량을 달성해 보세요.",
  completionRate,
}: HeaderProps) {
  const pathname = usePathname() || "/";
  const { tasks } = useTasksState();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "완료").length;
  const computedRate =
    completionRate ?? (totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0);
  const resolvedTitle = title ?? getPageTitleByPath(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-[64px] w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3 min-w-0">
        <span className="inline-flex shrink-0 items-center rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
          진행 중 · 12주차
        </span>
        <div className="truncate">
          <p className="truncate text-sm font-bold text-slate-900">{resolvedTitle}</p>
          <p className="hidden truncate text-xs text-slate-500 sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">
            오늘 할 일 완료율{" "}
            <strong className="font-extrabold text-emerald-700">{computedRate}%</strong>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            김학
          </div>
          <div className="hidden text-left md:block">
            <p className="text-xs font-bold text-slate-900">김학습</p>
            <p className="text-[11px] text-slate-500">
              수강 <span className="font-bold text-slate-700">{mockData.courses.length}</span>과목
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
