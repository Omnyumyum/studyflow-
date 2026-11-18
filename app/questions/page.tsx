"use client";

import React, { useState } from "react";
import Link from "next/link";
import rawData from "@/data/mockData.json";
import type { MockData, Question, StudyStatus } from "@/data/types";
import { Card } from "@/components";

const data = rawData as MockData;
const FILTER_TABS: Array<"전체" | StudyStatus> = ["전체", "시작 전", "진행 중", "완료"];

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

export default function QuestionsPage() {
  const [selectedStatus, setSelectedStatus] = useState<"전체" | StudyStatus>("전체");

  const questions: Question[] = data.questions;
  const totalCount = questions.length;
  const beforeStartCount = questions.filter((q) => q.status === "시작 전").length;
  const inProgressCount = questions.filter((q) => q.status === "진행 중").length;
  const completedCount = questions.filter((q) => q.status === "완료").length;

  const filteredQuestions =
    selectedStatus === "전체"
      ? questions
      : questions.filter((q) => q.status === selectedStatus);

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
      {/* 상단 질문방 요약 카드 */}
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
              강의 Q&A 라운지
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
              강의별 질문방 (Questions)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              수강 과목별 질문 총{" "}
              <strong className="font-bold text-slate-900">{totalCount}</strong>건과
              교수·조교 답변 상태를 한눈에 확인하세요.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-3.5">
            <p className="text-xs font-medium text-slate-500">전체 질문</p>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              <strong className="font-bold">{totalCount}</strong>
              <span className="ml-1 text-xs font-medium text-slate-500">건</span>
            </p>
          </div>
          <div className="rounded-lg bg-orange-50/60 p-3.5">
            <p className="text-xs font-medium text-orange-600">진행 중 (검토 중)</p>
            <p className="mt-1 text-xl font-extrabold text-orange-600">
              <strong className="font-bold">{inProgressCount}</strong>
              <span className="ml-1 text-xs font-medium text-orange-600">건</span>
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50/60 p-3.5">
            <p className="text-xs font-medium text-emerald-700">완료 (답변 완료)</p>
            <p className="mt-1 text-xl font-extrabold text-emerald-600">
              <strong className="font-bold">{completedCount}</strong>
              <span className="ml-1 text-xs font-medium text-emerald-700">건</span>
            </p>
          </div>
          <div className="rounded-lg bg-slate-100/80 p-3.5">
            <p className="text-xs font-medium text-slate-600">시작 전 (답변 대기)</p>
            <p className="mt-1 text-xl font-extrabold text-slate-700">
              <strong className="font-bold">{beforeStartCount}</strong>
              <span className="ml-1 text-xs font-medium text-slate-500">건</span>
            </p>
          </div>
        </div>
      </Card>

      {/* 상태별 필터 탭 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
          role="tablist"
          aria-label="질문 상태 필터"
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
          조회된 질문{" "}
          <strong className="font-bold text-slate-900">
            {filteredQuestions.length}
          </strong>
          건
        </p>
      </div>

      {/* 질문 카드 리스트 또는 빈 상태 */}
      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredQuestions.map((question) => (
            <Card key={question.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/courses/${question.courseId}`}
                  className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                >
                  {question.courseTitle}
                </Link>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${getStatusBadgeClass(
                    question.status
                  )}`}
                >
                  {question.status}
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-900">
                {question.title}
              </h3>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>작성자: {question.author}</span>
                <span>·</span>
                <span>
                  등록일{" "}
                  <strong className="font-bold text-slate-700">
                    {question.createdAt}
                  </strong>
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                <span className="font-bold text-slate-900">답변 요약: </span>
                {question.answerSummary}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <p className="text-sm font-bold text-slate-700">
            등록된 질문이 없습니다.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            선택한 상태 조건에 해당하는 질문이 없습니다.
          </p>
        </Card>
      )}
    </div>
  );
}
