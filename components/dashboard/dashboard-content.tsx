"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, Clock, ArrowRight, Play } from "lucide-react";

interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  difficulty: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  quizScore: number | null;
}

interface DashboardContentProps {
  userName: string;
  enrolledCourses: EnrolledCourse[];
}

export function DashboardContent({ userName, enrolledCourses }: DashboardContentProps) {
  const totalCourses = enrolledCourses?.length ?? 0;
  const completedCourses = (enrolledCourses ?? []).filter((c) => c?.progress === 100).length;
  const averageProgress = totalCourses > 0
    ? Math.round((enrolledCourses ?? []).reduce((acc, c) => acc + (c?.progress ?? 0), 0) / totalCourses)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <p className="text-gray-600">Welcome back, {userName}! Continue your learning journey.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Progress</p>
              <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Courses</h2>
        {totalCourses === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-12 rounded-xl shadow-md text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {(enrolledCourses ?? []).map((course, index) => (
              <motion.div
                key={course?.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/courses/${course?.id ?? ''}`}>
                  <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 aspect-video md:aspect-auto bg-gray-100">
                        {course?.imageUrl && (
                          <Image
                            src={course.imageUrl}
                            alt={course?.title ?? ''}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                              {course?.title ?? 'Untitled'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {course?.completedLessons ?? 0} of {course?.totalLessons ?? 0} lessons completed
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            {course?.quizScore !== null && (
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Quiz Score</p>
                                <p className="text-lg font-semibold text-secondary">{course.quizScore}%</p>
                              </div>
                            )}
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                              <Play className="h-4 w-4" />
                              Continue
                            </button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium text-gray-700">{course?.progress ?? 0}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                              style={{ width: `${course?.progress ?? 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
