"use client";

import React, { useState } from "react";
import rawData from "@/data/mockData.json";
import type { Course, MockData, StudyStatus } from "@/data/types";
import { Card, CourseCard, ProgressBar } from "@/components";

const data = rawData as MockData;
const FILTER_TABS: Array<"전체" | StudyStatus> = ["전체", "시작 전", "진행 중", "완료"];

export default function CoursesPage() {
  const [selectedStatus, setSelectedStatus] = useState<"전체" | StudyStatus>("전체");

  const courses: Course[] = data.courses;
  const totalCount = courses.length;
  const beforeStartCount = courses.filter((c) => c.status === "시작 전").length;
  const inProgressCount = courses.filter((c) => c.status === "진행 중").length;
  const completedCount = courses.filter((c) => c.status === "완료").length;

  const averageProgress =
    totalCount > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + course.progress, 0) / totalCount
        )
      : 0;

  const filteredCourses =
    selectedStatus === "전체"
      ? courses
      : courses.filter((course) => course.status === selectedStatus);

  const getTabCount = (tab: "전체" | StudyStatus): number => {
    switch (tab) {
      case "전체":
        return totalCount;
      case "시작 전":
        return beforeStartCount;
      case "진행 중":
        return inProgressCount;
      case "완료":
        return completedCount;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* 상단 요약 배너 및 전체 평균 진행률 */}
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
              내 강의실
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
              수강 과목 목록
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              이번 학기 수강 중인 총{" "}
              <strong className="font-bold text-slate-900">{totalCount}</strong>개
              과목의 주차별 진도와 마감 일정을 확인하세요.
            </p>
          </div>

          <div className="w-full lg:w-72">
            <ProgressBar
              value={averageProgress}
              label="전체 과목 평균 진행률"
              size="lg"
            />
          </div>
        </div>

        {/* 상태별 요약 카운트 */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-3.5">
            <p className="text-xs font-medium text-slate-500">전체 수강 과목</p>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              <strong className="font-bold">{totalCount}</strong>
              <span className="ml-1 text-xs font-medium text-slate-500">과목</span>
            </p>
          </div>
          <div className="rounded-lg bg-orange-50/60 p-3.5">
            <p className="text-xs font-medium text-orange-600">진행 중</p>
            <p className="mt-1 text-xl font-extrabold text-orange-600">
              <strong className="font-bold">{inProgressCount}</strong>
              <span className="ml-1 text-xs font-medium text-orange-600">과목</span>
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50/60 p-3.5">
            <p className="text-xs font-medium text-emerald-700">완료</p>
            <p className="mt-1 text-xl font-extrabold text-emerald-600">
              <strong className="font-bold">{completedCount}</strong>
              <span className="ml-1 text-xs font-medium text-emerald-700">과목</span>
            </p>
          </div>
          <div className="rounded-lg bg-slate-100/80 p-3.5">
            <p className="text-xs font-medium text-slate-600">시작 전</p>
            <p className="mt-1 text-xl font-extrabold text-slate-700">
              <strong className="font-bold">{beforeStartCount}</strong>
              <span className="ml-1 text-xs font-medium text-slate-500">과목</span>
            </p>
          </div>
        </div>
      </Card>

      {/* 상태별 필터 탭 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
          role="tablist"
          aria-label="강의 상태 필터"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = selectedStatus === tab;
            const count = getTabCount(tab);

            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedStatus(tab)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500">
          조회된 과목{" "}
          <strong className="font-bold text-slate-900">
            {filteredCourses.length}
          </strong>
          개
        </p>
      </div>

      {/* 과목 카드 그리드 또는 빈 상태 */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <p className="text-sm font-bold text-slate-700">
            등록된 강의가 없습니다.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            선택한 상태 조건에 해당하는 수강 과목이 없습니다.
          </p>
        </Card>
      )}
    </div>
  );
}
