import React from "react";
import Link from "next/link";
import DashboardPage from "./dashboard/page";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* 홈 웰컴 배너 및 주요 화면 바로가기 */}
      <section className="rounded-xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-600 px-2.5 py-0.5 text-xs font-bold text-white">
              StudyFlow Home
            </span>
            <p className="mt-2 text-lg font-extrabold tracking-tight text-white">
              오늘의 강의 진도와 과제를 놓치지 마세요
            </p>
            <p className="mt-1 text-xs text-slate-300">
              수강 과목 진행률, 오늘 할 일, 질문방 답변 상태를 한 화면에서 확인합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-orange-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-500"
            >
              전용 대시보드
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-100 transition-colors hover:border-orange-600 hover:text-white"
            >
              내 강의 목록
            </Link>
            <Link
              href="/tasks"
              className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-100 transition-colors hover:border-orange-600 hover:text-white"
            >
              할 일 관리
            </Link>
            <Link
              href="/questions"
              className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-100 transition-colors hover:border-orange-600 hover:text-white"
            >
              질문방
            </Link>
          </div>
        </div>
      </section>

      <DashboardPage />
    </div>
  );
}
