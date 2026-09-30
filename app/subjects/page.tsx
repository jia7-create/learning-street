import FigmaScreen from "@/components/FigmaScreen";

export default function Subjects() {
  return <FigmaScreen name="all-subjects" hotspots={[
    { label: "Return to Learner’s Hub", href: "/hub", x: 4, y: 2, width: 20, height: 7 },
    { label: "View your progress", href: "/progress", x: 51, y: 2, width: 17, height: 7 },
    { label: "Open Mathematics house", href: "/subjects/mathematics", x: 8, y: 25, width: 24, height: 23 },
    { label: "Open English house", href: "/subjects/english", x: 38, y: 25, width: 24, height: 23 },
    { label: "Open Science house", href: "/subjects/science", x: 68, y: 25, width: 24, height: 23 },
    { label: "Play revision games", href: "/games", x: 7, y: 57, width: 24, height: 8 }
  ]} />;
}
