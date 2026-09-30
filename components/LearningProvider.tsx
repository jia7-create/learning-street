"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { emptyLearningState, type Attempt, type Learner, type LearningState, STORAGE_KEY } from "@/lib/progress";

type LearningContextValue = LearningState & { ready: boolean; saveLearner: (learner: Learner) => void; recordAttempt: (attempt: Omit<Attempt, "id" | "studentName" | "timestamp">) => void; reset: () => void };
const LearningContext = createContext<LearningContextValue | null>(null);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LearningState>(emptyLearningState);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setState(JSON.parse(saved) as LearningState); } catch { localStorage.removeItem(STORAGE_KEY); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [ready, state]);
  const value = useMemo<LearningContextValue>(() => ({
    ...state, ready,
    saveLearner: learner => setState(s => ({ ...s, learner })),
    recordAttempt: attempt => setState(s => ({ ...s, attempts: [{ ...attempt, id: crypto.randomUUID(), studentName: s.learner?.name || "Learner", timestamp: new Date().toISOString() }, ...s.attempts] })),
    reset: () => setState(emptyLearningState)
  }), [state, ready]);
  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() { const value = useContext(LearningContext); if (!value) throw new Error("useLearning must be inside LearningProvider"); return value; }
