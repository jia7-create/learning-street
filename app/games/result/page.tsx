import GameResultClient from "./GameResultClient";

export default async function GameResult({ searchParams }: { searchParams: Promise<{ game?: string; subject?: string; concept?: string; score?: string; total?: string }> }) {
  const params = await searchParams;
  return <GameResultClient game={params.game || "catch-catch"} subjectSlug={params.subject || "science"} conceptId={params.concept || "roots"} score={Number(params.score || 0)} total={Number(params.total || 5)} />;
}
