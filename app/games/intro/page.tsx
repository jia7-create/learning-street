import GameIntroClient from "./GameIntroClient";

export default async function GameIntro({ searchParams }: { searchParams: Promise<{ game?: string; subject?: string; concept?: string }> }) {
  const params = await searchParams;
  return <GameIntroClient game={params.game || "catch-catch"} subject={params.subject || "science"} concept={params.concept || "roots"} />;
}
