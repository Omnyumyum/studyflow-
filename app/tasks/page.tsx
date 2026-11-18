"use client";

import React, { useState } from "react";
import rawData from "@/data/mockData.json";
import type { MockData, StudyStatus, Task } from "@/data/types";
import { Card, ProgressBar, TaskItem } from "@/components";

const data = rawData as MockData;
const FILTER_TABS: Array<"전체" | StudyStatus> = ["전체", "시작 전", "진행 중", "완료"];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(data.tasks);
  const [selectedStatus, setSelectedStatus] = useState<"전체" | StudyStatus>("전체");

  const totalCount = tasks.length;
  const beforeStartCount = tasks.filter((t) => t.status === "시작 전").length;
  const inProgressCount = tasks.filter((t) => t.status === "진행 중").length;
  const completedCount = tasks.filter((t) => t.status === "완료").length;

  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTasks =
    selectedStatus === "전체"
      ? tasks
      : tasks.filter((task) => task.status === selectedStatus);

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
      {/* 상단 할 일 요약 카드 */}
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
              과제 및 일정 관리
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
              전체 할 일 (Tasks)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              전체{" "}
              <strong className="font-bold text-slate-900">{totalCount}</strong>건 중{" "}
              <strong className="font-bold text-emerald-600">
                {completedCount}
              </strong>
              건 완료 · 체크박스를 눌러 진행 상태를 즉시 전환하세요.
            </p>
          </div>

          <div className="w-full lg:w-72">
            <ProgressBar
              value={completionRate}
              label="할 일 완료율"
              size="lg"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-3.5">
            <p className="text-xs font-medium text-slate-500">전체 할 일</p>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              <strong className="font-bold">{totalCount}</strong>
              <span className="ml-1 text-xs font-medium text-slate-500">건</span>
            </p>
          </div>
          <div className="rounded-lg bg-orange-50/60 p-3.5">
            <p className="text-xs font-medium text-orange-600">진행 중</p>
            <p className="mt-1 text-xl font-extrabold text-orange-600">
              <strong className="font-bold">{inProgressCount}</strong>
              <span className="ml-1 text-xs font-medium text-orange-600">건</span>
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50/60 p-3.5">
            <p className="text-xs font-medium text-emerald-700">완료</p>
            <p className="mt-1 text-xl font-extrabold text-emerald-600">
              <strong className="font-bold">{completedCount}</strong>
              <span className="ml-1 text-xs font-medium text-emerald-700">건</span>
            </p>
          </div>
          <div className="rounded-lg bg-slate-100/80 p-3.5">
            <p className="text-xs font-medium text-slate-600">시작 전</p>
            <p className="mt-1 text-xl font-extrabold text-slate-700">
              <strong className="font-bold">{beforeStartCount}</strong>
              <span className="ml-1 text-xs font-medium text-slate-500">건</span>
            </p>
          </div>
        </div>
      </Card>

      {/* 상태 필터 탭 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
          role="tablist"
          aria-label="할 일 상태 필터"
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
          표시된 할 일{" "}
          <strong className="font-bold text-slate-900">
            {filteredTasks.length}
          </strong>
          건
        </p>
      </div>

      {/* 할 일 목록 또는 빈 상태 */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              showCourseTitle
            />
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <p className="text-sm font-bold text-slate-700">
            오늘 예정된 할 일이 없습니다.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            선택한 상태 조건에 해당하는 과제가 없습니다.
          </p>
        </Card>
      )}
    </div>
  );
}
