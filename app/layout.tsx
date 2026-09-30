import type { Metadata } from "next";
import "./globals.css";
import { LearningProvider } from "@/components/LearningProvider";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Learning Street",
  description: "Revision is a game on Study Street."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><LearningProvider>{children}<BackButton /></LearningProvider></body>
    </html>
  );
}
