import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CoursesGrid } from "@/components/courses/courses-grid";
import { prisma } from "@/lib/db";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: {
          lessons: true,
          enrollments: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Browse our collection of expert-designed courses. Each course includes structured lessons,
              AI tutoring support, and assessments to test your knowledge.
            </p>
          </div>
        </div>
        <CoursesGrid courses={courses} />
      </main>
      <Footer />
    </div>
  );
}
