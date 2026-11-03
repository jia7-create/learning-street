export const ctaMap = {
  beginStudy: () => "/saa-boo-three",
  gameIntro: (game: string, subject: string, concept: string) =>
    `/games/intro?game=${encodeURIComponent(game)}&subject=${encodeURIComponent(subject)}&concept=${encodeURIComponent(concept)}`,
  startGame: (
    game: string,
    subject: string,
    concept: string,
    difficulty = "simple"
  ) =>
    `/games/${encodeURIComponent(game)}?subject=${encodeURIComponent(subject)}&concept=${encodeURIComponent(concept)}&difficulty=${encodeURIComponent(difficulty)}`,
  gameResult: (
    game: string,
    subject: string,
    concept: string,
    score: number,
    total: number,
    difficulty = "simple"
  ) =>
    `/games/result?game=${encodeURIComponent(game)}&subject=${encodeURIComponent(subject)}&concept=${encodeURIComponent(concept)}&score=${score}&total=${total}&difficulty=${encodeURIComponent(difficulty)}`,
} as const;
