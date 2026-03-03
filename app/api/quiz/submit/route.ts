import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { quizId, answers } = body ?? {};

    if (!quizId || !answers) {
      return NextResponse.json(
        { message: "Quiz ID and answers are required" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
        course: true,
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { message: "Quiz not found" },
        { status: 404 }
      );
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: quiz.courseId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "Not enrolled in this course" },
        { status: 403 }
      );
    }

    const correctAnswers = quiz.questions.map((q) => q.correctIndex);
    let score = 0;

    for (let i = 0; i < correctAnswers.length; i++) {
      if (answers[i] === correctAnswers[i]) {
        score++;
      }
    }

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        answers,
      },
    });

    return NextResponse.json(
      {
        attemptId: attempt.id,
        score,
        total: quiz.questions.length,
        correctAnswers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
