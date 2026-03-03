"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bot, BookMarked, Trophy, Zap, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Tutor",
    description: "Get instant help and explanations from our intelligent AI assistant anytime.",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: BookMarked,
    title: "Structured Learning",
    description: "Follow carefully designed courses with progressive lessons and assessments.",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor your learning journey with detailed progress tracking and scores.",
    color: "text-orange-600 bg-orange-100",
  },
  {
    icon: Zap,
    title: "Learn Fast",
    description: "Efficient, focused content designed to maximize your learning outcomes.",
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    icon: Clock,
    title: "Self-Paced",
    description: "Learn whenever and wherever you want without any rigid schedules.",
    color: "text-teal-600 bg-teal-100",
  },
  {
    icon: Shield,
    title: "Quality Content",
    description: "Expert-curated courses covering essential skills across various domains.",
    color: "text-green-600 bg-green-100",
  },
];

export function FeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Educare?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey, powered by AI.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
