"use client";

import { CourseCard } from "@/components/course-card";
import type { Course } from "@/lib/types";

interface CoursesGridProps {
  courses: Course[];
}

export function CoursesGrid({ courses }: CoursesGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(courses ?? []).map((course, index) => (
          <CourseCard key={course?.id ?? index} course={course} index={index} />
        ))}
      </div>
      {(courses?.length ?? 0) === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses available yet.</p>
        </div>
      )}
    </div>
  );
}
