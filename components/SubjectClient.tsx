"use client";

import FigmaScreen from "@/components/FigmaScreen";
import { getSubject } from "@/lib/curriculum";

export default function SubjectClient({ slug }: { slug: string }) {
  const subject = getSubject(slug);
  const firstConcept = subject?.concepts[0]?.id;
  const playHref = firstConcept ? `/saa-boo-three?subject=${slug}&concept=${firstConcept}&from=%2Fsubjects%2F${slug}` : `/saa-boo-three?subject=${slug}&from=%2Fsubjects%2F${slug}`;

  return <FigmaScreen name="individual-subject-house" hotspots={[
    { label: "Return to Learner’s Hub", href: "/hub", x: 4, y: 2, width: 20, height: 7 },
    { label: "Browse all subject houses", href: "/subjects", x: 68, y: 2, width: 17, height: 7 },
    { label: "Start studying", href: playHref, x: 7, y: 30, width: 25, height: 8 },
    { label: "Play Catch Catch", href: playHref, x: 7, y: 72, width: 26, height: 12 },
    { label: "Play Simon Says", href: playHref, x: 37, y: 72, width: 26, height: 12 },
    { label: "Play Saa Boo Three", href: playHref, x: 67, y: 72, width: 26, height: 12 }
  ]} />;
}
