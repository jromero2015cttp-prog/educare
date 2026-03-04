"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  PlayCircle,
  FileQuestion,
  MessageCircle,
  ChevronRight,
  Loader2,
  Lock,
} from "lucide-react";
import { AIChatbot } from "@/components/ai-chatbot";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string | null;
  order: number;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  order: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  difficulty: string;
  duration: string | null;
  lessons: Lesson[];
  quiz: Quiz | null;
  _count: {
    lessons: number;
    enrollments: number;
  };
}

interface QuizAttempt {
  id: string;
  score: number;
  totalQuestions: number;
}

interface CourseDetailContentProps {
  course: Course;
  isEnrolled: boolean;
  isLoggedIn: boolean;
  lessonProgress: string[];
  quizAttempt: QuizAttempt | null;
}

export function CourseDetailContent({
  course,
  isEnrolled,
  isLoggedIn,
  lessonProgress,
  quizAttempt,
}: CourseDetailContentProps) {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    isEnrolled ? (course?.lessons?.[0] ?? null) : null
  );
  const [showChatbot, setShowChatbot] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [completingLesson, setCompletingLesson] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>(lessonProgress ?? []);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course?.id }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Enrollment error:", error);
    } finally {
      setEnrolling(false);
    }
  };

  const handleCompleteLesson = async (lessonId: string) => {
    setCompletingLesson(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: true }),
      });

      if (res.ok) {
        setCompletedLessons((prev) => [...prev, lessonId]);
      }
    } catch (error) {
      console.error("Progress error:", error);
    } finally {
      setCompletingLesson(false);
    }
  };

  const progress = (course?.lessons?.length ?? 0) > 0
    ? Math.round(((completedLessons?.length ?? 0) / (course?.lessons?.length ?? 1)) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
      >
        <div className="relative aspect-[3/1] bg-gray-100">
          {course?.imageUrl && (
            <Image
              src={course.imageUrl}
              alt={course?.title ?? ''}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
              {course?.category ?? 'General'}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mt-3">
              {course?.title ?? 'Untitled Course'}
            </h1>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">{course?.description ?? ''}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            {course?.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>{course?._count?.lessons ?? 0} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{course?._count?.enrollments ?? 0} enrolled</span>
            </div>
            <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
              {course?.difficulty ?? 'Beginner'}
            </span>
          </div>

          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {enrolling ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enrolling...
                </>
              ) : (
                <>
                  <BookOpen className="h-5 w-5" />
                  {isLoggedIn ? "Enroll Now - Free" : "Sign in to Enroll"}
                </>
              )}
            </button>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="font-semibold text-gray-800">{progress}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              {quizAttempt && (
                <div className="text-center px-4 py-2 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-gray-500">Quiz Score</p>
                  <p className="text-lg font-bold text-secondary">
                    {Math.round((quizAttempt.score / quizAttempt.totalQuestions) * 100)}%
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lesson Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-800">Course Content</h2>
            </div>
            <div className="divide-y">
              {(course?.lessons ?? []).map((lesson, index) => {
                const isCompleted = completedLessons?.includes(lesson?.id ?? '');
                const isActive = activeLesson?.id === lesson?.id;
                const isLocked = !isEnrolled;

                return (
                  <button
                    key={lesson?.id ?? index}
                    onClick={() => !isLocked && setActiveLesson(lesson)}
                    disabled={isLocked}
                    className={`w-full p-4 text-left flex items-center gap-3 transition-colors ${
                      isActive
                        ? "bg-primary/5 border-l-4 border-primary"
                        : isLocked
                        ? "bg-gray-50 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-100 text-green-600"
                          : isLocked
                          ? "bg-gray-100 text-gray-400"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : isLocked ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`flex-1 text-sm ${
                        isActive ? "font-medium text-primary" : isLocked ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {lesson?.title ?? `Lesson ${index + 1}`}
                    </span>
                    {lesson?.videoUrl && !isLocked && (
                      <PlayCircle className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                );
              })}

              {/* Quiz Link */}
              {course?.quiz && (
                <button
                  onClick={() => isEnrolled && router.push(`/courses/${course?.id}/quiz`)}
                  disabled={!isEnrolled}
                  className={`w-full p-4 text-left flex items-center gap-3 ${
                    !isEnrolled ? "bg-gray-50 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      quizAttempt
                        ? "bg-green-100 text-green-600"
                        : !isEnrolled
                        ? "bg-gray-100 text-gray-400"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    <FileQuestion className="h-5 w-5" />
                  </div>
                  <span
                    className={`flex-1 text-sm ${
                      !isEnrolled ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Course Quiz
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          {isEnrolled && activeLesson ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {activeLesson?.videoUrl && (
                <div className="aspect-video bg-black">
                  <iframe
                    src={activeLesson.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeLesson?.title ?? ''}
                </h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: activeLesson?.content ?? '' }}
                />

                <div className="mt-8 pt-6 border-t flex items-center justify-between">
                  {!completedLessons?.includes(activeLesson?.id ?? '') ? (
                    <button
                      onClick={() => handleCompleteLesson(activeLesson?.id ?? '')}
                      disabled={completingLesson}
                      className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {completingLesson ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5" />
                      )}
                      Mark as Complete
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Completed</span>
                    </div>
                  )}

                  <button
                    onClick={() => setShowChatbot(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Ask AI Tutor
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isEnrolled ? "Select a lesson" : "Enroll to access content"}
              </h3>
              <p className="text-gray-500">
                {isEnrolled
                  ? "Choose a lesson from the sidebar to start learning."
                  : "Enroll in this course to access all lessons, quizzes, and AI tutoring."}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* AI Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <AIChatbot
            courseTitle={course?.title ?? ''}
            lessonTitle={activeLesson?.title ?? ''}
            lessonContent={activeLesson?.content ?? ''}
            onClose={() => setShowChatbot(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
