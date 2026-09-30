import type { Concept } from "./curriculum";

export type Attempt = { id: string; studentName: string; subject: string; conceptId: string; conceptTitle: string; game: string; correct: boolean; responseTimeMs: number; difficulty: number; timestamp: string };
export type Learner = { name: string; grade: string; board: string; subjects: string[]; language: string };
export type LearningState = { learner: Learner | null; attempts: Attempt[] };
export const STORAGE_KEY = "learning-street-v1";

export const emptyLearningState: LearningState = { learner: null, attempts: [] };

export function masteryFor(conceptId: string, attempts: Attempt[]) {
  const own = attempts.filter(a => a.conceptId === conceptId);
  if (!own.length) return 0;
  const correct = own.filter(a => a.correct).length;
  const accuracy = correct / own.length;
  const recent = own.slice(0, 3).filter(a => a.correct).length / Math.min(3, own.length);
  return Math.round(Math.min(100, (accuracy * 65 + recent * 20 + Math.min(own.length, 5) * 3) * Math.min(1, own.length / 2)));
}

export function getSubjectStats(concepts: Concept[], attempts: Attempt[]) {
  const scores = concepts.map(c => masteryFor(c.id, attempts));
  const mastered = scores.filter(s => s >= 65).length;
  return { mastery: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0, mastered, remaining: Math.max(0, concepts.length - mastered), scores };
}

export function bestNextConcept(concepts: Concept[], attempts: Attempt[]) {
  return [...concepts].sort((a, b) => masteryFor(a.id, attempts) - masteryFor(b.id, attempts))[0];
}
