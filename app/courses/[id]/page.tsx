"use client";

import React, { useState } from "react";
import Link from "next/link";
import rawData from "@/data/mockData.json";
import type { MockData, StudyStatus, Task } from "@/data/types";
import { Card, ProgressBar, TaskItem } from "@/components";

const data = rawData as MockData;

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

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const course = data.courses.find((item) => item.id === params.id);

  const [courseTasks, setCourseTasks] = useState<Task[]>(() =>
    data.tasks.filter((task) => task.courseId === params.id)
  );

  const courseQuestions = data.questions.filter(
    (question) => question.courseId === params.id
  );

  const handleToggleTask = (taskId: string) => {
    setCourseTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus: StudyStatus =
          task.status === "완료" ? "진행 중" : "완료";
        return { ...task, status: nextStatus };
      })
    );
  };

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600"
          >
            ← 전체 강의 목록으로 돌아가기
          </Link>
        </div>

        <Card className="py-12 text-center">
          <p className="text-base font-bold text-slate-900">
            등록된 강의가 없습니다.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            요청하신 과목 ID(<strong className="font-bold">{params.id}</strong>
            )에 해당하는 강의 정보를 찾을 수 없습니다.
          </p>
          <div className="mt-5">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-600"
            >
              내 강의 목록 보기
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const completedTasksCount = courseTasks.filter(
    (t) => t.status === "완료"
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* 상단 네비게이션 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:border-orange-600 hover:text-orange-600"
        >
          ← 전체 강의 목록으로
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/tasks" className="font-medium hover:text-orange-600">
            전체 할 일 보기
          </Link>
          <span>·</span>
          <Link href="/questions" className="font-medium hover:text-orange-600">
            전체 질문방 보기
          </Link>
        </div>
      </div>

      {/* 과목 개요 헤더 카드 */}
      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                {course.category}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${getStatusBadgeClass(
                  course.status
                )}`}
              >
                {course.status}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {course.title}
            </h2>
            <p className="text-xs font-medium text-slate-600">
              담당 교수:{" "}
              <strong className="font-bold text-slate-900">
                {course.instructor}
              </strong>
            </p>
            <p className="max-w-3xl text-sm text-slate-600">
              {course.description}
            </p>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:w-80">
            <ProgressBar
              value={course.progress}
              status={course.status}
              label="과목 전체 진행률"
              size="lg"
            />
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-3 text-xs">
              <div>
                <p className="text-slate-500">수강 완료 강의</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900">
                  <strong className="font-extrabold">
                    {course.completedLessons}
                  </strong>{" "}
                  /{" "}
                  <strong className="font-extrabold">
                    {course.totalLessons}
                  </strong>
                  강
                </p>
              </div>
              <div>
                <p className="text-slate-500">다음 마감일</p>
                <p className="mt-0.5 text-sm font-bold text-orange-600">
                  {course.nextDeadline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 주차별 강의 목록 */}
      <Card
        title="주차별 강의 커리큘럼"
        subtitle={`총 ${course.lessons.length}개 등록된 주차 강의`}
        rightElement={
          <span className="text-xs text-slate-500">
            진행률{" "}
            <strong className="font-bold text-slate-900">
              {course.progress}%
            </strong>
          </span>
        }
      >
        {course.lessons.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {course.lessons.map((lesson) => (
              <div
                key={`${course.id}-week-${lesson.week}`}
                className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                    {lesson.week}주차
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {lesson.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      강의 시간{" "}
                      <strong className="font-bold text-slate-700">
                        {lesson.duration}
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${getStatusBadgeClass(
                      lesson.status
                    )}`}
                  >
                    {lesson.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm font-bold text-slate-600">
            등록된 강의가 없습니다.
          </p>
        )}
      </Card>

      {/* 과목별 할 일 & 과목별 질문 그리드 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 해당 과목의 할 일 */}
        <Card
          title="이 과목의 할 일 (Tasks)"
          subtitle="체크박스를 클릭해 완료 상태를 전환할 수 있습니다"
          rightElement={
            <span className="text-xs text-slate-500">
              완료{" "}
              <strong className="font-bold text-emerald-600">
                {completedTasksCount}
              </strong>{" "}
              /{" "}
              <strong className="font-bold text-slate-900">
                {courseTasks.length}
              </strong>
              건
            </span>
          }
        >
          {courseTasks.length > 0 ? (
            <div className="space-y-3">
              {courseTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  showCourseTitle={false}
                  onToggle={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 py-8 text-center">
              <p className="text-sm font-bold text-slate-700">
                오늘 예정된 할 일이 없습니다.
              </p>
            </div>
          )}
        </Card>

        {/* 해당 과목의 질문 목록 */}
        <Card
          title="이 과목의 질문 (Q&A)"
          subtitle="수강생 질문 및 교수·조교 답변 요약"
          rightElement={
            <span className="text-xs text-slate-500">
              총{" "}
              <strong className="font-bold text-slate-900">
                {courseQuestions.length}
              </strong>
              건
            </span>
          }
        >
          {courseQuestions.length > 0 ? (
            <div className="space-y-3">
              {courseQuestions.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700">
                      {q.courseTitle}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeClass(
                        q.status
                      )}`}
                    >
                      {q.status}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-slate-900">
                    {q.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    작성자: {q.author} · 등록일{" "}
                    <strong className="font-bold text-slate-700">
                      {q.createdAt}
                    </strong>
                  </p>

                  <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700">
                    <span className="font-bold text-slate-900">답변 요약: </span>
                    {q.answerSummary}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 py-8 text-center">
              <p className="text-sm font-bold text-slate-700">
                등록된 질문이 없습니다.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
