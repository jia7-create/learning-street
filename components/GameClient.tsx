"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { GameConfig } from "@/lib/games";
import { getSubject, hasGroundedContent } from "@/lib/curriculum";
import { bestNextConcept, masteryFor } from "@/lib/progress";
import { useLearning } from "./LearningProvider";
import { ctaMap } from "@/lib/cta-map";

export default function GameClient({ config, subjectSlug = "science", conceptId = "" }: { config: GameConfig; subjectSlug?: string; conceptId?: string }) {
  const router = useRouter();
  const { learner, attempts, recordAttempt, ready } = useLearning();
  const subject = getSubject(subjectSlug) || getSubject("science")!;
  const own = attempts.filter(a => a.subject === subject.name);
  const [activeConceptId, setActiveConceptId] = useState(conceptId || bestNextConcept(subject.concepts, attempts)?.id || "");
  const concept = subject.concepts.find(c => c.id === activeConceptId) || bestNextConcept(subject.concepts, own);
  const question = concept?.question;
  const prior = own.filter(a => a.conceptId === concept?.id); const difficulty = Math.min(5, 1 + Math.floor(prior.filter(a => a.correct).length / 2));
  const [round, setRound] = useState(1); const [score, setScore] = useState(0); const [selected, setSelected] = useState<string | null>(null); const [feedback, setFeedback] = useState(""); const [startedAt, setStartedAt] = useState(0); const [busy, setBusy] = useState(false);
  useEffect(() => { setStartedAt(Date.now()); }, [round, concept?.id]);
  useEffect(() => { if (ready && !conceptId && round === 1 && !selected) { const recommendation = bestNextConcept(subject.concepts, attempts); if (recommendation) setActiveConceptId(recommendation.id); } }, [ready, conceptId, round, selected, attempts, subject.concepts]);
  const mode = config.slug;
  const statementIsTrue = round % 2 === 1;
  const simonPrompt = concept ? statementIsTrue ? concept.explanation : concept.misconception : "";
  const displayedPrompt = mode === "simon-says" ? `Simon says: “${simonPrompt}”` : mode === "king" ? `Which idea should hold the crown? ${question?.prompt || ""}` : mode === "cops-robbers" ? `Help the cop catch the mix-up: ${question?.prompt || ""}` : question?.prompt || "";
  const answerKey = mode === "simon-says" ? statementIsTrue ? "DO IT" : "DON’T DO IT" : question?.answer || "";
  const options = useMemo(() => mode === "simon-says" ? ["DO IT", "DON’T DO IT"] : question?.options || [], [question, mode, round]);
  if (!ready) return <main className="page-loading">Setting up your game…</main>;
  if (!learner) return <main className="empty-state"><h1>Choose your curriculum first.</h1><p>Your questions should match the subjects you’re studying.</p><Link className="black-button" href="/onboarding">Set up my street →</Link></main>;
  if (!hasGroundedContent(learner, subject) || !question) return <main className="empty-state"><h1>This house needs learning material first.</h1><p>There are no imported, source-linked questions for {subject.name} in your selected board and class yet.</p><Link className="black-button" href={`/subjects/${subject.slug}`}>Back to the house →</Link></main>;
  function choose(answer: string) {
    if (busy) return; setBusy(true); setSelected(answer); const correct = answer === answerKey; const responseTimeMs = Date.now() - startedAt;
    recordAttempt({ subject: subject.name, conceptId: concept!.id, conceptTitle: concept!.title, game: config.slug, correct, responseTimeMs, difficulty });
    if (correct) setScore(s => s + 10); setFeedback(mode === "simon-says" ? correct ? `${question!.explanation} That instruction was safe to follow.` : `${question!.explanation} The statement is a common mix-up, so don’t follow it.` : correct ? question!.explanation : `${question!.explanation} ${concept!.misconception}`);
  }
  function advance() {
    if (round >= 5) {
      const correctCount = Math.min(5, Math.round(score / 10) + (selected === answerKey ? 1 : 0));
      router.push(ctaMap.gameResult(config.slug, subject.slug, concept?.id || "", correctCount, 5));
      return;
    }
    const next = [...subject.concepts].sort((a, b) => masteryFor(a.id, own) - masteryFor(b.id, own)).find(c => c.id !== concept?.id) || concept; setActiveConceptId(next?.id || ""); setRound(r => r + 1); setSelected(null); setFeedback(""); setBusy(false);
  }
  const modeCopy: Record<string, { overline: string; prompt: string }> = {
    "catch-catch": { overline: "CATCH-CATCH", prompt: "Catch the right answer before it gets away." },
    "cops-robbers": { overline: "COPS & ROBBERS", prompt: "Help the cop spot the true idea and catch the misconception." },
    "hide-seek": { overline: "HIDE & SEEK", prompt: "Look through the hidden cards to find the answer." },
    king: { overline: "KING", prompt: "Choose the concept that earns its place on the throne." },
    "simon-says": { overline: "SIMON SAYS", prompt: "Follow the instruction that matches what you know." },
    "rock-paper-scissors": { overline: "ROCK PAPER SCISSORS", prompt: "Send the strongest concept into the round." }
  };
  const copy = modeCopy[mode] || modeCopy["catch-catch"];
  return <main className="game-page"><header className="game-topbar"><Link href="/hub" className="brand"><span className="brand-mark">LS</span> Learning Street</Link><div className="game-stats">ROUND {round} <span>·</span> {score} XP <span>·</span> {subject.name}</div><Link href={`/subjects/${subject.slug}`} className="exit">Exit game <span>×</span></Link></header>
    <section className={`game-stage mode-${mode}`}><div className="game-heading"><span className="mint-tag">{copy.overline} <i>·</i> {mode === "simon-says" ? "TRUE OR FALSE" : question.intent.toUpperCase()}</span><h1>{displayedPrompt}</h1><p>{copy.prompt}</p><div className="game-chapter">{subject.chapter} <span>·</span> {concept!.title} <span>·</span> Level {difficulty}</div><span className="game-question-count">Question {round} of 5</span></div>
      <div className={`answer-board board-${mode}`} aria-label={`${config.name} answers`}>{options.map((answer, i) => { const isCorrect = selected && answer === answerKey; const isSelected = selected === answer; const revealed = mode !== "hide-seek" || selected === answer || !!selected; return <button key={answer} disabled={!!selected} onClick={() => choose(answer)} className={`answer-choice choice-${i} ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${selected && isSelected && !isCorrect ? "incorrect" : ""} ${revealed ? "revealed" : ""}`}><span className="choice-number">{String.fromCharCode(65 + i)}</span><strong>{answer}</strong>{mode === "cops-robbers" && <small>{i === 1 ? "CHECK THIS CLUE" : "CLUE"}</small>}{mode === "rock-paper-scissors" && <small>{["ROCK", "PAPER", "SCISSORS"][i]}</small>}{mode === "king" && <small>{i === 0 ? "CLAIM THE CROWN" : "CHALLENGER"}</small>}</button>; })}</div>
      {selected && <div className={`answer-feedback ${selected === answerKey ? "positive" : "revisit"}`} role="status"><span className="feedback-symbol">{selected === answerKey ? "✓" : "↻"}</span><div><strong>{selected === answerKey ? "Lovely recall!" : "A good idea to revisit."}</strong><p>{feedback}</p></div><button className="black-button" onClick={advance}>{round >= 5 ? "See results" : "Next round"} <span>→</span></button></div>}
      <div className="game-footer"><span>Question {round} <i>·</i> Your answers shape your progress.</span><Link href="/ai-aunty">Need a hint? Ask AI Aunty →</Link></div>
    </section>
  </main>;
}
