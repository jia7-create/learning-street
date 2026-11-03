"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  emptyLearningState,
  masteryFor,
  type Attempt,
  type Learner,
  type LearningState,
  type ProgressSummary,
  STORAGE_KEY,
} from "@/lib/progress";

type LearningContextValue = LearningState & {
  ready: boolean;
  progress: ProgressSummary;
  saveLearner: (learner: Learner) => void;
  recordAttempt: (attempt: Omit<Attempt, "id" | "studentName" | "timestamp">) => void;
  addSubjectHouse: (subjectId: string) => void;
  removeSubjectHouse: (subjectId: string) => void;
  markConceptMastered: (conceptId: string, xpBonus?: number) => void;
  recordGameResult: (result: {
    title: string;
    score: string;
    xpEarned: number;
    correct: number;
    total: number;
  }) => void;
  reset: () => void;
  resetAll: () => void;
};

const LearningContext = createContext<LearningContextValue | null>(null);

const ID_TO_NAME: Record<string, string> = {
  biology: "Science",
  science: "Science",
  maths: "Mathematics",
  mathematics: "Mathematics",
  english: "English",
  history: "Social Science",
  "social-science": "Social Science",
};

const NAME_TO_ID: Record<string, string> = {
  Science: "biology",
  Mathematics: "maths",
  English: "english",
  "Social Science": "history",
};

function enrichLearner(raw: Learner | null): Learner | null {
  if (!raw) return null;
  const classLevel = raw.classLevel || Number(raw.grade) || 6;
  const enrolledFromNames = (raw.subjects || []).map(
    (n) => NAME_TO_ID[n] || n.toLowerCase()
  );
  const enrolledSubjects = Array.from(
    new Set([...(raw.enrolledSubjects || []), ...enrolledFromNames])
  );
  return {
    ...raw,
    classLevel,
    enrolledSubjects: enrolledSubjects.length
      ? enrolledSubjects
      : ["biology", "maths", "english"],
  };
}

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LearningState>(emptyLearningState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as LearningState;
        setState({
          ...emptyLearningState,
          ...parsed,
          learner: enrichLearner(parsed.learner),
        });
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [ready, state]);

  const value = useMemo<LearningContextValue>(() => {
    const learner = enrichLearner(state.learner);
    const attempts = state.attempts || [];
    const manualMastered = state.manualMastered || [];
    const bonusXp = state.bonusXp || 0;

    const correctAnswers = attempts.filter((a) => a.correct).length;
    const totalQuestions = attempts.length;

    const conceptIdsFromAttempts = Array.from(
      new Set(attempts.map((a) => a.conceptId))
    );
    const masteredFromAttempts = conceptIdsFromAttempts.filter(
      (cid) => masteryFor(cid, attempts) >= 50 || attempts.some((a) => a.conceptId === cid && a.correct)
    );
    const masteredConcepts = Array.from(
      new Set([...manualMastered, ...masteredFromAttempts])
    );

    const xp = correctAnswers * 10 + manualMastered.length * 15 + bonusXp;
    const streak = attempts.length > 0 || manualMastered.length > 0 ? 3 : 1;

    const recentActivity = attempts.slice(0, 6).map((a) => ({
      id: a.id,
      title: `${a.conceptTitle} (${a.game})`,
      score: a.correct ? "+10 XP ✓" : "Practised",
      timestamp: a.timestamp,
    }));

    const progress: ProgressSummary = {
      xp,
      streak,
      totalQuestions,
      correctAnswers,
      masteredConcepts,
      recentActivity,
    };

    const saveLearner = (next: Learner) => {
      setState((s) => ({
        ...s,
        learner: enrichLearner(next),
      }));
    };

    const addSubjectHouse = (subjectId: string) => {
      const subjectName = ID_TO_NAME[subjectId] || "Science";
      setState((s) => {
        const current = s.learner || {
          name: "Neighbour",
          grade: "6",
          board: "CBSE",
          subjects: ["Science", "Mathematics", "English"],
          language: "English",
        };
        const nextSubjects = Array.from(
          new Set([...(current.subjects || []), subjectName])
        );
        const nextEnrolled = Array.from(
          new Set([...(current.enrolledSubjects || []), subjectId])
        );
        return {
          ...s,
          learner: enrichLearner({
            ...current,
            subjects: nextSubjects,
            enrolledSubjects: nextEnrolled,
          }),
        };
      });
    };

    const removeSubjectHouse = (subjectId: string) => {
      const subjectName = ID_TO_NAME[subjectId];
      setState((s) => {
        if (!s.learner) return s;
        const nextSubjects = (s.learner.subjects || []).filter(
          (n) => n !== subjectName
        );
        const nextEnrolled = (s.learner.enrolledSubjects || []).filter(
          (id) => id !== subjectId
        );
        if (nextSubjects.length === 0 && nextEnrolled.length === 0) return s;
        return {
          ...s,
          learner: enrichLearner({
            ...s.learner,
            subjects: nextSubjects,
            enrolledSubjects: nextEnrolled,
          }),
        };
      });
    };

    const markConceptMastered = (conceptId: string, xpBonus = 15) => {
      setState((s) => {
        const list = s.manualMastered || [];
        if (list.includes(conceptId)) return s;
        return {
          ...s,
          manualMastered: [...list, conceptId],
          bonusXp: (s.bonusXp || 0) + xpBonus,
        };
      });
    };

    const recordGameResult = (res: {
      title: string;
      score: string;
      xpEarned: number;
      correct: number;
      total: number;
    }) => {
      setState((s) => ({
        ...s,
        bonusXp: (s.bonusXp || 0) + res.xpEarned,
        attempts: [
          {
            id: crypto.randomUUID(),
            studentName: s.learner?.name || "Learner",
            subject: "Mental Ability",
            conceptId: res.title,
            conceptTitle: res.title,
            game: "mental-ability",
            correct: res.correct > 0,
            responseTimeMs: 3000,
            difficulty: 1,
            timestamp: new Date().toISOString(),
          },
          ...(s.attempts || []),
        ],
      }));
    };

    const reset = () => setState(emptyLearningState);

    return {
      ...state,
      learner,
      ready,
      progress,
      saveLearner,
      recordAttempt: (attempt) =>
        setState((s) => ({
          ...s,
          attempts: [
            {
              ...attempt,
              id: crypto.randomUUID(),
              studentName: s.learner?.name || "Learner",
              timestamp: new Date().toISOString(),
            },
            ...s.attempts,
          ],
        })),
      addSubjectHouse,
      removeSubjectHouse,
      markConceptMastered,
      recordGameResult,
      reset,
      resetAll: reset,
    };
  }, [state, ready]);

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const value = useContext(LearningContext);
  if (!value) throw new Error("useLearning must be inside LearningProvider");
  return value;
}
