"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import mockData from "@/data/mockData.json";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
  matchPrefix?: string[];
}

export function Sidebar() {
  const pathname = usePathname() || "/";

  const inProgressCourses = mockData.courses.filter((c) => c.status === "진행 중").length;
  const remainingTasks = mockData.tasks.filter((t) => t.status !== "완료").length;
  const totalQuestions = mockData.questions.length;

  const navItems: NavItem[] = [
    {
      label: "대시보드",
      href: "/",
      matchPrefix: ["/", "/dashboard"],
    },
    {
      label: "내 강의",
      href: "/courses",
      badge: mockData.courses.length,
      matchPrefix: ["/courses"],
    },
    {
      label: "할 일",
      href: "/tasks",
      badge: remainingTasks,
      matchPrefix: ["/tasks"],
    },
    {
      label: "질문방",
      href: "/questions",
      badge: totalQuestions,
      matchPrefix: ["/questions"],
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.href === "/") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      {/* Desktop Sidebar (240px fixed width) */}
      <aside className="hidden md:flex md:w-[240px] md:shrink-0 md:flex-col border-r border-slate-200 bg-slate-900 text-white">
        <div className="flex h-[64px] items-center justify-between border-b border-slate-800 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-sm font-extrabold text-white">
              SF
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              StudyFlow
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1.5 px-3 py-5" aria-label="주요 메뉴">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            학습 메뉴
          </p>
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-orange-600 text-white font-bold shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="rounded-xl bg-slate-800/80 p-4">
            <p className="text-xs font-medium text-slate-400">이번 학기 수강 현황</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-300">진행 중 강의</span>
              <span className="text-base font-extrabold text-orange-500">
                {inProgressCourses}과목
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xs text-slate-300">남은 할 일</span>
              <span className="text-base font-extrabold text-emerald-400">
                {remainingTasks}건
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation Bar */}
      <div className="flex flex-col border-b border-slate-200 bg-slate-900 text-white md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-600 text-xs font-extrabold text-white">
              SF
            </span>
            <span className="text-base font-extrabold text-white">StudyFlow</span>
          </Link>
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold text-emerald-400">
            남은 할 일 {remainingTasks}건
          </span>
        </div>
        <nav
          className="flex items-center gap-1 overflow-x-auto px-3 pb-2.5"
          aria-label="모바일 메뉴"
        >
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-orange-600 text-white font-bold"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="font-bold opacity-90">({item.badge})</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
