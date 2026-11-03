import { getSubject, hasGroundedContent, subjectForName } from "./curriculum";
import { bestNextConcept, type Attempt, type Learner } from "./progress";
import type { DifficultyMode } from "./games";

export const STUDY_SESSION_KEY = "learning-street-study-session-v1";

export type SessionRoundRecord = {
  round: number;
  conceptId: string;
  conceptTitle: string;
  subjectName: string;
  subjectSlug: string;
  prompt: string;
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
  explanation: string;
  misconception: string;
  responseTimeMs: number;
};

export type StudySession = {
  id: string;
  studentName: string;
  subjectSlug: string;
  conceptId: string;
  selectedGame: string | null;
  startedAt: string;
  status: "preparing" | "intro" | "playing" | "complete";
  studyMode?: "solo" | "friends";
  previousPath?: string;
  difficultyMode?: DifficultyMode;
  sessionLengthMinutes?: number;
  totalPlannedQuestions?: number;
  elapsedSeconds?: number;
  xpEarned?: number;
  stonesEarned?: number;
  roundResults?: SessionRoundRecord[];
};

export const gameSlugs = [
  "catch-catch",
  "cops-robbers",
  "simon-says",
  "king",
  "hide-seek",
] as const;

export function createStudySession(
  learner: Learner | null,
  attempts: Attempt[],
  preferredSubjectSlug?: string,
  preferredConceptId?: string,
  previousPath = "/hub"
): StudySession {
  const selectedSubjects =
    learner?.subjects
      .map((name) => subjectForName(name, learner?.grade, learner?.board))
      .filter((subject): subject is NonNullable<typeof subject> => !!subject) ||
    [];
  const currentSubject = selectedSubjects.find((subject) =>
    hasGroundedContent(learner, subject)
  );
  const preferred = preferredSubjectSlug
    ? getSubject(preferredSubjectSlug, learner?.grade, learner?.board)
    : undefined;
  const subject =
    preferred ||
    currentSubject ||
    selectedSubjects[0] ||
    getSubject("science", learner?.grade, learner?.board)!;
  const concept =
    subject.concepts.find((item) => item.id === preferredConceptId) ||
    bestNextConcept(subject.concepts, attempts) ||
    subject.concepts[0];
  return {
    id:
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    studentName: learner?.name || "Learner",
    subjectSlug: subject.slug,
    conceptId: concept?.id || "",
    selectedGame: null,
    startedAt: new Date().toISOString(),
    status: "preparing",
    previousPath,
    difficultyMode: "simple",
    sessionLengthMinutes: 10,
    totalPlannedQuestions: 4,
    roundResults: [],
  };
}

export function readStudySession(): StudySession | null {
  try {
    const raw = localStorage.getItem(STUDY_SESSION_KEY);
    return raw ? (JSON.parse(raw) as StudySession) : null;
  } catch {
    return null;
  }
}

export function saveStudySession(session: StudySession) {
  localStorage.setItem(STUDY_SESSION_KEY, JSON.stringify(session));
}

export function selectGameForSession(
  session: StudySession,
  avoidGame?: string
): StudySession {
  const seed = [...session.id].reduce(
    (value, char) => (value * 31 + char.charCodeAt(0)) >>> 0,
    7
  );
  let index = seed % gameSlugs.length;
  if (session.selectedGame) {
    index =
      (gameSlugs.indexOf(session.selectedGame as (typeof gameSlugs)[number]) +
        1) %
      gameSlugs.length;
  }
  let selectedGame = gameSlugs[index];
  if (avoidGame && selectedGame === avoidGame) {
    selectedGame = gameSlugs[(index + 1) % gameSlugs.length];
  }
  return { ...session, selectedGame, status: "intro" };
}
