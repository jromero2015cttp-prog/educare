import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { QuizContent } from "@/components/quiz/quiz-content";

export const dynamic = "force-dynamic";

export default async function QuizPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!session?.user) {
    redirect("/login");
  }

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      quiz: {
        include: {
          questions: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              text: true,
              options: true,
              order: true,
            },
          },
        },
      },
    },
  });

  if (!course || !course.quiz) {
    notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  if (!enrollment) {
    redirect(`/courses/${course.id}`);
  }

  const previousAttempt = await prisma.quizAttempt.findFirst({
    where: {
      userId,
      quizId: course.quiz.id,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <QuizContent
          course={course}
          quiz={course.quiz}
          previousAttempt={previousAttempt}
        />
      </main>
      <Footer />
    </div>
  );
}
