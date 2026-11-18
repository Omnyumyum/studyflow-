import React from "react";
import Link from "next/link";
import type { Course, StudyStatus } from "@/data/types";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";

export interface CourseCardProps {
  course: Course;
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

export function CourseCard({ course, className = "" }: CourseCardProps) {
  return (
    <Card className={`flex flex-col justify-between transition-shadow hover:shadow-md ${className}`.trim()}>
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-500">
            {course.category}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeClass(
              course.status
            )}`}
          >
            {course.status}
          </span>
        </div>

        <h3 className="mt-2.5 text-lg font-bold text-slate-900">
          <Link
            href={`/courses/${course.id}`}
            className="hover:text-orange-600 transition-colors"
          >
            {course.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs font-medium text-slate-600">
          담당: {course.instructor}
        </p>

        {course.description && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-500">
            {course.description}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <ProgressBar
          value={course.progress}
          status={course.status}
          label="학습 진행률"
        />

        <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
          <span>
            완료 강의{" "}
            <strong className="font-bold text-slate-900">
              {course.completedLessons}
            </strong>{" "}
            /{" "}
            <strong className="font-bold text-slate-900">
              {course.totalLessons}
            </strong>
            강
          </span>
          <span>
            다음 마감{" "}
            <strong className="font-bold text-slate-900">
              {course.nextDeadline}
            </strong>
          </span>
        </div>

        <div className="mt-4">
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-600"
          >
            과목 상세 보기 →
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default CourseCard;
