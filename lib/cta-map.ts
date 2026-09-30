export const ctaMap = {
  beginStudy: () => "/saa-boo-three",
  gameIntro: (game: string, subject: string, concept: string) => `/games/intro?game=${encodeURIComponent(game)}&subject=${encodeURIComponent(subject)}&concept=${encodeURIComponent(concept)}`,
  startGame: (game: string, subject: string, concept: string) => `/games/${encodeURIComponent(game)}?subject=${encodeURIComponent(subject)}&concept=${encodeURIComponent(concept)}`,
  gameResult: (game: string, subject: string, concept: string, score: number, total: number) => `/games/result?game=${encodeURIComponent(game)}&subject=${encodeURIComponent(subject)}&concept=${encodeURIComponent(concept)}&score=${score}&total=${total}`
} as const;
