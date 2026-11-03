"use client";

import { useLearning } from "@/components/LearningProvider";
import Hub from "@/app/hub/page";
import Landing from "@/app/landing/page";

export default function HomePage() {
  const { learner, ready } = useLearning();

  if (!ready) {
    return <main className="page-loading">Opening Learning Street…</main>;
  }

  if (!learner) {
    return <Landing />;
  }

  return <Hub />;
}
