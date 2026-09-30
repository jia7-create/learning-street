export type Concept = {
  id: string;
  title: string;
  explanation: string;
  keywords: string[];
  misconception: string;
  question: { prompt: string; answer: string; options: string[]; explanation: string; intent: string };
};

export type CurriculumSubject = {
  slug: string;
  name: string;
  house: string;
  accent: "pink" | "blue" | "green" | "yellow";
  description: string;
  chapter?: string;
  source?: { label: string; url: string; chapter: string; board: string; grade: string; subject: string; retrievedAt: string };
  concepts: Concept[];
};

const scienceConcepts: Concept[] = [
  { id: "roots", title: "Roots", explanation: "Roots anchor a plant in the soil and absorb water and minerals from it.", keywords: ["anchor", "water", "minerals"], misconception: "Roots absorb water and minerals from soil; they do not make food for the plant.", question: { prompt: "Which plant part absorbs water and minerals from the soil?", answer: "Roots", options: ["Roots", "Leaves", "Flowers"], explanation: "Roots take up water and minerals from the soil and also hold the plant in place.", intent: "Recognition" } },
  { id: "root-types", title: "Taproot and fibrous root", explanation: "Some plants have one main taproot with smaller branches; others have many similarly sized fibrous roots.", keywords: ["taproot", "fibrous", "branches"], misconception: "A fibrous root system has many similar roots, rather than one large main root.", question: { prompt: "Which root system has many roots of similar size?", answer: "Fibrous roots", options: ["Fibrous roots", "Taproot", "Flower roots"], explanation: "A fibrous root system is made of many similarly sized roots.", intent: "Comparison" } },
  { id: "stem", title: "The stem", explanation: "The stem supports the plant and carries water from the roots to other parts, including the leaves.", keywords: ["support", "transport", "water"], misconception: "Water moves upward through the stem; the stem is not the plant's root.", question: { prompt: "Water absorbed by roots travels to the leaves through the…", answer: "Stem", options: ["Stem", "Flower", "Fruit"], explanation: "The stem carries water from the roots to the leaves and other parts of the plant.", intent: "Recall" } },
  { id: "leaves", title: "Leaves make food", explanation: "Leaves prepare food for the plant. The leaf blade is attached to the stem by a stalk, and veins run through the leaf.", keywords: ["leaf blade", "veins", "food"], misconception: "Leaves prepare food; roots absorb water and minerals.", question: { prompt: "Which plant part prepares food for the plant?", answer: "Leaves", options: ["Leaves", "Roots", "Stem"], explanation: "Leaves prepare food for the plant. This process is called photosynthesis.", intent: "Recognition" } },
  { id: "leaf-veins", title: "Leaf veins and venation", explanation: "The pattern of veins on a leaf is called venation. Veins help support the leaf and carry materials through it.", keywords: ["veins", "venation", "leaf"], misconception: "Venation is the pattern of veins in a leaf, not the arrangement of roots.", question: { prompt: "What is the pattern of veins in a leaf called?", answer: "Venation", options: ["Venation", "Germination", "Pollination"], explanation: "The pattern of veins in a leaf is called venation.", intent: "Recall" } },
  { id: "flowers", title: "Flowers", explanation: "Flowers are the reproductive parts of many plants. After flowering, fruits and seeds may develop.", keywords: ["reproduction", "fruit", "seed"], misconception: "Flowers are involved in reproduction; roots do not produce seeds.", question: { prompt: "Which plant part is commonly involved in reproduction?", answer: "Flower", options: ["Flower", "Root", "Stem"], explanation: "Flowers are the reproductive parts of many plants and can develop into fruits and seeds.", intent: "Recognition" } },
  { id: "plant-types", title: "Herbs, shrubs and trees", explanation: "Plants can be grouped by features such as size and the nature of their stems. Herbs are usually small with soft stems; shrubs are bushy; trees are taller with a hard trunk.", keywords: ["herb", "shrub", "tree"], misconception: "Plant groups are distinguished by observable features, not by the plant's age alone.", question: { prompt: "A small plant with a soft green stem is most likely a…", answer: "Herb", options: ["Herb", "Tree", "Shrub"], explanation: "Herbs are generally small plants with soft, green stems.", intent: "Application" } },
  { id: "leaf-shapes", title: "Leaf shapes and observation", explanation: "Leaves vary in shape, size and vein patterns. Careful observation helps identify and compare plants.", keywords: ["observe", "shape", "compare"], misconception: "Leaves from different plants can vary in shape and size.", question: { prompt: "What is a useful way to compare two leaves?", answer: "Observe their shape and veins", options: ["Observe their shape and veins", "Guess from the plant's name", "Compare the soil only"], explanation: "Looking closely at leaf shape and venation lets us describe observable differences.", intent: "Reasoning" } }
];

export const subjectCatalog: CurriculumSubject[] = [
  { slug: "science", name: "Science", house: "The Science House", accent: "green", description: "Observe the living world and test your recall.", chapter: "Getting to Know Plants", source: { label: "NCERT Class 6 Science · Chapter 7: Getting to Know Plants", chapter: "Chapter 7", url: "https://www.ncert.nic.in/textbook/pdf/gesc107.pdf", board: "CBSE", grade: "6", subject: "Science", retrievedAt: "2026-09-30" }, concepts: scienceConcepts },
  { slug: "mathematics", name: "Mathematics", house: "The Number House", accent: "blue", description: "Build confidence one problem at a time.", concepts: [] },
  { slug: "english", name: "English", house: "The Word House", accent: "pink", description: "Explore words, sentences and meaning.", concepts: [] },
  { slug: "social-science", name: "Social Science", house: "The History House", accent: "yellow", description: "Discover people, places and the past.", concepts: [] }
];

export function getSubject(slug: string) { return subjectCatalog.find(s => s.slug === slug); }
export function subjectForName(name: string) { return subjectCatalog.find(s => s.name.toLowerCase() === name.toLowerCase()); }
export function hasGroundedContent(learner: { board: string; grade: string } | null, subject: CurriculumSubject) {
  return !!learner && !!subject.source && subject.source.board === learner.board && subject.source.grade === learner.grade && subject.source.subject === subject.name;
}
