export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  difficulty: string;
  duration: string | null;
  lessons?: Lesson[];
  quiz?: Quiz | null;
  _count?: {
    lessons: number;
    enrollments: number;
  };
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string | null;
  order: number;
  courseId: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  questions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  order: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt: Date | null;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: number[];
  createdAt: Date;
}

export interface EnrolledCourse extends Course {
  progress: number;
  completedLessons: number;
  totalLessons: number;
  quizScore: number | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
