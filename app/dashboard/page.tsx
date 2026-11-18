"use client";

import React, { useState } from "react";
import Link from "next/link";
import mockData from "@/data/mockData.json";
import type { Course, Question, StudyStatus, Task } from "@/data/types";
import { Card, CourseCard, ProgressBar, TaskItem } from "@/components";

const courses = mockData.courses as Course[];
const initialTasks = mockData.tasks as Task[];
const questions = mockData.questions as Question[];

const FILTER_TABS: Array<"전체" | StudyStatus> = [
  "전체",
  "시작 전",
  "진행 중",
  "완료",
];

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

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskFilter, setTaskFilter] = useState<"전체" | StudyStatus>("전체");

  const totalCourses = courses.length;
  const activeCoursesCount = courses.filter((c) => c.status === "진행 중").length;
  const completedCoursesCount = courses.filter((c) => c.status === "완료").length;

  const averageProgress =
    totalCourses > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + course.progress, 0) /
            totalCourses
        )
      : 0;

  const totalLessons = courses.reduce((sum, c) => sum + c.totalLessons, 0);
  const completedLessons = courses.reduce(
    (sum, c) => sum + c.completedLessons,
    0
  );

  const remainingTasksCount = tasks.filter((t) => t.status !== "완료").length;
  const completedTasksCount = tasks.filter((t) => t.status === "완료").length;
  const inProgressTasksCount = tasks.filter((t) => t.status === "진행 중").length;

  const pendingQuestionsCount = questions.filter(
    (q) => q.status !== "완료"
  ).length;
  const answeredQuestionsCount = questions.filter(
    (q) => q.status === "완료"
  ).length;

  const filteredTasks =
    taskFilter === "전체"
      ? tasks
      : tasks.filter((task) => task.status === taskFilter);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus: StudyStatus =
          task.status === "완료" ? "진행 중" : "완료";
        return { ...task, status: nextStatus };
      })
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* 상단 타이틀 및 빠른 이동 바 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-bold text-orange-600">
            학습 현황 요약
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            학습 대시보드
          </h1>
          <p className="mt-0.5 text-sm text-slate-600">
            전체 강의 진행률과 오늘 할 일을 한눈에 점검하세요.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/courses"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 shadow-sm transition-colors hover:border-orange-600 hover:text-orange-600"
          >
            내 강의 (<span className="font-extrabold">{totalCourses}</span>)
          </Link>
          <Link
            href="/tasks"
            className="inline-flex items-center rounded-lg bg-orange-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-slate-900"
          >
            오늘 할 일 (<span className="font-extrabold">{remainingTasksCount}</span>)
          </Link>
        </div>
      </div>

      {/* 핵심 KPI 요약 카드 4종 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="전체 평균 진행률" subtitle="수강 과목 종합 달성도">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-orange-600">
              {averageProgress}%
            </span>
            <span className="text-xs text-slate-500">
              완료 강의{" "}
              <strong className="font-bold text-slate-900">
                {completedLessons}
              </strong>
              /{totalLessons}강
            </span>
          </div>
          <div className="mt-3">
            <ProgressBar
              value={averageProgress}
              status={averageProgress === 100 ? "완료" : "진행 중"}
              showPercentage={false}
              size="md"
            />
          </div>
        </Card>

        <Card title="수강 중인 강의" subtitle="2026학년도 2학기">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {totalCourses}
              <span className="ml-1 text-base font-bold text-slate-600">
                과목
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-bold text-orange-600">
              진행 중 {activeCoursesCount}
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            수강 완료{" "}
            <strong className="font-bold text-emerald-600">
              {completedCoursesCount}
            </strong>
            과목 · 시작 전{" "}
            <strong className="font-bold text-slate-900">
              {totalCourses - activeCoursesCount - completedCoursesCount}
            </strong>
            과목
          </p>
        </Card>

        <Card title="오늘 남은 할 일" subtitle="과제 및 실습 체크리스트">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-orange-600">
              {remainingTasksCount}
              <span className="ml-1 text-base font-bold text-slate-600">
                건
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              완료 {completedTasksCount}건
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            전체{" "}
            <strong className="font-bold text-slate-900">{tasks.length}</strong>
            건 중 진행 중{" "}
            <strong className="font-bold text-orange-600">
              {inProgressTasksCount}
            </strong>
            건
          </p>
        </Card>

        <Card title="미답변 · 진행 중 질문" subtitle="강의 질문방 현황">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {pendingQuestionsCount}
              <span className="ml-1 text-base font-bold text-slate-600">
                건
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              답변 완료 {answeredQuestionsCount}건
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            전체 등록 질문{" "}
            <strong className="font-bold text-slate-900">
              {questions.length}
            </strong>
            건
          </p>
        </Card>
      </div>

      {/* 메인 콘텐츠 그리드: 오늘 할 일 & 최근 질문 요약 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 오늘 할 일 (Today's Tasks) */}
        <div className="lg:col-span-2">
          <Card
            title="오늘 할 일"
            subtitle="체크박스를 눌러 완료 상태를 전환할 수 있습니다."
            action={
              <Link
                href="/tasks"
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                전체 할 일 보기 →
              </Link>
            }
          >
            {/* 상태 필터 탭 */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {FILTER_TABS.map((tab) => {
                const isActive = taskFilter === tab;
                const count =
                  tab === "전체"
                    ? tasks.length
                    : tasks.filter((t) => t.status === tab).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setTaskFilter(tab)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[11px] font-extrabold ${
                        isActive
                          ? "bg-orange-600 text-white"
                          : "bg-white text-slate-700"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredTasks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
                <p className="text-sm font-medium text-slate-500">
                  오늘 예정된 할 일이 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* 최근 질문 요약 (Recent Questions) */}
        <div className="lg:col-span-1">
          <Card
            title="최근 질문 요약"
            subtitle="과목별 Q&A 및 답변 현황"
            action={
              <Link
                href="/questions"
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                질문방 이동 →
              </Link>
            }
          >
            {questions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
                <p className="text-sm font-medium text-slate-500">
                  등록된 질문이 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 transition-colors hover:border-slate-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/courses/${q.courseId}`}
                        className="truncate text-xs font-medium text-slate-600 hover:text-orange-600"
                      >
                        {q.courseTitle}
                      </Link>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${getStatusBadgeClass(
                          q.status
                        )}`}
                      >
                        {q.status}
                      </span>
                    </div>

                    <Link
                      href="/questions"
                      className="mt-1.5 block text-sm font-bold text-slate-900 hover:text-orange-600"
                    >
                      {q.title}
                    </Link>

                    <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                      {q.answerSummary}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{q.author}</span>
                      <span className="font-bold text-slate-700">
                        {q.createdAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* 수강 중인 과목 현황 (Active Courses) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              수강 중인 과목 현황
            </h2>
            <p className="text-xs text-slate-500">
              총 <strong className="font-bold text-slate-900">{totalCourses}</strong>
              개 과목의 진도율과 다음 마감일을 확인하세요.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            전체 강의 목록 →
          </Link>
        </div>

        {courses.length === 0 ? (
          <Card>
            <p className="py-8 text-center text-sm font-medium text-slate-500">
              등록된 강의가 없습니다.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
