export type DifficultyMode = "simple" | "intermediate" | "hard";

export type DifficultySessionOption = {
  mode: DifficultyMode;
  label: string;
  durationLabel: string;
  durationMinutes: number;
  description: string;
  questionCount: number;
  xpPerCorrect: number;
  paceMultiplier: number;
  timerSecondsPerRound: number;
  accentBg: string;
};

export const DIFFICULTY_SESSIONS: DifficultySessionOption[] = [
  {
    mode: "simple",
    label: "SIMPLE",
    durationLabel: "10 min",
    durationMinutes: 10,
    description: "A shorter revision session",
    questionCount: 4,
    xpPerCorrect: 10,
    paceMultiplier: 0.72,
    timerSecondsPerRound: 16,
    accentBg: "#e5f9ed",
  },
  {
    mode: "intermediate",
    label: "INTERMEDIATE",
    durationLabel: "15 min",
    durationMinutes: 15,
    description: "A balanced revision session",
    questionCount: 6,
    xpPerCorrect: 15,
    paceMultiplier: 1.0,
    timerSecondsPerRound: 12,
    accentBg: "#e4ebf8",
  },
  {
    mode: "hard",
    label: "HARD",
    durationLabel: "20 min",
    durationMinutes: 20,
    description: "A longer and more challenging revision session",
    questionCount: 8,
    xpPerCorrect: 20,
    paceMultiplier: 1.38,
    timerSecondsPerRound: 9,
    accentBg: "#fce7eb",
  },
];

export function getDifficultyConfig(mode?: string | null): DifficultySessionOption {
  return (
    DIFFICULTY_SESSIONS.find((d) => d.mode === mode) || DIFFICULTY_SESSIONS[0]
  );
}

export type GameConfig = {
  slug: string;
  number: string;
  name: string;
  purpose: string;
  time: string;
  accentBg: string;
  badgeText: string;
};

export const games: GameConfig[] = [
  {
    slug: "catch-catch",
    number: "01",
    name: "Catch Catch",
    purpose: "4 runner characters move across the street — catch the runner carrying the correct answer before they get away.",
    time: "10–20 mins",
    accentBg: "#e4ebf8",
    badgeText: "CATCH THE RUNNER",
  },
  {
    slug: "cops-robbers",
    number: "02",
    name: "Cops & Robbers",
    purpose: "Choose the correct answer checkpoint to help the Police catch the fleeing Robber on the street.",
    time: "10–20 mins",
    accentBg: "#fce7eb",
    badgeText: "POLICE CHASE",
  },
  {
    slug: "simon-says",
    number: "03",
    name: "Simon Says",
    purpose: "Perform JUMP, CLAP, TURN, or STOMP only when the instruction begins with 'Simon says'!",
    time: "10–20 mins",
    accentBg: "#e5f9ed",
    badgeText: "ATTENTION & ACTION",
  },
  {
    slug: "king",
    number: "04",
    name: "King",
    purpose: "Advance your character step-by-step across the street stones toward becoming the King.",
    time: "10–20 mins",
    accentBg: "#fff3b0",
    badgeText: "PATH TO THE CROWN",
  },
  {
    slug: "hide-seek",
    number: "05",
    name: "Hide & Seek",
    purpose: "Search behind houses, trees, walls, and street buses to find where the right concept is hiding.",
    time: "10–20 mins",
    accentBg: "#f5e8fa",
    badgeText: "SEARCH THE STREET",
  },
];