import { subjectCatalog } from "./curriculum";
export const questions = subjectCatalog.flatMap(s => s.concepts.map(c => ({ prompt: c.question.prompt, answer: c.question.answer, options: c.question.options })));
export function questionFor(round: number) {
  if (!questions.length) return { prompt: "Start with one learning question.", answer: "", options: [] as string[] };
  return questions[round % questions.length];
}
