import FigmaScreen from "@/components/FigmaScreen";

export default function Progress() {
  return <FigmaScreen name="progress" hotspots={[
    { label: "Return to Learner’s Hub", href: "/hub", x: 4, y: 2, width: 20, height: 7 },
    { label: "Browse subject houses", href: "/subjects", x: 68, y: 2, width: 17, height: 7 },
    { label: "Continue revising", href: "/saa-boo-three?subject=science", x: 7, y: 54, width: 26, height: 8 },
    { label: "Open Science house", href: "/subjects/science", x: 66, y: 61, width: 26, height: 12 }
  ]} />;
}
