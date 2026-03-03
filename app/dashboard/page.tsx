import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any)?.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          lessons: true,
          quiz: true,
          _count: {
            select: { lessons: true },
          },
        },
      },
    },
    orderBy: { enrolledAt: 'desc' },
  });

  const lessonProgress = await prisma.lessonProgress.findMany({
    where: { userId },
  });

  const quizAttempts = await prisma.quizAttempt.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  // Calculate progress for each enrolled course
  const enrolledCourses = enrollments.map((enrollment) => {
    const course = enrollment.course;
    const totalLessons = course?._count?.lessons ?? 0;
    const completedLessons = lessonProgress.filter(
      (lp) => course?.lessons?.some((l) => l.id === lp.lessonId) && lp.completed
    ).length;
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    const latestQuizAttempt = quizAttempts.find(
      (qa) => qa.quizId === course?.quiz?.id
    );
    const quizScore = latestQuizAttempt
      ? Math.round((latestQuizAttempt.score / latestQuizAttempt.totalQuestions) * 100)
      : null;

    return {
      ...course,
      progress,
      completedLessons,
      totalLessons,
      quizScore,
      enrolledAt: enrollment.enrolledAt,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <DashboardContent
          userName={session.user?.name ?? 'Student'}
          enrolledCourses={enrolledCourses}
        />
      </main>
      <Footer />
    </div>
  );
}
