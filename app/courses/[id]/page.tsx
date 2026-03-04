import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseDetailContent } from "@/components/courses/course-detail-content";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
      },
      quiz: {
        include: {
          questions: {
            orderBy: { order: 'asc' },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          enrollments: true,
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  let enrollment = null;
  let lessonProgress: string[] = [];
  let quizAttempt = null;

  if (userId) {
    enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    if (enrollment) {
      const progress = await prisma.lessonProgress.findMany({
        where: {
          userId,
          lessonId: { in: course.lessons.map((l: { id: string }) => l.id) },
          completed: true,
        },
      });
      lessonProgress = progress.map((p: { lessonId: string }) => p.lessonId);

      if (course.quiz) {
        quizAttempt = await prisma.quizAttempt.findFirst({
          where: {
            userId,
            quizId: course.quiz.id,
          },
          orderBy: { createdAt: 'desc' },
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <CourseDetailContent
          course={course}
          isEnrolled={!!enrollment}
          isLoggedIn={!!session}
          lessonProgress={lessonProgress}
          quizAttempt={quizAttempt}
        />
      </main>
      <Footer />
    </div>
  );
}
