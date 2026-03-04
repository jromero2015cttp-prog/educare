"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, Users, ChevronRight } from "lucide-react";
import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  index?: number;
  enrolled?: boolean;
  progress?: number;
}

export function CourseCard({ course, index = 0, enrolled = false, progress }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/courses/${course?.id ?? ''}`}>
        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="relative aspect-video bg-gray-100">
            {course?.imageUrl && (
              <Image
                src={course.imageUrl}
                alt={course?.title ?? 'Course image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                {course?.category ?? 'General'}
              </span>
            </div>
            {enrolled && typeof progress === 'number' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div
                  className="h-full bg-secondary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
              {course?.title ?? 'Untitled Course'}
            </h3>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {course?.description ?? 'No description available'}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              {course?.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{course?._count?.lessons ?? 0} lessons</span>
              </div>
              {course?._count?.enrollments !== undefined && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course._count.enrollments}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {course?.difficulty ?? 'Beginner'}
              </span>
              <span className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                {enrolled ? 'Continue' : 'View Course'}
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
