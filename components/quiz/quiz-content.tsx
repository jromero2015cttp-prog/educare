"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileQuestion,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";

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
}

interface QuizAttempt {
  id: string;
  score: number;
  totalQuestions: number;
  answers: number[];
}

interface QuizContentProps {
  course: Course;
  quiz: Quiz;
  previousAttempt: QuizAttempt | null;
}

export function QuizContent({ course, quiz, previousAttempt }: QuizContentProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quiz?.questions?.length ?? 0).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    correctAnswers: number[];
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrevious, setShowPrevious] = useState(!!previousAttempt);

  const questions = quiz?.questions ?? [];
  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some((a) => a === null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: quiz?.id,
          answers,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Quiz submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers(new Array(totalQuestions).fill(null));
    setCurrentQuestion(0);
    setSubmitted(false);
    setResult(null);
    setShowPrevious(false);
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  // Show previous attempt results
  if (showPrevious && previousAttempt) {
    const score = Math.round((previousAttempt.score / previousAttempt.totalQuestions) * 100);
    
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mb-6">
              <Trophy className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Previous Result</h2>
            <p className="text-gray-600 mb-6">{course?.title ?? ''}</p>

            <div className="text-6xl font-bold mb-4">
              <span className={score >= 70 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-600"}>
                {score}%
              </span>
            </div>
            <p className="text-gray-600 mb-8">
              You scored {previousAttempt.score} out of {previousAttempt.totalQuestions} questions correctly.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                Retake Quiz
              </button>
              <Link
                href={`/courses/${course?.id ?? ''}`}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Course
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show results after submission
  if (submitted && result) {
    const score = Math.round((result.score / result.total) * 100);
    
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mb-6">
              <Trophy className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-6">{quiz?.title ?? ''}</p>

            <div className="text-6xl font-bold mb-4">
              <span className={score >= 70 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-600"}>
                {score}%
              </span>
            </div>
            <p className="text-gray-600 mb-8">
              You scored {result.score} out of {result.total} questions correctly.
            </p>

            <div className="space-y-4 mb-8 text-left">
              {questions.map((q, idx) => {
                const isCorrect = result.correctAnswers[idx] === answers[idx];
                return (
                  <div
                    key={q?.id ?? idx}
                    className={`p-4 rounded-lg border ${
                      isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{q?.text ?? ''}</p>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">Your answer: </span>
                          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                            {q?.options?.[answers[idx] ?? 0] ?? ''}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm">
                            <span className="text-gray-500">Correct answer: </span>
                            <span className="text-green-600">
                              {q?.options?.[result.correctAnswers[idx]] ?? ''}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                Retake Quiz
              </button>
              <Link
                href={`/courses/${course?.id ?? ''}`}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Course
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href={`/courses/${course?.id ?? ''}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileQuestion className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{quiz?.title ?? 'Quiz'}</h1>
        </div>
        <p className="text-gray-600">{course?.title ?? ''}</p>
      </motion.div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-gray-600">
            {answeredCount} answered
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQ?.text ?? ''}
          </h2>

          <div className="space-y-3">
            {(currentQ?.options ?? []).map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  answers[currentQuestion] === idx
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === idx
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {answers[currentQuestion] === idx && (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className={answers[currentQuestion] === idx ? "text-primary font-medium" : "text-gray-700"}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>

        {currentQuestion === totalQuestions - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || answers.some((a) => a === null)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Submit Quiz
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1))}
            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQuestion(idx)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
              currentQuestion === idx
                ? "bg-primary text-white"
                : answers[idx] !== null
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
