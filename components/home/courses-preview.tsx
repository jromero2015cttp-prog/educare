"use client";

import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/lib/types";

interface CoursesPreviewProps {
  courses: Course[];
}

export function CoursesPreview({ courses }: CoursesPreviewProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Popular Courses
            </h2>
            <p className="text-gray-600">
              Start learning with our most popular courses
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden md:flex items-center gap-2 px-5 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(courses ?? []).map((course, index) => (
            <CourseCard key={course?.id ?? index} course={course} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium"
          >
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
