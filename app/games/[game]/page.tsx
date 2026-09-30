import { notFound } from "next/navigation";
import GameClient from "@/components/GameClient";
import { games } from "@/lib/games";

export default async function GamePage({ params, searchParams }: { params: Promise<{ game: string }>; searchParams: Promise<{ subject?: string; concept?: string }> }) {
  const [{ game }, query] = await Promise.all([params, searchParams]);
  const config = games.find(g => g.slug === game);
  if (!config) notFound();
  return <GameClient config={config} subjectSlug={query.subject} conceptId={query.concept} />;
}
