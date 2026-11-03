import FigmaScreen from "@/components/FigmaScreen";

export default function Welcome() {
  return (
    <FigmaScreen
      name="welcome-screen"
      hotspots={[
        { label: "Start your journey", href: "/onboarding", x: 6.6, y: 61, width: 34, height: 9 },
        { label: "Already have an account? Log in", href: "/onboarding", x: 6.6, y: 71, width: 34, height: 6 },
      ]}
    />
  );
}
