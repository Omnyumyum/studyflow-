export type StudyStatus = "시작 전" | "진행 중" | "완료";

export interface LessonItem {
  week: number;
  title: string;
  duration: string;
  status: StudyStatus;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  status: StudyStatus;
  nextDeadline: string;
  description: string;
  lessons: LessonItem[];
}

export interface Task {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  dueDate: string;
  status: StudyStatus;
  priority: "높음" | "보통" | "낮음";
}

export interface Question {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  author: string;
  createdAt: string;
  status: StudyStatus;
  answerSummary: string;
}

export interface MockData {
  courses: Course[];
  tasks: Task[];
  questions: Question[];
}
