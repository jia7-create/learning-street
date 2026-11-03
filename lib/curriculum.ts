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
  topic?: string;
  chapter?: string;
  chapters?: string[];
  source?: { label: string; url: string; chapter: string; board: string; grade: string; subject: string; retrievedAt: string };
  concepts: Concept[];
};

// ==========================================
// CBSE CLASS 6 CONCEPTS (NCERT ALIGNED)
// ==========================================

const scienceConceptsClass6CBSE: Concept[] = [
  { id: "roots", title: "Roots", explanation: "Roots anchor a plant in the soil and absorb water and minerals from it.", keywords: ["anchor", "water", "minerals"], misconception: "Roots absorb water and minerals from soil; they do not make food for the plant.", question: { prompt: "Which plant part absorbs water and minerals from the soil?", answer: "Roots", options: ["Roots", "Leaves", "Flowers"], explanation: "Roots take up water and minerals from the soil and also hold the plant in place.", intent: "Recognition" } },
  { id: "root-types", title: "Taproot and fibrous root", explanation: "Some plants have one main taproot with smaller lateral branches; others have many similarly sized fibrous roots arising from the base of the stem.", keywords: ["taproot", "fibrous", "branches"], misconception: "A fibrous root system has many similar roots, rather than one large main root.", question: { prompt: "Which root system has many roots of similar size?", answer: "Fibrous roots", options: ["Fibrous roots", "Taproot", "Flower roots"], explanation: "A fibrous root system is made of many similarly sized roots.", intent: "Comparison" } },
  { id: "stem", title: "The stem", explanation: "The stem supports the plant and carries water and minerals upward from the roots to the leaves and flowers.", keywords: ["support", "transport", "water"], misconception: "Water moves upward through the stem; the stem is not the plant's root.", question: { prompt: "Water absorbed by roots travels to the leaves through the…", answer: "Stem", options: ["Stem", "Flower", "Fruit"], explanation: "The stem carries water from the roots to the leaves and other parts of the plant.", intent: "Recall" } },
  { id: "leaves", title: "Leaves make food", explanation: "Leaves prepare food for the plant in the presence of sunlight and green chlorophyll. Water vapour is also released through stomata during transpiration.", keywords: ["leaf blade", "veins", "food", "transpiration"], misconception: "Leaves prepare food; roots absorb water and minerals.", question: { prompt: "Which plant part prepares food for the plant?", answer: "Leaves", options: ["Leaves", "Roots", "Stem"], explanation: "Leaves prepare food for the plant. This process is called photosynthesis.", intent: "Recognition" } },
  { id: "leaf-veins", title: "Leaf veins and venation", explanation: "The pattern of veins on a leaf is called venation. Net-like veins form reticulate venation, while parallel veins (as in grass) form parallel venation.", keywords: ["veins", "venation", "reticulate", "parallel"], misconception: "Venation is the pattern of veins in a leaf, not the arrangement of roots.", question: { prompt: "What is the pattern of veins in a leaf called?", answer: "Venation", options: ["Venation", "Germination", "Pollination"], explanation: "The pattern of veins in a leaf is called venation (reticulate or parallel).", intent: "Recall" } },
  { id: "flowers", title: "Flowers", explanation: "Flowers are the reproductive parts of many plants with petals, sepals, stamens and pistil. After flowering, fruits and seeds develop.", keywords: ["reproduction", "fruit", "seed"], misconception: "Flowers are involved in reproduction; roots do not produce seeds.", question: { prompt: "Which plant part is commonly involved in reproduction?", answer: "Flower", options: ["Flower", "Root", "Stem"], explanation: "Flowers are the reproductive parts of many plants and can develop into fruits and seeds.", intent: "Recognition" } },
  { id: "plant-types", title: "Herbs, shrubs and trees", explanation: "NCERT groups plants by height and stem nature: herbs are small with tender green stems; shrubs have hard stems branching near the base; trees have a thick brown trunk.", keywords: ["herb", "shrub", "tree"], misconception: "Plant groups are distinguished by observable stem and branching features, not age alone.", question: { prompt: "A small plant with a soft green stem is most likely a…", answer: "Herb", options: ["Herb", "Tree", "Shrub"], explanation: "Herbs are generally small plants with soft, green stems.", intent: "Application" } },
  { id: "leaf-shapes", title: "Leaf shapes and observation", explanation: "Leaves vary in shape, margin and venation. In NCERT activities, leaf impressions and root types correlate (reticulate venation with taproots).", keywords: ["observe", "shape", "compare"], misconception: "Leaves from different plants can vary in shape and venation.", question: { prompt: "What is a useful way to compare two leaves?", answer: "Observe their shape and veins", options: ["Observe their shape and veins", "Guess from the plant's name", "Compare the soil only"], explanation: "Looking closely at leaf shape and venation lets us describe observable differences.", intent: "Reasoning" } }
];

const mathsConceptsClass6CBSE: Concept[] = [
  { id: "fractions", title: "Fractions and Parts", explanation: "A fraction represents a part of a whole or a collection divided into equal parts, written with a numerator over a denominator.", keywords: ["part", "numerator", "denominator", "fraction"], misconception: "The denominator indicates the total equal parts in the whole, not the unshaded parts.", question: { prompt: "In the fraction 3/4, what does 4 represent?", answer: "Total equal parts", options: ["Total equal parts", "Parts shaded", "The difference"], explanation: "The denominator (bottom number) shows how many equal parts the whole is divided into.", intent: "Concept" } },
  { id: "integers", title: "Integers and Number Line", explanation: "Integers include positive numbers, zero, and negative numbers. Moving left on the number line decreases value; moving right increases value.", keywords: ["negative", "positive", "zero", "number line"], misconception: "-5 is smaller than -2 because it lies further left on the number line.", question: { prompt: "Which integer is greater: -3 or -8?", answer: "-3", options: ["-3", "-8", "They are equal"], explanation: "-3 is further right on the number line than -8, so it has a greater value.", intent: "Comparison" } },
  { id: "decimals", title: "Decimals and Place Value", explanation: "Decimals extend the place value chart to tenths (1/10) and hundredths (1/100) to measure lengths, weights, and money.", keywords: ["decimal", "tenths", "hundredths", "place value"], misconception: "0.5 is greater than 0.05 because tenths are ten times larger than hundredths.", question: { prompt: "Which is larger: 0.5 or 0.05?", answer: "0.5", options: ["0.5", "0.05", "Both are equal"], explanation: "0.5 represents 5 tenths, while 0.05 represents only 5 hundredths.", intent: "Recall" } },
  { id: "algebra", title: "Variables and Matchstick Patterns", explanation: "In NCERT algebra, letters (variables) stand for unknown or changing numbers, such as 2n matchsticks needed for n L-patterns.", keywords: ["variable", "expression", "unknown", "algebra"], misconception: "A variable can take different numerical values depending on the condition.", question: { prompt: "If x = 4, what is the value of 3x + 2?", answer: "14", options: ["14", "10", "12"], explanation: "3 multiplied by 4 is 12, and 12 + 2 equals 14.", intent: "Application" } },
  { id: "angles-lines", title: "Basic Geometrical Ideas (Lines & Angles)", explanation: "An angle is formed when two rays meet at a common vertex. Angles are measured in turns: right angle (90°), straight angle (180°), acute, and obtuse.", keywords: ["ray", "vertex", "right angle", "acute"], misconception: "The size of an angle depends on the rotation between rays, not the drawn length of the arms.", question: { prompt: "What type of angle measures exactly 90 degrees?", answer: "Right angle", options: ["Right angle", "Acute angle", "Obtuse angle"], explanation: "An angle measuring exactly 90° (one-fourth of a revolution) is a right angle.", intent: "Recognition" } },
  { id: "perimeter-area", title: "Mensuration: Perimeter and Area", explanation: "Perimeter is the distance around the boundary of a closed figure, while area is the amount of surface enclosed by it.", keywords: ["boundary", "distance", "inside", "perimeter", "area"], misconception: "Two shapes with the same perimeter do not necessarily have the same area.", question: { prompt: "What is the perimeter of a rectangle with length 6 cm and width 4 cm?", answer: "20 cm", options: ["20 cm", "24 cm", "10 cm"], explanation: "Perimeter = 2 × (length + width) = 2 × (6 + 4) = 20 cm.", intent: "Application" } }
];

const englishConceptsClass6CBSE: Concept[] = [
  { id: "nouns-pronouns", title: "Nouns and Pronouns in Context", explanation: "Nouns name people, places, things, or qualities. Pronouns take the place of nouns so stories flow naturally without repetition.", keywords: ["naming", "replacement", "pronoun", "noun"], misconception: "Pronouns must agree in number and gender with the noun they replace.", question: { prompt: "Which word in 'Ravi kicked the ball to him' is a pronoun?", answer: "him", options: ["him", "Ravi", "ball"], explanation: "'Him' replaces a person's name and functions as an object pronoun.", intent: "Recognition" } },
  { id: "action-verbs", title: "Action Verbs and Tenses", explanation: "Verbs express actions or states of being. Tense tells whether the action occurred in the past, happens in the present, or will happen in the future.", keywords: ["action", "past", "present", "tense"], misconception: "Regular past tense verbs end in -ed, whereas irregular verbs change their root vowel.", question: { prompt: "What is the past tense of the verb 'run'?", answer: "ran", options: ["ran", "runned", "running"], explanation: "'Run' is an irregular verb whose past tense form is 'ran'.", intent: "Recall" } },
  { id: "adjectives", title: "Descriptive Adjectives", explanation: "Adjectives describe or give more information about nouns (quality, quantity, number, or colour) in Honeysuckle prose stories.", keywords: ["describe", "modify", "quality", "adjective"], misconception: "Adjectives modify nouns and pronouns, whereas adverbs modify verbs.", question: { prompt: "Identify the adjective: 'The energetic puppy chased the yellow ball.'", answer: "energetic", options: ["energetic", "chased", "puppy"], explanation: "'Energetic' describes the puppy, making it an adjective.", intent: "Recognition" } },
  { id: "prepositions", title: "Prepositions of Place & Time", explanation: "Prepositions link nouns to other words in a sentence to show position, time, or direction (on, under, between, across, during).", keywords: ["position", "location", "direction", "preposition"], misconception: "Use 'on' for surfaces, 'in' for enclosed spaces, and 'at' for specific points.", question: { prompt: "Which preposition shows something resting on a surface?", answer: "on", options: ["on", "through", "behind"], explanation: "'On' describes an object in contact with a supporting surface.", intent: "Application" } },
  { id: "conjunctions", title: "Connecting Words (Conjunctions)", explanation: "Conjunctions connect words, phrases, or clauses to show addition (and), contrast (but, although), or reason (because, since).", keywords: ["connect", "join", "because", "conjunction"], misconception: "'Because' introduces a cause, while 'so' introduces a result.", question: { prompt: "Which conjunction best completes: 'She stayed home ___ it was raining'?", answer: "because", options: ["because", "or", "but"], explanation: "'Because' explains the reason why she stayed home.", intent: "Application" } },
  { id: "vocabulary", title: "Reading Comprehension & Context Clues", explanation: "Context clues in surrounding sentences help readers infer the meaning of unfamiliar words without stopping to use a dictionary.", keywords: ["context", "clues", "meaning", "synonym"], misconception: "Word meaning shifts with context; always read the full sentence.", question: { prompt: "What does 'ancient' mean in 'The ancient temple was built 2,000 years ago'?", answer: "Very old", options: ["Very old", "Brand new", "Small"], explanation: "The 2,000-year timeline provides context that 'ancient' means very old.", intent: "Reasoning" } }
];

const socialConceptsClass6CBSE: Concept[] = [
  { id: "past-clues", title: "Finding Clues of the Past (Manuscripts)", explanation: "In NCERT 'Our Pasts-I', historians and archaeologists study manuscripts written on palm leaves/birch bark and inscriptions carved on stone.", keywords: ["history", "manuscripts", "inscriptions", "archaeology"], misconception: "Manuscripts were handwritten on perishable palm leaves, while inscriptions were engraved on hard stone or metal.", question: { prompt: "What are handwritten books on palm leaves from ancient times called?", answer: "Manuscripts", options: ["Manuscripts", "Inscriptions", "Newspapers"], explanation: "Old books written by hand on palm leaf or birch bark are called manuscripts.", intent: "Recognition" } },
  { id: "hunting-farming", title: "From Hunter-Gatherers to Farmers", explanation: "Early humans moved from place to place hunting and gathering before domesticating wheat, barley, sheep, and goats in sites like Mehrgarh.", keywords: ["hunter-gatherers", "farming", "mehrgarh"], misconception: "Settled farming communities developed gradually over thousands of years.", question: { prompt: "Which of these were among the earliest crops grown by humans in Mehrgarh?", answer: "Wheat and barley", options: ["Wheat and barley", "Coffee and tea", "Potatoes and tomatoes"], explanation: "Wheat and barley were among the earliest domesticated crops.", intent: "Recall" } },
  { id: "indus-cities", title: "In the Earliest Cities (Harappa)", explanation: "Harappa and Mohenjo-daro featured a raised western Citadel, a lower town, baked brick houses, covered street drains, and the Great Bath.", keywords: ["harappa", "drains", "citadel", "great bath"], misconception: "Harappan cities were famous for grid-pattern streets and covered brick drainage.", question: { prompt: "What feature made Harappan street planning famous?", answer: "Covered brick drains", options: ["Covered brick drains", "Glass skyscrapers", "Iron railways"], explanation: "Harappan cities had carefully laid-out streets with covered brick drains and inspection holes.", intent: "Recognition" } },
  { id: "ashoka-maurya", title: "Ashoka, The Emperor Who Gave Up War", explanation: "Horrified by the bloodshed of the Kalinga War, Mauryan Emperor Ashoka embraced Dhamma and inscribed peace messages in Prakrit on stone pillars.", keywords: ["ashoka", "kalinga", "dhamma", "pillars"], misconception: "Ashoka's Dhamma did not involve worship of a god or sacrifices, but ethical conduct and compassion.", question: { prompt: "After which war did Emperor Ashoka decide to give up fighting?", answer: "The Kalinga War", options: ["The Kalinga War", "The Battle of Panipat", "The Battle of Plassey"], explanation: "The sorrow of the Kalinga War inspired Ashoka to renounce conquest and spread Dhamma.", intent: "Recall" } },
  { id: "maps-directions", title: "Maps, Globes & Cardinal Directions", explanation: "In NCERT 'The Earth: Our Habitat', maps use three essential components—distance (scale), direction (cardinal points), and conventional symbols.", keywords: ["map", "compass", "scale", "north"], misconception: "Physical maps show relief features like mountains, while political maps show state/country boundaries.", question: { prompt: "Which instrument uses a magnetic needle to show North on a street?", answer: "Compass", options: ["Compass", "Thermometer", "Barometer"], explanation: "A magnetic compass aligns with Earth's magnetic field to indicate North-South.", intent: "Application" } },
  { id: "panchayat-local", title: "Panchayati Raj & Gram Sabha", explanation: "In NCERT Civics, the Gram Sabha (all adults in a village) elects the Gram Panchayat (Ward Panchs and Sarpanch) to look after water, roads, and drainage.", keywords: ["panchayat", "gram sabha", "sarpanch", "local government"], misconception: "Every adult aged 18+ in the village is a member of the Gram Sabha, which holds the Gram Panchayat accountable.", question: { prompt: "Who looks after village street lights, clean water, and local roads?", answer: "Gram Panchayat", options: ["Gram Panchayat", "Foreign Embassy", "Space Agency"], explanation: "The Gram Panchayat is the elected local body responsible for village civic needs.", intent: "Recognition" } }
];

// ==========================================
// ICSE CLASS 6 CONCEPTS (CISCE SYLLABUS ALIGNED)
// ==========================================

const scienceConceptsClass6ICSE: Concept[] = [
  {
    id: "icse-cell-unit",
    title: "The Cell: Structural & Functional Unit",
    explanation: "In ICSE Biology, the cell is studied as the fundamental building block of life. Every cell has a cell membrane, cytoplasm, and nucleus; plant cells also possess a rigid cellulose cell wall.",
    keywords: ["cell wall", "cellulose", "nucleus", "cytoplasm", "protoplasm"],
    misconception: "The cell wall (made of cellulose) is present only in plant cells, whereas the selectively permeable cell membrane is present in both plant and animal cells.",
    question: {
      prompt: "Which rigid outer layer made of cellulose is found in plant cells but absent in animal cells?",
      answer: "Cell wall",
      options: ["Cell wall", "Cell membrane", "Cytoplasm", "Centrosome"],
      explanation: "Plant cells have a rigid non-living cell wall composed of cellulose outside the cell membrane that gives them a fixed shape.",
      intent: "Recognition"
    }
  },
  {
    id: "icse-plastids-organelles",
    title: "Plastids: Chloroplasts, Chromoplasts & Vacuoles",
    explanation: "Plant cells contain three types of plastids: chloroplasts (green chlorophyll for photosynthesis), chromoplasts (yellow/orange/red pigments in petals and fruits), and colourless leucoplasts (starch storage).",
    keywords: ["plastids", "chloroplast", "chromoplast", "leucoplast", "vacuole"],
    misconception: "Leucoplasts store starch and oils in roots/seeds and have no pigment, whereas chromoplasts give bright colours to flowers and ripe fruits.",
    question: {
      prompt: "Which colourless plastid stores starch, proteins, and oils in plant roots and underground stems?",
      answer: "Leucoplast",
      options: ["Leucoplast", "Chloroplast", "Chromoplast", "Ribosome"],
      explanation: "Leucoplasts are colourless plastids found in non-green storage organs like potato tubers and roots.",
      intent: "Recall"
    }
  },
  {
    id: "icse-leaf-modifications",
    title: "Simple vs. Compound Leaves & Phyllotaxy",
    explanation: "ICSE Botany classifies leaves by lamina incision (simple leaf with an undivided lamina vs. compound leaf divided into leaflets on a rachis) and phyllotaxy (alternate, opposite, or whorled arrangement on nodes).",
    keywords: ["phyllotaxy", "simple leaf", "compound leaf", "rachis", "tendril"],
    misconception: "An axillary bud is present in the axil of a whole leaf (simple or compound), but never in the axil of individual leaflets of a compound leaf.",
    question: {
      prompt: "What is the arrangement of leaves on a stem or branch (alternate, opposite, or whorled) called?",
      answer: "Phyllotaxy",
      options: ["Phyllotaxy", "Venation", "Transpiration", "Germination"],
      explanation: "Phyllotaxy is the specific pattern in which leaves are arranged at nodes along the stem so each leaf receives maximum sunlight.",
      intent: "Recognition"
    }
  },
  {
    id: "icse-flower-whorls",
    title: "Four Whorls of a Bisexual Flower",
    explanation: "A complete flower has four concentric whorls on the thalamus: Calyx (sepals), Corolla (petals), Androecium (male stamens with anther and filament), and Gynoecium/Pistil (female carpel with stigma, style, ovary).",
    keywords: ["calyx", "corolla", "androecium", "gynoecium", "thalamus"],
    misconception: "Androecium is the male reproductive whorl producing pollen in the anther; Gynoecium is the female whorl containing ovules inside the ovary.",
    question: {
      prompt: "In ICSE Botany, what is the collective name for the male reproductive whorl of stamens in a flower?",
      answer: "Androecium",
      options: ["Androecium", "Gynoecium", "Corolla", "Calyx"],
      explanation: "The Androecium is the third whorl of a flower, composed of stamens (each having a filament and a pollen-bearing anther).",
      intent: "Recall"
    }
  },
  {
    id: "icse-pollination-fertilisation",
    title: "Self vs. Cross Pollination & Fertilisation",
    explanation: "Pollination is the transfer of pollen from anther to stigma (autogamy/self-pollination vs. allogamy/cross-pollination via insects, wind, or water), followed by fertilisation (fusion of male and female gametes in the ovule).",
    keywords: ["pollination", "fertilisation", "ovule", "pericarp", "zygote"],
    misconception: "Pollination only brings pollen to the stigma; actual fertilisation happens later when the pollen tube reaches the ovule inside the ovary.",
    question: {
      prompt: "After fertilisation in a flower, what does the ripened ovary develop into?",
      answer: "Fruit",
      options: ["Fruit", "Seed coat", "Pollen grain", "Sepal"],
      explanation: "After fertilisation, the ovary enlarges into the fruit (pericarp), while the fertilized ovules develop into seeds.",
      intent: "Application"
    }
  },
  {
    id: "icse-seed-germination",
    title: "Monocot vs. Dicot Seeds & Epigeal/Hypogeal Germination",
    explanation: "Dicot seeds (bean, gram) have two cotyledons, while monocot seeds (maize) have one cotyledon (scutellum) and large endosperm. Germination is Epigeal when cotyledons are pushed above soil, and Hypogeal when they remain below.",
    keywords: ["monocot", "dicot", "cotyledon", "epigeal", "hypogeal", "radicle"],
    misconception: "During germination, the radicle always emerges first to form the root system, while the plumule grows upward to form the shoot.",
    question: {
      prompt: "In which type of seed germination do the cotyledons remain underground below the soil surface (as in maize and pea)?",
      answer: "Hypogeal germination",
      options: ["Hypogeal germination", "Epigeal germination", "Vegetative propagation", "Transpiration"],
      explanation: "In hypogeal germination, the epicotyl elongates faster and the cotyledons remain below the soil surface.",
      intent: "Comparison"
    }
  }
];

const mathsConceptsClass6ICSE: Concept[] = [
  {
    id: "icse-set-theory",
    title: "Set Theory: Roster Form, Empty Sets & Cardinality",
    explanation: "A set is a well-defined collection of distinct objects. Sets are written in Roster (tabular) form or Set-Builder form. The cardinal number n(A) is the number of distinct elements in a finite set A.",
    keywords: ["set", "roster", "cardinal number", "empty set", "null set"],
    misconception: "The set {0} is NOT an empty (null) set—it has cardinal number 1 because 0 is an element inside it.",
    question: {
      prompt: "What is the cardinal number n(A) of the set A = {x : x is a prime number less than 10}?",
      answer: "4",
      options: ["4", "5", "3", "9"],
      explanation: "The prime numbers less than 10 are {2, 3, 5, 7}. Since there are 4 distinct elements, n(A) = 4.",
      intent: "Application"
    }
  },
  {
    id: "icse-ratio-proportion",
    title: "Ratio, Proportion & Unitary Method",
    explanation: "A ratio a : b compares two quantities of the same kind in the same units. Four quantities a, b, c, d are in proportion (a : b :: c : d) when Product of Extremes (a × d) = Product of Means (b × c).",
    keywords: ["ratio", "proportion", "extremes", "means", "unitary"],
    misconception: "Quantities in a ratio must be expressed in the exact same unit before simplifying (e.g., convert metres to centimetres first).",
    question: {
      prompt: "If 4 : 6 :: x : 18 are in proportion, what is the value of x?",
      answer: "12",
      options: ["12", "9", "14", "8"],
      explanation: "Using Product of Means = Product of Extremes: 6 × x = 4 × 18 = 72, so x = 72 ÷ 6 = 12.",
      intent: "Application"
    }
  },
  {
    id: "icse-percentage-profit",
    title: "Percentages, Profit, Loss & Commercial Maths",
    explanation: "ICSE Commercial Arithmetic introduces Percentage conversions, Cost Price (CP), Selling Price (SP), Profit = SP − CP, and Profit % = (Profit / CP) × 100.",
    keywords: ["percentage", "cost price", "selling price", "profit", "loss"],
    misconception: "Profit% and Loss% are always calculated as a percentage of the Cost Price (CP), never the Selling Price (SP).",
    question: {
      prompt: "A book bought for ₹200 (CP) is sold for ₹250 (SP). What is the Profit Percentage?",
      answer: "25%",
      options: ["25%", "20%", "50%", "15%"],
      explanation: "Profit = ₹250 − ₹200 = ₹50. Profit % = (50 / 200) × 100 = 25%.",
      intent: "Application"
    }
  },
  {
    id: "icse-polynomials",
    title: "Algebraic Expressions: Polynomials, Degree & Like Terms",
    explanation: "Terms having the exact same literal factors (variables and exponents) are Like Terms. Expressions are classified as monomials (1 term), binomials (2 terms), and trinomials (3 terms), and ranked by their highest degree.",
    keywords: ["polynomial", "monomial", "binomial", "coefficient", "like terms", "degree"],
    misconception: "Only like terms (such as 5x²y and -2x²y) can be added or subtracted; unlike terms (5x²y and 5xy²) cannot be combined into a single term.",
    question: {
      prompt: "In the algebraic expression 4x³ − 7x² + 5x − 9, what is the degree of the polynomial?",
      answer: "3",
      options: ["3", "4", "2", "9"],
      explanation: "The degree of a polynomial in one variable is the highest power of the variable in the expression, which is 3 (from 4x³).",
      intent: "Recognition"
    }
  },
  {
    id: "icse-parallel-transversal",
    title: "Parallel Lines, Transversals & Angle Pairs",
    explanation: "When a transversal intersects two parallel lines, alternate interior angles are equal, corresponding angles are equal, and co-interior (allied) angles on the same side of the transversal add up to 180°.",
    keywords: ["transversal", "parallel", "alternate angles", "corresponding", "vertically opposite"],
    misconception: "Co-interior angles on the same side of a transversal are supplementary (sum to 180°), whereas alternate interior angles are equal.",
    question: {
      prompt: "When a transversal cuts two parallel lines and one corresponding angle is 65°, what is its matching corresponding angle?",
      answer: "65°",
      options: ["65°", "115°", "25°", "90°"],
      explanation: "Corresponding angles formed when a transversal intersects two parallel lines are always equal in measure (65°).",
      intent: "Concept"
    }
  },
  {
    id: "icse-circle-elements",
    title: "Polygons & Elements of a Circle (Chord, Sector, Segment)",
    explanation: "A chord is a line segment joining any two points on a circle; the diameter is the longest chord passing through the centre. A sector is bounded by two radii and an arc, while a segment is bounded by a chord and an arc.",
    keywords: ["chord", "diameter", "sector", "segment", "arc", "secant"],
    misconception: "A sector is enclosed by two radii and an arc (like a pizza slice), whereas a segment is enclosed by a chord and an arc.",
    question: {
      prompt: "What is the region of a circle bounded by two radii and the arc between them called?",
      answer: "Sector",
      options: ["Sector", "Segment", "Secant", "Chord"],
      explanation: "A sector is the pie-shaped region enclosed by two radii and their intercepted arc.",
      intent: "Recognition"
    }
  }
];

const englishConceptsClass6ICSE: Concept[] = [
  {
    id: "icse-active-passive",
    title: "Active and Passive Voice Transformation",
    explanation: "In Active Voice, the subject performs the action ('Maya wrote the letter'). In Passive Voice, the object becomes the grammatical subject receiving the action ('The letter was written by Maya').",
    keywords: ["active voice", "passive voice", "participle", "object", "transformation"],
    misconception: "When converting Active to Passive voice, the original tense must never change—only the verb form shifts to [be + past participle].",
    question: {
      prompt: "Choose the correct Passive Voice form of: 'The chef prepared a delicious meal.'",
      answer: "A delicious meal was prepared by the chef.",
      options: [
        "A delicious meal was prepared by the chef.",
        "A delicious meal is prepared by the chef.",
        "A delicious meal had been prepared by the chef.",
        "The chef was preparing a delicious meal."
      ],
      explanation: "Since 'prepared' is in the simple past tense, its passive form uses 'was + past participle' ('was prepared').",
      intent: "Application"
    }
  },
  {
    id: "icse-direct-indirect",
    title: "Direct and Indirect (Reported) Speech",
    explanation: "In ICSE Grammar transformation, converting Direct Speech to Indirect Speech after a past reporting verb ('said') shifts present tense to past, 'will' to 'would', 'today' to 'that day', and 'now' to 'then'.",
    keywords: ["direct speech", "indirect speech", "reported", "tense shift"],
    misconception: "Inverted commas are removed in Indirect Speech, and universal truths (e.g., 'The Earth revolves around the Sun') do not change tense.",
    question: {
      prompt: "Convert to Indirect Speech: Rohan said, 'I am revising my Biology chapter.'",
      answer: "Rohan said that he was revising his Biology chapter.",
      options: [
        "Rohan said that he was revising his Biology chapter.",
        "Rohan said that I am revising my Biology chapter.",
        "Rohan asked if he was revising his Biology chapter.",
        "Rohan says that he is revising his Biology chapter."
      ],
      explanation: "Present continuous ('am revising') shifts to past continuous ('was revising') and pronoun 'I' shifts to 'he'.",
      intent: "Application"
    }
  },
  {
    id: "icse-clauses-types",
    title: "Main Clauses, Subordinate Clauses & Phrase vs. Clause",
    explanation: "A phrase is a group of words without a finite verb ('in the morning'), while a clause contains a subject and a finite verb. A Main Clause stands alone; a Subordinate Clause depends on the main clause.",
    keywords: ["main clause", "subordinate clause", "finite verb", "phrase"],
    misconception: "Every clause must contain a finite verb; a group of words without a finite verb is a phrase, not a clause.",
    question: {
      prompt: "In 'We stayed indoors because it was raining heavily', what is 'because it was raining heavily'?",
      answer: "Subordinate clause",
      options: ["Subordinate clause", "Main clause", "Prepositional phrase", "Noun phrase"],
      explanation: "It has a subject ('it') and finite verb ('was raining') introduced by subordinating conjunction 'because', so it is a subordinate clause.",
      intent: "Recognition"
    }
  },
  {
    id: "icse-subject-concord",
    title: "Subject-Verb Concord (Agreement Rules)",
    explanation: "Under ICSE Subject-Verb Concord rules: subjects joined by 'as well as' or 'along with' take a verb agreeing with the first subject; 'Each', 'Every', 'Either', and 'Neither' take singular verbs.",
    keywords: ["concord", "agreement", "neither", "either", "singular verb"],
    misconception: "In 'The captain, along with the players, is present', the verb agrees with singular 'captain', not plural 'players'.",
    question: {
      prompt: "Choose the correct verb by Subject-Verb Concord: 'Neither of the two answers ___ correct.'",
      answer: "is",
      options: ["is", "are", "were", "have"],
      explanation: "Distributive pronouns like 'Neither' and 'Either' are singular in grammar and take a singular verb ('is').",
      intent: "Application"
    }
  },
  {
    id: "icse-figures-speech",
    title: "Figures of Speech: Simile, Metaphor, Personification & Alliteration",
    explanation: "ICSE Literature & Poetry emphasizes Figures of Speech: Simile (explicit comparison using 'like' or 'as'), Metaphor (implied comparison), Personification (giving human traits to non-living things), and Alliteration.",
    keywords: ["simile", "metaphor", "personification", "alliteration", "literary device"],
    misconception: "A simile uses 'like' or 'as' ('fought like a lion'), whereas a metaphor directly states one thing IS another ('he was a lion in battle').",
    question: {
      prompt: "Identify the Figure of Speech in: 'The wind whispered secrets through the swaying trees.'",
      answer: "Personification",
      options: ["Personification", "Simile", "Oxymoron", "Pun"],
      explanation: "Giving the human action of 'whispering secrets' to the non-living wind is Personification.",
      intent: "Recognition"
    }
  },
  {
    id: "icse-idioms-phrasal",
    title: "Idioms, Proverbs & Phrasal Verbs in Context",
    explanation: "Phrasal verbs combine a root verb with a preposition or adverb to create a new meaning (e.g., 'call off' = cancel, 'look into' = investigate, 'give up' = stop trying).",
    keywords: ["idiom", "phrasal verb", "call off", "look into", "vocabulary"],
    misconception: "The meaning of an idiom or phrasal verb is figurative and cannot be guessed merely by taking each word literally.",
    question: {
      prompt: "What does the phrasal verb 'call off' mean in 'The umpire had to call off the match due to rain'?",
      answer: "Cancel",
      options: ["Cancel", "Shout loudly", "Telephone someone", "Begin early"],
      explanation: "The phrasal verb 'call off' means to cancel a planned event.",
      intent: "Reasoning"
    }
  }
];

const socialConceptsClass6ICSE: Concept[] = [
  {
    id: "icse-mesopotamia-egypt",
    title: "Mesopotamian & Egyptian River Valley Civilisations",
    explanation: "ICSE History begins with comparative world bronze-age civilisations: Mesopotamia (between Tigris and Euphrates, stepped Ziggurats, Cuneiform script, Hammurabi's Code) and Egypt ('Gift of the Nile', Pyramids, Hieroglyphics).",
    keywords: ["mesopotamia", "ziggurat", "cuneiform", "hammurabi", "egypt", "nile"],
    misconception: "Cuneiform (wedge-shaped script on clay tablets) belonged to Mesopotamia, while Hieroglyphics (sacred picture writing on papyrus) belonged to Egypt.",
    question: {
      prompt: "What were the stepped temple-towers built in ancient Mesopotamian cities called?",
      answer: "Ziggurats",
      options: ["Ziggurats", "Pyramids", "Stupas", "Citadels"],
      explanation: "Ziggurats were monumental stepped brick temple-towers dedicated to patron deities in Mesopotamian cities like Ur.",
      intent: "Recognition"
    }
  },
  {
    id: "icse-indus-lothal",
    title: "Indus Valley Civilisation: Lothal Dockyard, Seals & Trade",
    explanation: "The Harappan civilisation featured grid-planned cities, the Great Bath at Mohenjo-daro, the Great Granary, steatite seals (Pashupati seal), and the world's earliest tidal brick dockyard at Lothal in Gujarat.",
    keywords: ["lothal", "dockyard", "pashupati seal", "mohenjo-daro", "granary"],
    misconception: "Lothal in Gujarat was famous for its brick tidal dockyard connecting Harappan maritime trade with Mesopotamia.",
    question: {
      prompt: "At which Indus Valley site did archaeologists discover an ancient brick tidal dockyard for overseas trade?",
      answer: "Lothal",
      options: ["Lothal", "Kalibangan", "Ropar", "Banawali"],
      explanation: "Lothal in Gujarat had a massive brick basin connected to the Gulf of Khambhat that served as a tidal dockyard.",
      intent: "Recall"
    }
  },
  {
    id: "icse-vedic-age",
    title: "Early & Later Vedic Period: Vedas, Sabha & Samiti",
    explanation: "ICSE contrasts the Early Vedic (Rigvedic) pastoral society—where women held high status and popular assemblies Sabha and Samiti advised the Rajan—with the Later Vedic agrarian age and the four Vedas.",
    keywords: ["rigveda", "sabha", "samiti", "vedic", "gurukul", "upanishads"],
    misconception: "The Rigveda is the oldest of the four Vedas, composed during the Early Vedic period in the Sapta Sindhu region.",
    question: {
      prompt: "Which two popular assemblies advised and checked the power of the king (Rajan) during the Early Vedic period?",
      answer: "Sabha and Samiti",
      options: ["Sabha and Samiti", "Gram Panchayat and Zila Parishad", "Sangha and Vihara", "Senate and Parliament"],
      explanation: "The Sabha (council of elders) and Samiti (general assembly of the people) participated in governance during the Rigvedic age.",
      intent: "Recall"
    }
  },
  {
    id: "icse-jainism-buddhism",
    title: "Rise of Jainism & Buddhism: Mahavira & Gautama Buddha",
    explanation: "In the 6th century BCE, Vardhamana Mahavira (24th Tirthankara) preached the Triratnas (Right Faith, Right Knowledge, Right Conduct) and Ahimsa, while Gautama Buddha taught the Four Noble Truths and the Eightfold Path.",
    keywords: ["mahavira", "tirthankara", "triratna", "buddha", "eightfold path", "sarnath"],
    misconception: "Gautama Buddha delivered his first sermon (Dharmachakrapravartana) at the Deer Park in Sarnath, after attaining enlightenment at Bodh Gaya.",
    question: {
      prompt: "Where did Gautama Buddha deliver his first sermon after attaining enlightenment?",
      answer: "Sarnath",
      options: ["Sarnath", "Lumbini", "Kushinagar", "Pataliputra"],
      explanation: "Buddha delivered his first sermon at the Deer Park in Sarnath near Varanasi, setting in motion the Wheel of Law.",
      intent: "Recall"
    }
  },
  {
    id: "icse-gupta-golden",
    title: "The Gupta Empire: Golden Age of Science, Art & Literature",
    explanation: "Under Samudragupta and Chandragupta II (Vikramaditya), the Gupta Age saw Aryabhata's discoveries in astronomy and mathematics, Kalidasa's Sanskrit classics, Nalanda University, and the rust-free Mehrauli Iron Pillar.",
    keywords: ["gupta", "aryabhata", "kalidasa", "iron pillar", "nalanda", "vikramaditya"],
    misconception: "Aryabhata explained that the Earth rotates on its axis and causes day and night, and scientifically explained solar and lunar eclipses.",
    question: {
      prompt: "Which renowned astronomer-mathematician of the Gupta period wrote the 'Aryabhatiya' and explained the cause of eclipses?",
      answer: "Aryabhata",
      options: ["Aryabhata", "Kalidasa", "Chanakya", "Megasthenes"],
      explanation: "Aryabhata was the great mathematician and astronomer of the Gupta era who calculated pi (π) and explained eclipses scientifically.",
      intent: "Recognition"
    }
  },
  {
    id: "icse-civics-urban-rural",
    title: "Rural & Urban Local Self-Government (Three-Tier & Municipal)",
    explanation: "ICSE Civics covers the three-tier Panchayati Raj system (Gram Panchayat at village level, Panchayat Samiti at block level, Zila Parishad at district level) and Urban bodies (Municipal Corporation / Nagar Nigam headed by a Mayor).",
    keywords: ["zila parishad", "panchayat samiti", "municipal corporation", "mayor"],
    misconception: "A Municipal Corporation (Nagar Nigam) governs large metropolitan cities, whereas a Municipality (Nagar Palika) governs smaller towns.",
    question: {
      prompt: "Which is the highest district-level tier of the three-tier Panchayati Raj system in rural India?",
      answer: "Zila Parishad",
      options: ["Zila Parishad", "Gram Panchayat", "Nyaya Panchayat", "Municipal Corporation"],
      explanation: "The Zila Parishad stands at the apex (district level) of the three-tier rural Panchayati Raj system, above the Panchayat Samiti and Gram Panchayat.",
      intent: "Recognition"
    }
  }
];

// ==========================================
// CBSE CLASS 5 CONCEPTS (NCERT ALIGNED)
// ==========================================

const scienceConceptsClass5CBSE: Concept[] = [
  { id: "seeds-sprouts", title: "Seeds and Sprouting", explanation: "Seeds need air, water, and appropriate warmth to germinate and sprout into baby plants.", keywords: ["seed", "sprout", "germination", "water"], misconception: "Seeds need moisture and air to sprout, not just sitting in dry soil.", question: { prompt: "What do seeds need to sprout into a healthy young plant?", answer: "Water, air and warmth", options: ["Water, air and warmth", "Only darkness", "Ice cold water only"], explanation: "Seeds require moisture, fresh air and suitable warmth to sprout.", intent: "Recognition" } },
  { id: "seed-dispersal", title: "How Seeds Travel", explanation: "Seeds travel by wind, water, animals, and bursting pods so they can grow in new places with plenty of sunlight.", keywords: ["dispersal", "wind", "animals", "travel"], misconception: "Seeds travel through multiple natural agents, not only human planting.", question: { prompt: "Dandelion seeds with silky parachutes are dispersed mainly by...", answer: "Wind", options: ["Wind", "Water currents", "Insects only"], explanation: "Light, hairy seeds are carried gently across the breeze by wind.", intent: "Application" } },
  { id: "leaves-sunlight", title: "Leaves & Sunlight", explanation: "Green leaves catch sunlight to prepare nourishing food for the plant using chlorophyll.", keywords: ["sunlight", "chlorophyll", "green leaves"], misconception: "Green leaves are the plant's food factories, absorbing sun rays.", question: { prompt: "What green substance inside leaves captures light from the sun?", answer: "Chlorophyll", options: ["Chlorophyll", "Soil dust", "Flower nectar"], explanation: "Chlorophyll gives leaves their green color and traps sunlight to make food.", intent: "Recall" } },
  { id: "aquatic-plants", title: "Water Plants", explanation: "Plants that live in ponds and rivers have spongy floating leaves and flexible stems so water flows past easily.", keywords: ["aquatic", "floating", "lotus"], misconception: "Water plants are adapted to float or bend without snapping.", question: { prompt: "Which plant has large, flat leaves that float on pond water?", answer: "Lotus", options: ["Lotus", "Cactus", "Pine tree"], explanation: "Lotus leaves have waxy surfaces and float on top of calm ponds.", intent: "Recognition" } },
  { id: "desert-plants", title: "Desert Adaptations", explanation: "Desert plants like cacti store water inside fleshy stems and turn leaves into sharp spines to save moisture.", keywords: ["cactus", "spines", "desert", "water storage"], misconception: "Cactus spines are modified leaves that prevent water loss.", question: { prompt: "Why does a cactus have sharp spines instead of wide leaves?", answer: "To prevent water loss", options: ["To prevent water loss", "To catch rain", "To attract bees"], explanation: "Spines reduce transpiration so the cactus conserves water in dry deserts.", intent: "Reasoning" } },
  { id: "pollination-friends", title: "Flower Friends & Pollen", explanation: "Bees, butterflies, and birds visit colorful sweet flowers for nectar and carry golden pollen from flower to flower.", keywords: ["pollination", "nectar", "honeybee", "butterfly"], misconception: "Insects visit flowers for nectar and help pollination happen.", question: { prompt: "What sugary liquid attracts butterflies and bees to blossoms?", answer: "Nectar", options: ["Nectar", "Sap", "Pollen grains"], explanation: "Flowers produce sweet nectar that invites helpful insect visitors.", intent: "Recall" } }
];

const mathsConceptsClass5CBSE: Concept[] = [
  { id: "large-numbers", title: "Large Numbers & Lakhs", explanation: "Numbers beyond ten thousand are grouped into Lakhs and Ten Lakhs in the Indian place value system.", keywords: ["lakh", "place value", "thousands"], misconception: "One lakh contains 100 thousands (1,00,000).", question: { prompt: "How many zeros are there in the number One Lakh (1,00,000)?", answer: "5", options: ["5", "4", "6"], explanation: "One Lakh is written as 1,00,000 and has 5 zeros.", intent: "Recall" } },
  { id: "shapes-angles", title: "Shapes and Right Angles", explanation: "Corners of books, tables, and doors form 'L'-shaped right angles measuring 90 degrees.", keywords: ["right angle", "L shape", "corner"], misconception: "An L-shape is a right angle, whether turned sideways or upside down.", question: { prompt: "What shape do the hands of a clock make at 3 o'clock?", answer: "Right angle", options: ["Right angle", "Straight line", "Acute angle"], explanation: "At 3:00, the minute hand and hour hand form an exact 90° right angle.", intent: "Recognition" } },
  { id: "equal-parts-half", title: "Halves and Quarters", explanation: "When a whole object is divided into 2 equal parts, each is one-half (1/2); 4 equal parts make quarters (1/4).", keywords: ["half", "quarter", "fraction", "equal parts"], misconception: "Parts must be strictly equal to be called halves or quarters.", question: { prompt: "If an apple is cut into 4 equal slices, what fraction is 1 slice?", answer: "1/4", options: ["1/4", "1/2", "3/4"], explanation: "One part out of 4 equal parts is written as one-quarter (1/4).", intent: "Concept" } },
  { id: "patterns-symmetry", title: "Patterns & Symmetry", explanation: "A shape has line symmetry if folding along the line makes both halves match up perfectly.", keywords: ["symmetry", "mirror line", "matching halves"], misconception: "Symmetrical figures match identically on both sides of the mirror line.", question: { prompt: "Which English letter has a vertical line of symmetry?", answer: "M", options: ["M", "F", "L"], explanation: "Letter M can be folded down the center into two matching mirror halves.", intent: "Recognition" } },
  { id: "factors-multiples", title: "Factors and Multiples", explanation: "Multiples are numbers you get when multiplying a number by 1, 2, 3... Factors divide a number evenly.", keywords: ["factors", "multiples", "tables"], misconception: "Multiples of 5 always end in 0 or 5.", question: { prompt: "Which of the following is a multiple of 6?", answer: "24", options: ["24", "15", "20"], explanation: "6 × 4 = 24, so 24 is a multiple of 6.", intent: "Application" } },
  { id: "perimeter-boundary", title: "Measuring Boundaries", explanation: "The perimeter is found by adding up the lengths of all outer boundary sides of a shape.", keywords: ["boundary", "perimeter", "sum of sides"], misconception: "Add all sides around the outside to find the perimeter.", question: { prompt: "What is the boundary perimeter of a square with sides 5 cm each?", answer: "20 cm", options: ["20 cm", "25 cm", "10 cm"], explanation: "A square has 4 equal sides: 5 + 5 + 5 + 5 = 20 cm.", intent: "Application" } }
];

const englishConceptsClass5CBSE: Concept[] = [
  { id: "naming-words", title: "Proper and Common Nouns", explanation: "Common nouns name general things (city, boy), while proper nouns name specific people and places and begin with capitals (Delhi, Maya).", keywords: ["noun", "proper noun", "capital letter"], misconception: "Proper nouns always begin with a capital letter.", question: { prompt: "Which word in 'We visited Mumbai last Sunday' is a proper noun?", answer: "Mumbai", options: ["Mumbai", "visited", "last"], explanation: "Mumbai is the specific name of a city, so it is a proper noun.", intent: "Recognition" } },
  { id: "action-words", title: "Action Verbs", explanation: "Verbs describe actions like jumping, reading, running, thinking, or sleeping.", keywords: ["action", "verb", "doing word"], misconception: "Verbs tell what someone or something is doing.", question: { prompt: "Find the action verb: 'The happy dolphins jumped over the waves.'", answer: "jumped", options: ["jumped", "happy", "dolphins"], explanation: "'Jumped' is the physical action being performed by the dolphins.", intent: "Recognition" } },
  { id: "describing-words", title: "Adjectives (Describing)", explanation: "Adjectives tell us about color, size, texture, number, and mood of nouns.", keywords: ["adjective", "color", "size", "texture"], misconception: "Adjectives describe the noun that follows or relates to them.", question: { prompt: "Which word is an adjective: 'The tiny kitten drank cold milk'?", answer: "tiny", options: ["tiny", "drank", "milk"], explanation: "'Tiny' describes the size of the kitten, making it an adjective.", intent: "Recognition" } },
  { id: "rhyming-poetry", title: "Rhyming Words & Rhythm", explanation: "Rhyming words share the same ending sound (such as bright / night, ring / sing).", keywords: ["rhyme", "sound", "poetry"], misconception: "Rhyming depends on sound, not always on spelling.", question: { prompt: "Which word rhymes with 'bright'?", answer: "Night", options: ["Night", "Bread", "Breeze"], explanation: "'Bright' and 'Night' end with the identical sound /aɪt/.", intent: "Recall" } },
  { id: "pronouns-he-she", title: "Pronouns (He, She, It, They)", explanation: "Pronouns take the place of nouns so we don't repeat the same names over and over.", keywords: ["pronoun", "replacement", "he", "she", "they"], misconception: "Use 'they' for more than one person, and 'it' for objects or animals.", question: { prompt: "Which pronoun replaces 'Rohan and Priya'?", answer: "They", options: ["They", "He", "She"], explanation: "'They' is the plural pronoun that refers to two or more people.", intent: "Application" } },
  { id: "connecting-words", title: "Joining Words (And, But, Or)", explanation: "Use 'and' to add ideas, 'but' to show differences, and 'or' to present a choice.", keywords: ["conjunction", "and", "but", "or"], misconception: "'But' introduces a contrast or surprise.", question: { prompt: "Complete the sentence: 'He wanted to play football, ___ it was raining.'", answer: "but", options: ["but", "and", "or"], explanation: "'But' connects the contrasting ideas of wanting to play vs bad weather.", intent: "Application" } }
];

// ==========================================
// ICSE CLASS 5 CONCEPTS (CISCE SYLLABUS ALIGNED)
// ==========================================

const scienceConceptsClass5ICSE: Concept[] = [
  { id: "icse5-circulatory", title: "Human Circulatory System (Heart, Arteries & Veins)", explanation: "In ICSE Class 5 Science, the circulatory system consists of the heart, blood, and blood vessels. Arteries carry oxygen-rich blood away from the heart, while veins carry carbon-dioxide-rich blood back to the heart.", keywords: ["heart", "arteries", "veins", "capillaries", "aorta"], misconception: "Arteries carry blood away from the heart under high pressure, whereas veins have valves and carry blood back toward the heart.", question: { prompt: "Which blood vessels carry oxygenated blood away from the heart to all parts of the body?", answer: "Arteries", options: ["Arteries", "Veins", "Nerves", "Bronchi"], explanation: "Arteries have thick elastic walls and carry oxygenated blood away from the heart.", intent: "Recognition" } },
  { id: "icse5-skeletal", title: "Skeletal System & Movable Joints", explanation: "The human skeleton (206 bones) protects organs and enables movement through joints: Ball-and-Socket (shoulder/hip), Hinge (elbow/knee), Pivot (neck), and Gliding (wrist/ankle).", keywords: ["skeleton", "ball and socket", "hinge joint", "pivot joint", "ligament"], misconception: "Hinge joints (like the knee and elbow) allow movement in one plane only, whereas ball-and-socket joints allow rotation in all directions.", question: { prompt: "Which type of movable joint is found at the shoulder and hip, allowing movement in all directions?", answer: "Ball and socket joint", options: ["Ball and socket joint", "Hinge joint", "Pivot joint", "Fixed suture joint"], explanation: "The ball-shaped end of one bone fits into the cup-like socket of another in the shoulder and hip.", intent: "Application" } },
  { id: "icse5-floral-whorls", title: "Pollination: Calyx, Corolla, Stamens & Carpel", explanation: "ICSE Class 5 introduces the four floral whorls and how self-pollination and cross-pollination occur through insects, wind, and water.", keywords: ["calyx", "corolla", "stamen", "carpel", "pollen"], misconception: "Pollen grains are produced inside the anther of the stamen and land on the sticky stigma of the carpel.", question: { prompt: "Which sticky part of the female carpel receives pollen grains during pollination?", answer: "Stigma", options: ["Stigma", "Sepal", "Filament", "Petal"], explanation: "The stigma is the sticky tip of the carpel/pistil adapted to catch pollen grains.", intent: "Recall" } },
  { id: "icse5-vegetative", title: "Vegetative Propagation by Roots, Stems & Leaves", explanation: "Many plants reproduce without seeds through vegetative propagation: potato by underground stem tubers (eyes), ginger by rhizome, sweet potato by roots, and Bryophyllum by leaf buds.", keywords: ["vegetative propagation", "bryophyllum", "tuber", "rhizome"], misconception: "A potato is a modified underground stem (tuber) with buds called 'eyes', not a root.", question: { prompt: "Which plant grows new plantlets along the notches of its fleshy leaf margins?", answer: "Bryophyllum", options: ["Bryophyllum", "Marigold", "Wheat", "Mustard"], explanation: "Bryophyllum leaves have adventitious buds along their margins that sprout into new plants.", intent: "Recognition" } },
  { id: "icse5-food-chain", title: "Interdependence: Producers, Consumers & Decomposers", explanation: "Green plants are autotrophic Producers; herbivores, carnivores, and omnivores are Consumers; fungi and bacteria are Decomposers that return nutrients to the soil.", keywords: ["producer", "consumer", "decomposer", "food chain", "ecosystem"], misconception: "Every food chain begins with green plants (producers) trapping solar energy.", question: { prompt: "What role do fungi and bacteria play at the end of a food chain?", answer: "Decomposers", options: ["Decomposers", "Primary producers", "Herbivores", "Apex predators"], explanation: "Decomposers break down dead organic matter and recycle minerals back into the soil.", intent: "Recognition" } },
  { id: "icse5-deficiency", title: "Balanced Diet & Deficiency Diseases", explanation: "Lack of specific vitamins or minerals causes deficiency diseases: Vitamin C (Scurvy), Vitamin D (Rickets), Vitamin A (Night blindness), Iron (Anaemia), and Iodine (Goitre).", keywords: ["scurvy", "rickets", "goitre", "anaemia", "vitamins"], misconception: "Deficiency diseases are non-communicable and cannot spread from one person to another by contact.", question: { prompt: "Deficiency of which mineral in the diet causes Goitre (swelling of the thyroid gland)?", answer: "Iodine", options: ["Iodine", "Iron", "Calcium", "Vitamin C"], explanation: "Iodine is required by the thyroid gland; its deficiency leads to Goitre.", intent: "Recall" } }
];

const mathsConceptsClass5ICSE: Concept[] = [
  { id: "icse5-hcf-lcm", title: "HCF & LCM by Prime Factorisation", explanation: "The Highest Common Factor (HCF) is the greatest number that divides two numbers exactly; the Lowest Common Multiple (LCM) is the smallest positive number divisible by both.", keywords: ["HCF", "LCM", "prime factorisation", "divisibility"], misconception: "For any two numbers, Product of the two numbers = HCF × LCM.", question: { prompt: "What is the LCM (Lowest Common Multiple) of 12 and 18?", answer: "36", options: ["36", "6", "72", "24"], explanation: "Multiples of 12 are 12, 24, 36... and multiples of 18 are 18, 36... The lowest common multiple is 36.", intent: "Application" } },
  { id: "icse5-unitary-speed", title: "Unitary Method & Speed, Distance, Time", explanation: "In the Unitary Method, we find the value of 1 unit first before finding the value of multiple units. Speed = Distance ÷ Time.", keywords: ["unitary method", "speed", "distance", "time"], misconception: "To find the value of 1 unit from many, divide; to find the value of many units from 1, multiply.", question: { prompt: "If a train travels 180 km in 3 hours, what is its average speed?", answer: "60 km/hr", options: ["60 km/hr", "90 km/hr", "45 km/hr", "540 km/hr"], explanation: "Speed = Distance ÷ Time = 180 km ÷ 3 hr = 60 km/hr.", intent: "Application" } },
  { id: "icse5-percentages", title: "Percentages: Fractions & Decimals to %", explanation: "Percent means 'per hundred' (out of 100). To convert a fraction or decimal into a percentage, multiply by 100 and attach the % sign.", keywords: ["percent", "hundredths", "fraction", "conversion"], misconception: "3/4 as a percentage is (3/4) × 100% = 75%, not 34%.", question: { prompt: "What is the fraction 3/5 expressed as a percentage?", answer: "60%", options: ["60%", "35%", "75%", "40%"], explanation: "(3 ÷ 5) × 100% = 3 × 20% = 60%.", intent: "Application" } },
  { id: "icse5-bodmas", title: "BODMAS & Operations on Vulgar Fractions", explanation: "ICSE arithmetic follows BODMAS (Brackets, Of, Division, Multiplication, Addition, Subtraction) when simplifying multi-step numerical and fraction expressions.", keywords: ["BODMAS", "brackets", "fractions", "simplification"], misconception: "Division and Multiplication are performed before Addition and Subtraction in BODMAS.", question: { prompt: "Simplify using BODMAS: 18 − 12 ÷ 3 × 2", answer: "10", options: ["10", "4", "14", "12"], explanation: "First divide: 12 ÷ 3 = 4. Next multiply: 4 × 2 = 8. Finally subtract: 18 − 8 = 10.", intent: "Application" } },
  { id: "icse5-triangles", title: "Classification of Triangles by Sides & Angles", explanation: "Triangles are classified by sides (Equilateral: all 3 equal; Isosceles: 2 equal; Scalene: none equal) and by angles (Acute, Right-angled, Obtuse-angled). The sum of angles in any triangle is 180°.", keywords: ["equilateral", "isosceles", "scalene", "180 degrees"], misconception: "The three interior angles of any triangle always add up to exactly 180°.", question: { prompt: "If two angles of a triangle are 60° and 70°, what is the third angle?", answer: "50°", options: ["50°", "60°", "40°", "80°"], explanation: "Since the sum of angles in a triangle is 180°, the third angle = 180° − (60° + 70°) = 50°.", intent: "Application" } },
  { id: "icse5-volume", title: "Volume of Cubes and Cuboids", explanation: "Volume is the three-dimensional space occupied by a solid object, measured in cubic units (cm³ or m³). Volume of a cuboid = Length × Breadth × Height.", keywords: ["volume", "cuboid", "cube", "cubic cm"], misconception: "Area is 2D (L × B in cm²), whereas Volume is 3D (L × B × H in cm³).", question: { prompt: "What is the volume of a cuboid box of length 5 cm, breadth 4 cm, and height 3 cm?", answer: "60 cm³", options: ["60 cm³", "12 cm³", "20 cm³", "47 cm³"], explanation: "Volume = Length × Breadth × Height = 5 × 4 × 3 = 60 cm³.", intent: "Application" } }
];

const englishConceptsClass5ICSE: Concept[] = [
  { id: "icse5-nouns-kinds", title: "Abstract, Collective & Material Nouns", explanation: "ICSE Class 5 classifies nouns into five kinds: Proper, Common, Collective (a fleet of ships, a pride of lions), Material (gold, cotton), and Abstract (wisdom, bravery, childhood).", keywords: ["abstract noun", "collective noun", "material noun"], misconception: "Abstract nouns name qualities, feelings, or states that cannot be touched physically (like honesty or courage).", question: { prompt: "Which word in 'The soldiers were rewarded for their bravery' is an Abstract Noun?", answer: "bravery", options: ["bravery", "soldiers", "rewarded", "their"], explanation: "'Bravery' is a quality or state of mind rather than a physical object, making it an abstract noun.", intent: "Recognition" } },
  { id: "icse5-degrees", title: "Degrees of Comparison (Positive, Comparative, Superlative)", explanation: "Adjectives change form to compare: Positive (tall), Comparative for two (taller + than), and Superlative for three or more (the tallest).", keywords: ["positive", "comparative", "superlative", "degrees"], misconception: "Never use double comparatives like 'more更好/more taller'; use either '-er' or 'more'.", question: { prompt: "What is the Superlative degree of the irregular adjective 'good'?", answer: "best", options: ["best", "better", "goodest", "most good"], explanation: "'Good' is an irregular adjective with comparative 'better' and superlative 'best'.", intent: "Recall" } },
  { id: "icse5-transitive", title: "Transitive and Intransitive Verbs", explanation: "A Transitive Verb requires a direct object to complete its meaning ('She kicked the ball'), while an Intransitive Verb makes complete sense without an object ('The baby smiled').", keywords: ["transitive", "intransitive", "direct object", "verb"], misconception: "Ask 'what?' or 'whom?' after the verb—if there is an answer in the sentence, the verb is transitive.", question: { prompt: "In 'Meera wrote a poem', is the verb 'wrote' transitive or intransitive?", answer: "Transitive (object: a poem)", options: ["Transitive (object: a poem)", "Intransitive", "Auxiliary only", "Prepositional"], explanation: "'Wrote' passes its action to the direct object 'a poem', so it is a transitive verb.", intent: "Recognition" } },
  { id: "icse5-adverbs", title: "Adverbs of Manner, Frequency, Time & Place", explanation: "Adverbs modify verbs, adjectives, or other adverbs, telling how (gracefully), when (yesterday), where (everywhere), or how often (always, seldom).", keywords: ["adverb", "manner", "frequency", "modify"], misconception: "Adjectives modify nouns ('a quick runner'), while adverbs modify verbs ('ran quickly').", question: { prompt: "Identify the Adverb of Frequency in: 'Barking dogs seldom bite.'", answer: "seldom", options: ["seldom", "barking", "dogs", "bite"], explanation: "'Seldom' tells how often the action occurs, so it is an adverb of frequency.", intent: "Recognition" } },
  { id: "icse5-correlative", title: "Correlative & Subordinating Conjunctions", explanation: "Correlative conjunctions work in pairs to join balanced sentence elements: 'either...or', 'neither...nor', 'not only...but also', and 'both...and'.", keywords: ["either", "neither", "not only", "conjunction"], misconception: "'Neither' is always paired with 'nor', and 'Either' is always paired with 'or'.", question: { prompt: "Complete the pair: 'Neither the teacher ___ the students were late.'", answer: "nor", options: ["nor", "or", "but", "and"], explanation: "The correlative conjunction 'Neither' is always paired with 'nor'.", intent: "Application" } },
  { id: "icse5-affixes", title: "Prefixes, Suffixes, Synonyms & Antonyms", explanation: "A prefix is added to the beginning of a root word to change its meaning (un-, dis-, im-, mis-), while a suffix is added to the end (-ness, -ful, -less, -tion).", keywords: ["prefix", "suffix", "antonym", "synonym"], misconception: "Before root words starting with 'p' or 'm', the prefix 'in-' usually becomes 'im-' (impossible, impatient).", question: { prompt: "Which prefix is added to the word 'polite' to form its antonym?", answer: "im- (impolite)", options: ["im- (impolite)", "un- (unpolite)", "dis- (dispolite)", "mis- (mispolite)"], explanation: "Adding the prefix 'im-' to 'polite' forms its opposite, 'impolite'.", intent: "Application" } }
];

const socialConceptsClass5ICSE: Concept[] = [
  { id: "icse5-constitution", title: "The Indian Constitution: Fundamental Rights & Duties", explanation: "Adopted on 26 November 1949 and enforced on 26 January 1950, the Indian Constitution guarantees Fundamental Rights (Equality, Freedom, Education) and Fundamental Duties to all citizens.", keywords: ["constitution", "preamble", "fundamental rights", "republic"], misconception: "26 January is celebrated as Republic Day because the Constitution came into force on that day in 1950.", question: { prompt: "Who was the Chairman of the Drafting Committee of the Indian Constitution?", answer: "Dr. B. R. Ambedkar", options: ["Dr. B. R. Ambedkar", "Lord Mountbatten", "Vasco da Gama", "Emperor Ashoka"], explanation: "Dr. B. R. Ambedkar chaired the Drafting Committee of the Constituent Assembly.", intent: "Recall" } },
  { id: "icse5-lat-long", title: "Latitudes, Longitudes & The Prime Meridian", explanation: "Parallels of Latitude run East-West (0° Equator divides Northern and Southern Hemispheres), while Meridians of Longitude run North-South from pole to pole (0° Prime Meridian at Greenwich) to determine time zones.", keywords: ["equator", "prime meridian", "latitude", "longitude", "IST"], misconception: "Latitudes are parallel circles of unequal size, whereas all longitudes are semicircles of equal length meeting at the poles.", question: { prompt: "Which 0° line of latitude divides the Earth into the Northern and Southern Hemispheres?", answer: "The Equator", options: ["The Equator", "The Prime Meridian", "Tropic of Cancer", "Arctic Circle"], explanation: "The Equator (0° latitude) is the longest parallel and divides Earth into two equal hemispheres.", intent: "Recognition" } },
  { id: "icse5-heat-zones", title: "Three Heat Zones of the Earth", explanation: "Based on the slant of sunrays, the Earth is divided into the hot Torrid Zone (between Tropics), the moderate Temperate Zones, and the freezing Frigid Zones near the Poles.", keywords: ["torrid zone", "temperate", "frigid", "tropic of cancer"], misconception: "The Torrid Zone receives vertical rays of the Sun and is the hottest zone on Earth.", question: { prompt: "Which heat zone lies between the Tropic of Cancer and the Tropic of Capricorn?", answer: "Torrid Zone", options: ["Torrid Zone", "Frigid Zone", "North Temperate Zone", "Polar Zone"], explanation: "The Torrid Zone straddles the Equator between the two Tropics and receives direct overhead sunlight.", intent: "Recognition" } },
  { id: "icse5-stone-iron", title: "Evolution of Early Humans: Stone Age to Iron Age", explanation: "Human toolmaking progressed from Palaeolithic (crude chipped stone tools, discovery of fire) to Mesolithic, Neolithic (polished tools, wheel, agriculture), Chalcolithic (copper-stone), and Iron Age.", keywords: ["palaeolithic", "neolithic", "chalcolithic", "wheel"], misconception: "The invention of the wheel and settled agriculture occurred in the Neolithic (New Stone) Age.", question: { prompt: "In which period did early humans invent the wheel and begin settled farming?", answer: "Neolithic Age (New Stone Age)", options: ["Neolithic Age (New Stone Age)", "Palaeolithic Age", "Jurassic Period", "Modern Age"], explanation: "The Neolithic Revolution marked the shift to polished tools, pottery, the wheel, and agriculture.", intent: "Recall" } },
  { id: "icse5-democracy-pillars", title: "Three Organs of Government: Legislature, Executive, Judiciary", explanation: "India's parliamentary democracy separates power among the Legislature (Parliament makes laws), the Executive (implements laws), and the Judiciary (Supreme Court & High Courts interpret laws).", keywords: ["legislature", "executive", "judiciary", "parliament", "supreme court"], misconception: "The Legislature frames laws, while the Judiciary ensures justice and protects the Constitution.", question: { prompt: "Which organ of the government is responsible for making laws in India?", answer: "The Legislature (Parliament)", options: ["The Legislature (Parliament)", "The Judiciary", "The Traffic Police", "The Election Booth"], explanation: "The Legislature (Lok Sabha and Rajya Sabha in Parliament) debates and passes laws.", intent: "Recognition" } },
  { id: "icse5-india-neighbours", title: "India: Physical Divisions & Neighbouring Countries", explanation: "India shares land borders with Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar, and Bangladesh, and maritime borders across the Indian Ocean with Sri Lanka and the Maldives.", keywords: ["himalayas", "peninsula", "sri lanka", "palk strait", "neighbours"], misconception: "Sri Lanka is separated from India by the narrow Palk Strait and Gulf of Mannar.", question: { prompt: "Which narrow strip of water separates India from its southern island neighbour Sri Lanka?", answer: "Palk Strait", options: ["Palk Strait", "Suez Canal", "Bering Strait", "Panama Canal"], explanation: "The Palk Strait and the Gulf of Mannar lie between Tamil Nadu in India and Sri Lanka.", intent: "Recall" } }
];

// ==========================================
// SENIOR SECONDARY CLASS 12 CONCEPTS (PAIN POINT 4: SENIOR DIFFICULTY)
// ==========================================

const scienceConceptsClass12CBSE: Concept[] = [
  { id: "c12-dna-replication", title: "DNA Double Helix, Chargaff's Rule & Replication", explanation: "In NCERT Class 12 Molecular Basis of Inheritance, DNA replication is semi-conservative (Meselson & Stahl). DNA polymerase III synthesises the leading strand continuously (5'→3') and the lagging strand as Okazaki fragments joined by DNA ligase.", keywords: ["DNA polymerase", "Okazaki", "Chargaff", "helicase", "ligase"], misconception: "DNA polymerase can only catalyse polymerisation in the 5' → 3' direction, reading the template strand in 3' → 5'.", question: { prompt: "If a dsDNA molecule has 20% Cytosine (C), what is the percentage of Adenine (A) according to Chargaff's Rule?", answer: "30%", options: ["30%", "20%", "40%", "60%"], explanation: "By Chargaff's rule, %C = %G = 20% (total 40%). Remaining A + T = 60%, so %A = %T = 30%.", intent: "Application" } },
  { id: "c12-lac-operon", title: "Lac Operon & Transcriptional Gene Regulation", explanation: "Jacob and Monod's Lac Operon in E. coli consists of regulator gene i, promoter p, operator o, and structural genes z (β-galactosidase), y (permease), and a (transacetylase). Allolactose acts as the inducer that inactivates the repressor.", keywords: ["lac operon", "inducer", "allolactose", "repressor", "galactosidase"], misconception: "Lac operon is under negative regulation by the repressor protein; lactose/allolactose binds the repressor so RNA polymerase can transcribe z, y, a.", question: { prompt: "In the E. coli lac operon, which structural gene codes for the enzyme β-galactosidase that hydrolyses lactose?", answer: "lac z", options: ["lac z", "lac y", "lac a", "Regulator gene i"], explanation: "The lac z gene codes for β-galactosidase, lac y codes for permease, and lac a codes for transacetylase.", intent: "Recall" } },
  { id: "c12-mendel-genetics", title: "Dihybrid Cross, Incomplete Dominance & Linkage", explanation: "Mendel's Law of Independent Assortment yields a 9:3:3:1 phenotypic ratio in F2 dihybrid crosses, whereas T.H. Morgan showed that tightly linked genes on the same chromosome deviate from 9:3:3:1 with lower recombination frequency.", keywords: ["dihybrid", "linkage", "Morgan", "recombination", "codominance"], misconception: "Physical distance between genes on a chromosome is directly proportional to recombination frequency (1% recombination = 1 centiMorgan).", question: { prompt: "In a Mendelian dihybrid cross (RrYy × RrYy), what fraction of F2 offspring are double homozygous recessive (rryy)?", answer: "1/16", options: ["1/16", "3/16", "9/16", "1/4"], explanation: "Out of 16 gametes combinations in the Punnett square, only 1 box is rryy (1/16).", intent: "Application" } },
  { id: "c12-pcr-biotech", title: "Recombinant DNA Technology, Restriction Enzymes & PCR", explanation: "Type II Restriction Endonucleases (e.g., EcoRI cutting 5'-GAATTC-3') create sticky ends. Polymerase Chain Reaction (PCR) amplifies DNA in 3 steps: Denaturation (94°C), Annealing (54°C), and Extension (72°C with thermostable Taq polymerase).", keywords: ["EcoRI", "palindrome", "Taq polymerase", "PCR", "pBR322"], misconception: "Taq polymerase (from Thermus aquaticus) remains active during high-temperature denaturation in PCR.", question: { prompt: "What is the correct sequence of the three thermal steps in a single cycle of Polymerase Chain Reaction (PCR)?", answer: "Denaturation → Annealing → Extension", options: ["Denaturation → Annealing → Extension", "Annealing → Denaturation → Ligation", "Extension → Elution → Spooling", "Transcription → Splicing → Translation"], explanation: "Heat first denatures dsDNA at ~94°C, primers anneal at ~54°C, and Taq polymerase extends strands at 72°C.", intent: "Recognition" } },
  { id: "c12-hardy-weinberg", title: "Hardy-Weinberg Equilibrium & Population Genetics", explanation: "Allele frequencies in a large, random-mating population remain constant (p + q = 1 and p² + 2pq + q² = 1) in the absence of mutation, natural selection, genetic drift (Founder/Bottleneck effect), and gene flow.", keywords: ["Hardy-Weinberg", "allele frequency", "heterozygote", "2pq", "genetic drift"], misconception: "In Hardy-Weinberg equilibrium, q represents the recessive allele frequency, whereas q² represents the homozygous recessive genotype frequency.", question: { prompt: "In a population in Hardy-Weinberg equilibrium, if the recessive allele frequency q = 0.4, what is the frequency of heterozygotes (2pq)?", answer: "0.48", options: ["0.48", "0.36", "0.16", "0.60"], explanation: "Since p + q = 1, p = 1 − 0.4 = 0.6. Heterozygote frequency = 2pq = 2 × 0.6 × 0.4 = 0.48.", intent: "Application" } },
  { id: "c12-ecosystem-pyramid", title: "Ecological Pyramids, Lindeman's 10% Law & GPP/NPP", explanation: "Net Primary Productivity (NPP) equals Gross Primary Productivity minus Respiration (GPP − R). According to Lindeman's 10% Law, only 10% of energy is transferred to each successive trophic level; hence the pyramid of energy is always upright.", keywords: ["NPP", "GPP", "Lindeman", "pyramid of energy", "trophic"], misconception: "While pyramids of biomass in oceans can be inverted (phytoplankton < zooplankton), the pyramid of energy is NEVER inverted.", question: { prompt: "If producers fix 10,000 J of Net Primary Productivity (NPP), how much energy reaches tertiary consumers under the 10% law?", answer: "10 J", options: ["10 J", "100 J", "1,000 J", "1 J"], explanation: "Producers (10,000 J) → Primary Consumers (1,000 J) → Secondary Consumers (100 J) → Tertiary Consumers (10 J).", intent: "Application" } }
];

const scienceConceptsClass12ICSE: Concept[] = [
  { id: "isc12-photophosphorylation", title: "Cyclic vs. Non-Cyclic Photophosphorylation & C4 Kranz Anatomy", explanation: "In ISC Class 12 Biology, Non-cyclic photophosphorylation involves both PS II (P680) and PS I (P700), photolysis of water, and yields ATP + NADPH + O₂. C4 plants (maize) exhibit Kranz anatomy with RuBisCO in bundle-sheath cells to eliminate photorespiration.", keywords: ["P680", "P700", "Kranz anatomy", "PEPcase", "RuBisCO", "Z-scheme"], misconception: "In C4 plants, primary CO₂ fixation occurs in mesophyll cells via PEP carboxylase, while the Calvin cycle runs in bundle-sheath cells.", question: { prompt: "Which enzyme performs initial CO₂ fixation in the mesophyll cells of C4 plants having Kranz anatomy?", answer: "PEP carboxylase (PEPcase)", options: ["PEP carboxylase (PEPcase)", "RuBisCO", "Hexokinase", "Pyruvate dehydrogenase"], explanation: "PEP carboxylase fixes HCO₃⁻ into oxaloacetate (OAA) in mesophyll cells and lacks oxygenase activity.", intent: "Recognition" } },
  { id: "isc12-action-potential", title: "Nerve Impulse Conduction & Synaptic Transmission", explanation: "A resting neuron is polarised (-70 mV) via the Na⁺/K⁺ ATPase pump (3 Na⁺ out, 2 K⁺ in). Depolarisation (+30 mV) occurs by rapid influx of Na⁺ through voltage-gated channels, and saltatory conduction leaps across Nodes of Ranvier.", keywords: ["depolarisation", "Na-K pump", "Nodes of Ranvier", "acetylcholine", "synapse"], misconception: "The Na⁺/K⁺ pump actively transports 3 Na⁺ ions outwards for every 2 K⁺ ions pumped inwards against their concentration gradients.", question: { prompt: "During the depolarisation phase of an action potential in an axon, which ion rushes rapidly INTO the axoplasm?", answer: "Na⁺ (Sodium ions)", options: ["Na⁺ (Sodium ions)", "K⁺ (Potassium ions)", "Cl⁻ (Chloride ions)", "Mg²⁺ ions"], explanation: "Opening of voltage-gated Na⁺ channels causes a rapid influx of Na⁺, reversing the membrane potential from -70 mV to +30 mV.", intent: "Concept" } },
  { id: "isc12-plasmid-cloning", title: "Cloning Vectors (pBR322), Insertional Inactivation & Blue-White Screening", explanation: "In ISC Biotechnology, pBR322 contains ampR and tetR selectable markers and an ori site. Blue-white screening uses insertional inactivation of the lacZ gene—recombinant colonies cannot cleave X-gal and remain white.", keywords: ["pBR322", "insertional inactivation", "lacZ", "blue-white", "BamHI"], misconception: "In blue-white screening, white colonies are the recombinants (foreign DNA disrupted lacZ), while blue colonies are non-recombinants.", question: { prompt: "In Blue-White colony screening using X-gal, what colour do recombinant bacterial colonies carrying the foreign DNA insert appear?", answer: "White colonies", options: ["White colonies", "Blue colonies", "Fluorescent green", "Crimson red"], explanation: "Insertion of foreign DNA into the lacZ gene inactivates β-galactosidase, so X-gal is not cleaved and recombinant colonies stay white.", intent: "Application" } },
  { id: "isc12-antibody-immunity", title: "Humoral vs. Cell-Mediated Immunity & IgG Structure (H₂L₂)", explanation: "Each immunoglobulin (antibody) molecule is a Y-shaped tetramer (H₂L₂) with two heavy and two light polypeptide chains linked by disulphide bonds, containing variable antigen-binding (Fab) paratopes and a constant (Fc) region.", keywords: ["H2L2", "paratope", "IgA", "colostrum", "T-lymphocytes"], misconception: "Colostrum (mother's first milk) provides passive natural immunity to newborns via abundant IgA antibodies, while IgG crosses the placenta.", question: { prompt: "Which class of immunoglobulin (antibody) can cross the human placenta to confer natural passive immunity to the foetus?", answer: "IgG", options: ["IgG", "IgM", "IgE", "IgD"], explanation: "IgG is the smallest monomer antibody capable of crossing the placental barrier from mother to foetus.", intent: "Recall" } },
  { id: "isc12-gametogenesis", title: "Spermatogenesis, Oogenesis & Hormonal Control (LH/FSH)", explanation: "Spermatogenesis yields 4 equal haploid spermatozoa from each primary spermatocyte, whereas oogenesis is unequal (forming 1 large haploid ovum and polar bodies) and arrests at Prophase-I (diplotene) until puberty. LH surge triggers ovulation on Day 14.", keywords: ["LH surge", "corpus luteum", "progesterone", "Graafian follicle", "acrosome"], misconception: "A primary spermatocyte produces 4 functional sperm, whereas a primary oocyte produces only 1 functional ovum and polar bodies.", question: { prompt: "A rapid mid-cycle surge of which pituitary hormone on Day 14 triggers rupture of the Graafian follicle (ovulation)?", answer: "Luteinising Hormone (LH)", options: ["Luteinising Hormone (LH)", "Oxytocin", "Prolactin", "Relaxin"], explanation: "The mid-cycle LH surge induces rupture of the mature Graafian follicle to release the secondary oocyte.", intent: "Recall" } },
  { id: "isc12-dna-fingerprinting", title: "VNTRs, Satellite DNA & Alec Jeffreys' DNA Fingerprinting", explanation: "DNA profiling relies on polymorphism in Variable Number of Tandem Repeats (VNTRs / minisatellites), followed by restriction digestion, agarose gel electrophoresis, Southern blotting onto nitrocellulose, and autoradiography with radiolabelled probes.", keywords: ["VNTR", "Southern blotting", "Alec Jeffreys", "minisatellite", "probe"], misconception: "Southern blotting transfers DNA fragments to a nitrocellulose membrane; Northern blotting is for RNA and Western blotting is for proteins.", question: { prompt: "In DNA fingerprinting, what is the technique used to transfer separated DNA fragments from agarose gel to a nitrocellulose membrane?", answer: "Southern Blotting", options: ["Southern Blotting", "Western Blotting", "ELISA", "Centrifugation"], explanation: "Developed by E.M. Southern, Southern Blotting transfers single-stranded DNA fragments onto a nylon/nitrocellulose sheet for probe hybridisation.", intent: "Recognition" } }
];

const mathsConceptsClass12CBSE: Concept[] = [
  { id: "c12-calculus-diff", title: "Continuity, Differentiability & Chain Rule Derivatives", explanation: "A function f(x) is differentiable at x = c only if Left-Hand Derivative equals Right-Hand Derivative. By the Chain Rule, d/dx[f(g(x))] = f'(g(x)) · g'(x). Every differentiable function is continuous, but the converse is not always true (e.g., |x| at x = 0).", keywords: ["derivative", "chain rule", "continuity", "differentiability"], misconception: "f(x) = |x| is continuous everywhere on R, but it is NOT differentiable at x = 0 due to a sharp corner.", question: { prompt: "What is the derivative dy/dx of y = sin(x²) with respect to x?", answer: "2x cos(x²)", options: ["2x cos(x²)", "cos(2x)", "cos(x²)", "-2x cos(x²)"], explanation: "By the Chain Rule, d/dx[sin(x²)] = cos(x²) · d/dx(x²) = 2x cos(x²).", intent: "Application" } },
  { id: "c12-maxima-minima", title: "Applications of Derivatives: Tangents, Maxima & Minima", explanation: "At a critical point where f'(c) = 0, the Second Derivative Test states: if f''(c) < 0, x = c is a point of local maximum; if f''(c) > 0, x = c is a point of local minimum; if f''(c) = 0, the test is inconclusive (point of inflection).", keywords: ["maxima", "minima", "critical point", "second derivative", "inflection"], misconception: "A negative second derivative f''(c) < 0 indicates concave downward curvature, which corresponds to a Local Maximum (not minimum).", question: { prompt: "For f(x) = x³ − 3x, at which point does f(x) attain its local maximum value?", answer: "x = -1", options: ["x = -1", "x = 1", "x = 0", "x = 3"], explanation: "f'(x) = 3x² − 3 = 0 gives x = ±1. Since f''(x) = 6x, f''(-1) = -6 < 0, so x = -1 is the local maximum.", intent: "Application" } },
  { id: "c12-integrals", title: "Indefinite & Definite Integrals (Fundamental Theorem of Calculus)", explanation: "Integration is the inverse of differentiation. By properties of definite integrals, ∫_{-a}^{a} f(x) dx = 0 if f(x) is an odd function (f(-x) = -f(x)), and 2 ∫_{0}^{a} f(x) dx if f(x) is an even function.", keywords: ["integral", "odd function", "definite integral", "antiderivative"], misconception: "Always check symmetry on [-a, a]: for any odd function like x³ cos(x) or sin⁵(x), the definite integral over [-a, a] is immediately 0.", question: { prompt: "Evaluate the definite integral: ∫_{-π/2}^{π/2} sin⁷(x) dx", answer: "0", options: ["0", "1", "2", "π/2"], explanation: "Since f(x) = sin⁷(x) satisfies f(-x) = -f(x), it is an odd function on a symmetric interval [-π/2, π/2], so its integral is 0.", intent: "Application" } },
  { id: "c12-matrices-det", title: "Matrices, Determinants, Adjoint & Inverse (A⁻¹)", explanation: "A square matrix A of order n is invertible if and only if it is non-singular (|A| ≠ 0), with A⁻¹ = adj(A) / |A|. Furthermore, |adj(A)| = |A|^(n−1) and |kA| = k^n |A|.", keywords: ["matrix", "determinant", "adjoint", "singular", "inverse"], misconception: "For a 3×3 matrix A, |kA| = k³|A| (not k|A|), and |adj(A)| = |A|^(3−1) = |A|².", question: { prompt: "If A is a non-singular 3 × 3 square matrix with determinant |A| = 5, what is the determinant of its adjoint |adj(A)|?", answer: "25", options: ["25", "5", "125", "1/5"], explanation: "For an n × n matrix, |adj(A)| = |A|^(n−1). Here n = 3, so |adj(A)| = 5^(3−1) = 5² = 25.", intent: "Application" } },
  { id: "c12-vectors-3d", title: "Vectors & 3D Geometry: Scalar (Dot) & Vector (Cross) Products", explanation: "The scalar dot product a⃗ · b⃗ = |a⃗||b⃗| cos θ is zero when non-zero vectors are mutually perpendicular (orthogonal). The vector cross product a⃗ × b⃗ gives a vector perpendicular to both a⃗ and b⃗ with magnitude equal to the area of their parallelogram.", keywords: ["dot product", "cross product", "orthogonal", "direction cosines"], misconception: "Two non-zero vectors are perpendicular if and only if their dot product a⃗ · b⃗ = 0; they are parallel/collinear if their cross product a⃗ × b⃗ = 0⃗.", question: { prompt: "For what value of λ are the vectors a⃗ = 2î + λĵ + k̂ and b⃗ = î − 2ĵ + 3k̂ perpendicular to each other?", answer: "λ = 5/2", options: ["λ = 5/2", "λ = -5/2", "λ = 2", "λ = 1"], explanation: "For perpendicular vectors, a⃗ · b⃗ = 0 ⇒ (2)(1) + (λ)(-2) + (1)(3) = 0 ⇒ 5 − 2λ = 0 ⇒ λ = 5/2.", intent: "Application" } },
  { id: "c12-bayes-probability", title: "Conditional Probability, Independent Events & Bayes' Theorem", explanation: "Conditional probability is P(A|B) = P(A ∩ B) / P(B). Two events A and B are independent if P(A ∩ B) = P(A) · P(B). Bayes' Theorem updates prior probabilities using new evidence.", keywords: ["conditional probability", "Bayes theorem", "independent", "mutually exclusive"], misconception: "Independent events (P(A ∩ B) = P(A)P(B)) are NOT the same as mutually exclusive events (P(A ∩ B) = 0).", question: { prompt: "If P(A) = 0.6, P(B) = 0.5, and P(A ∩ B) = 0.3, what is the conditional probability P(A | B)?", answer: "0.6", options: ["0.6", "0.5", "0.3", "0.8"], explanation: "P(A | B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 0.6. (Notice P(A|B) = P(A), so A and B are also independent!)", intent: "Application" } }
];

const mathsConceptsClass12ICSE: Concept[] = [
  { id: "isc12-lhospital", title: "Indeterminate Forms, L'Hôpital's Rule & Rolle's/Lagrange's Theorems", explanation: "In ISC Class 12 Mathematics, limits of 0/0 or ∞/∞ forms are evaluated via L'Hôpital's Rule: lim [f(x)/g(x)] = lim [f'(x)/g'(x)]. Rolle's Theorem guarantees c ∈ (a, b) with f'(c) = 0 when f(a) = f(b) on a continuous, differentiable interval.", keywords: ["L'Hopital", "Rolle's theorem", "Lagrange", "mean value", "limit"], misconception: "Before applying L'Hôpital's Rule, always verify that the limit is genuinely an indeterminate form (0/0 or ∞/∞).", question: { prompt: "Evaluate the limit: lim (x → 0) [ (e^(3x) − 1) / x ]", answer: "3", options: ["3", "1", "0", "e³"], explanation: "This is a 0/0 form. Applying L'Hôpital's Rule: lim (x→0) [ 3e^(3x) / 1 ] = 3 · e⁰ = 3.", intent: "Application" } },
  { id: "isc12-diff-equations", title: "Differential Equations: Integrating Factor of Linear DEs", explanation: "A first-order linear differential equation dy/dx + P(x)y = Q(x) is solved using the Integrating Factor I.F. = e^(∫ P(x) dx), giving the general solution y · (I.F.) = ∫ Q(x) · (I.F.) dx + C.", keywords: ["differential equation", "integrating factor", "order", "degree", "homogeneous"], misconception: "The degree of a differential equation is the power of the highest-order derivative only when the DE is a polynomial in all derivatives.", question: { prompt: "What is the Integrating Factor (I.F.) of the linear differential equation dy/dx + (2/x)y = x²?", answer: "x²", options: ["x²", "2/x", "e^(2x)", "ln(x²)"], explanation: "Here P(x) = 2/x. Integrating Factor = e^(∫ (2/x) dx) = e^(2 ln x) = e^(ln x²) = x².", intent: "Application" } },
  { id: "isc12-boolean-cramer", title: "Martin's Rule (Matrix Inversion), Cayley-Hamilton & Determinants", explanation: "In ISC Algebra, system AX = B has a unique solution X = A⁻¹B when |A| ≠ 0. If |A| = 0 and (adj A)B = 0, the system is consistent with infinitely many solutions; if (adj A)B ≠ 0, it is inconsistent.", keywords: ["Martin's rule", "consistent", "singular", "inconsistent", "system of equations"], misconception: "A homogeneous system AX = 0 is ALWAYS consistent; it has non-trivial solutions if and only if |A| = 0.", question: { prompt: "For what value of k does the homogeneous system x + 2y = 0 and 3x + ky = 0 have non-trivial (non-zero) solutions?", answer: "k = 6", options: ["k = 6", "k = 3", "k = -6", "k = 0"], explanation: "For non-trivial solutions, the determinant of coefficients must be zero: (1)(k) − (2)(3) = 0 ⇒ k = 6.", intent: "Application" } },
  { id: "isc12-conics-parabola", title: "Conic Sections & Definite Integral Area Under Curves", explanation: "The area bounded by a curve y = f(x), the x-axis, and ordinates x = a to x = b is ∫_a^b |y| dx. For the standard parabola y² = 4ax, the latus rectum has length 4a and focus at (a, 0).", keywords: ["area under curve", "parabola", "latus rectum", "ellipse", "eccentricity"], misconception: "Area bounded by a curve below the x-axis must be taken with absolute value |∫ y dx| so physical area remains positive.", question: { prompt: "What is the area bounded by the curve y = x², the x-axis, and the lines x = 0 and x = 3?", answer: "9 sq. units", options: ["9 sq. units", "27 sq. units", "3 sq. units", "9/2 sq. units"], explanation: "Area = ∫₀³ x² dx = [x³/3]₀³ = 27/3 − 0 = 9 sq. units.", intent: "Application" } },
  { id: "isc12-regression-corr", title: "Karl Pearson's Correlation & Lines of Regression (ISC Section C)", explanation: "For two regression lines of Y on X (byx) and X on Y (bxy), the correlation coefficient r satisfies r² = byx · bxy (with -1 ≤ r ≤ 1), and both regression lines always intersect at the mean point (x̄, ȳ).", keywords: ["regression", "correlation", "byx", "bxy", "mean point"], misconception: "The signs of byx, bxy, and r must always be identical, and the geometric mean √(byx · bxy) cannot exceed 1.", question: { prompt: "If the two regression coefficients are byx = 0.8 and bxy = 0.2, what is Karl Pearson's correlation coefficient r?", answer: "0.4", options: ["0.4", "0.16", "0.5", "1.0"], explanation: "Since both regression coefficients are positive, r = +√(byx × bxy) = √(0.8 × 0.2) = √0.16 = 0.4.", intent: "Application" } },
  { id: "isc12-bayes-binomial", title: "Binomial Distribution (Mean = np, Variance = npq) & Bayes' Law", explanation: "In a Binomial Distribution B(n, p) with n independent Bernoulli trials, the mean is E(X) = np and variance is Var(X) = npq (where q = 1 − p), so for any binomial distribution, Mean > Variance.", keywords: ["binomial distribution", "variance", "npq", "Bernoulli", "Bayes"], misconception: "In a Binomial distribution, Variance (npq) is always strictly less than the Mean (np) because 0 < q < 1.", question: { prompt: "If the mean of a Binomial distribution is 4 and its variance is 3, what is the number of trials n?", answer: "16", options: ["16", "12", "8", "4"], explanation: "Variance / Mean = npq / np = q = 3/4. Thus p = 1 − 3/4 = 1/4. Since np = 4 ⇒ n(1/4) = 4 ⇒ n = 16.", intent: "Application" } }
];

const englishConceptsClass12CBSE: Concept[] = [
  { id: "c12-poetic-devices", title: "Advanced Poetic Devices: Transferred Epithet, Synecdoche & Oxymoron", explanation: "In NCERT Class 12 Flamingo Poetry ('My Mother at Sixty-Six', 'A Thing of Beauty', 'Keeping Quiet'), a Transferred Epithet shifts an adjective from the person to a noun ('polished traffic', 'sadness of never understanding').", keywords: ["transferred epithet", "synecdoche", "oxymoron", "enjambment", "anaphora"], misconception: "In a Transferred Epithet ('sleepless pillow' or 'polished traffic'), the adjective grammatically modifies the object but logically describes the human.", question: { prompt: "Identify the poetic device in 'polished traffic passed with a mind ahead' (from Robert Frost's 'A Roadside Stand'):", answer: "Transferred Epithet", options: ["Transferred Epithet", "Onomatopoeia", "Litotes", "Pun"], explanation: "'Polished' logically describes the wealthy urban people inside the cars, transferred onto the noun 'traffic'.", intent: "Recognition" } },
  { id: "c12-rhetoric-irony", title: "Dramatic, Situational & Verbal Irony in Prose ('The Tiger King' & 'The Last Lesson')", explanation: "Situational irony occurs when the outcome is starkly opposite to expectation (e.g., the Tiger King surviving 99 live tigers only to die from a wooden toy tiger's sliver); dramatic irony occurs when the audience knows a truth the character does not.", keywords: ["irony", "satire", "dramatic irony", "The Last Lesson", "The Tiger King"], misconception: "Satire uses irony, hyperbole, and wit to expose human folly or abuse of power, not merely to entertain.", question: { prompt: "In Alphonse Daudet's 'The Last Lesson', why do the village elders sit quietly on the back benches of M. Hamel's classroom?", answer: "To honour their mother tongue French before the Prussian ban takes effect", options: ["To honour their mother tongue French before the Prussian ban takes effect", "To complain about the school fees", "To celebrate a military victory", "To inspect the school building"], explanation: "The elders regret procrastinating learning their own language and attend to pay tribute to M. Hamel's 40 years of service.", intent: "Reasoning" } },
  { id: "c12-clause-synthesis", title: "Synthesis of Sentences: Nominative Absolute & Participle Clauses", explanation: "Senior grammar combines clauses using a Nominative Absolute ('The sun having risen, the fog dispersed') when the two clauses have different subjects, or a Present Participle when they share the same subject.", keywords: ["nominative absolute", "participle", "synthesis", "complex sentence"], misconception: "Avoid dangling participles: in 'Walking down the street, the trees looked green', 'walking' wrongly attaches to 'trees'.", question: { prompt: "Combine using a Nominative Absolute: 'The treaty was signed. The delegates returned home.'", answer: "The treaty having been signed, the delegates returned home.", options: ["The treaty having been signed, the delegates returned home.", "Signing the treaty, the delegates returned home.", "The treaty signed and delegates returned.", "Because signing the treaty, delegates returned."], explanation: "Since 'the treaty' and 'the delegates' are different subjects, the passive nominative absolute 'The treaty having been signed' is used.", intent: "Application" } },
  { id: "c12-inversion-conditionals", title: "Subjunctive Mood & Inverted Third Conditionals ('Had I known...')", explanation: "In formal senior prose, counterfactual past conditionals ('If I had known...') can omit 'if' through subject-auxiliary inversion: 'Had I known the truth, I would have spoken.'", keywords: ["inversion", "subjunctive", "conditional", "counterfactual"], misconception: "Never use 'would have' in the if-clause; the condition clause takes past perfect ('Had + V3') and the main clause takes 'would have + V3'.", question: { prompt: "Choose the grammatically impeccable inverted conditional sentence:", answer: "Had she arrived five minutes earlier, she would have caught the express.", options: ["Had she arrived five minutes earlier, she would have caught the express.", "Would she have arrived earlier, she caught the express.", "If she would have arrived earlier, she had caught the express.", "Had she arrive earlier, she will catch the express."], explanation: "'Had she arrived...' is the inverted counterfactual past perfect conditional paired with 'would have caught'.", intent: "Application" } },
  { id: "c12-formal-register", title: "Formal Academic Register, Editorial Tone & Notice/Report Precision", explanation: "Class 12 Advanced Writing Skills demand third-person objective register, concise nominalisation, and unambiguous structure in formal reports, notices, and letters to the Editor.", keywords: ["register", "nominalisation", "objective tone", "editorial"], misconception: "Formal reports are written in the past tense and passive/third-person voice, avoiding colloquial first-person slang.", question: { prompt: "Which sentence demonstrates concise, formal academic register suitable for an editorial?", answer: "Rapid urbanisation has exacerbated groundwater depletion across metropolitan aquifers.", options: ["Rapid urbanisation has exacerbated groundwater depletion across metropolitan aquifers.", "Cities growing super fast totally ruined the water underground.", "We all know big cities drink up way too much water these days!", "Groundwater is gone because of lots of new buildings."], explanation: "Uses precise academic vocabulary ('urbanisation', 'exacerbated', 'depletion', 'aquifers') and objective third-person tone.", intent: "Recognition" } },
  { id: "c12-critical-inference", title: "Critical Reading: Tone, Paradox & Authorial Perspective", explanation: "A paradox is a statement that appears self-contradictory on the surface yet reveals a deeper truth upon reflection (e.g., Neruda's 'victory with no survivors' in 'Keeping Quiet').", keywords: ["paradox", "tone", "inference", "juxtaposition"], misconception: "Unlike an oxymoron (two adjacent contradictory words like 'deafening silence'), a paradox is a complete statement or proposition.", question: { prompt: "What literary device is exemplified by Pablo Neruda's phrase 'victory with no survivors' in 'Keeping Quiet'?", answer: "Paradox (and Irony)", options: ["Paradox (and Irony)", "Simile", "Euphemism", "Hyperbole"], explanation: "A 'victory' that leaves 'no survivors' exposes the self-contradictory absurdity of modern warfare—a classic paradox.", intent: "Reasoning" } }
];

const englishConceptsClass12ICSE: Concept[] = [
  { id: "isc12-shakespeare-macbeth", title: "ISC Shakespeare ('Macbeth'): Soliloquy, Hamartia & Dramatic Irony", explanation: "In ISC Class 12 Shakespeare ('Macbeth'), Macbeth's tragic flaw (hamartia) is 'vaulting ambition'. Duncan's remark upon arriving at Inverness ('This castle hath a pleasant seat') is a textbook example of tragic dramatic irony.", keywords: ["Macbeth", "hamartia", "dramatic irony", "soliloquy", "equivocation"], misconception: "Equivocation ('Fair is foul, and foul is fair') is the witches' use of half-truths to seduce Macbeth into his own downfall.", question: { prompt: "In Shakespeare's 'Macbeth', what term describes the fatal tragic flaw ('vaulting ambition') that leads to the protagonist's downfall?", answer: "Hamartia", options: ["Hamartia", "Catharsis", "Peripeteia", "Hubris only"], explanation: "Aristotle's term 'hamartia' denotes the tragic flaw or error of judgment in a tragic hero—in Macbeth's case, his unchecked ambition.", intent: "Recognition" } },
  { id: "isc12-transformation", title: "ISC Structural Transformation: 'No sooner...than' & 'Hardly...when'", explanation: "ISC Paper 1 (English Language) tests negative adverbial inversion: 'No sooner' is always followed by an inverted auxiliary ('did/had') and paired with 'than' (never 'when'); 'Hardly/Scarcely' is paired with 'when' (never 'than').", keywords: ["no sooner", "hardly", "scarcely", "inversion", "transformation"], misconception: "Never pair 'No sooner' with 'when' or 'then'—it must always be 'No sooner... than' with subject-auxiliary inversion.", question: { prompt: "Transform beginning with 'No sooner': 'As soon as the bell rang, the students entered the hall.'", answer: "No sooner did the bell ring than the students entered the hall.", options: ["No sooner did the bell ring than the students entered the hall.", "No sooner the bell rang when the students entered the hall.", "No sooner did the bell rang than the students entered the hall.", "No sooner had the bell ring then the students entered."], explanation: "After 'No sooner', we invert with 'did + base verb (ring)' (or 'had + rung') and pair it with 'than'.", intent: "Application" } },
  { id: "isc12-too-to-so-that", title: "ISC Sentence Transformation: 'Too...to', 'Lest...should' & 'So...that'", explanation: "In ISC Grammar transformations, the conjunction 'lest' (meaning 'for fear that') is already negative and must be followed by the modal 'should' (without 'not'): 'Walk carefully lest you should fall.'", keywords: ["lest", "should", "too...to", "so...that", "concessive"], misconception: "Because 'lest' inherently means 'so that... not', adding 'not' after 'lest' creates an incorrect double negative.", question: { prompt: "Choose the grammatically correct transformation using 'lest':", answer: "Work diligently lest you should fail the examination.", options: ["Work diligently lest you should fail the examination.", "Work diligently lest you should not fail the examination.", "Work diligently lest you will fail the examination.", "Work diligently lest you may not fail."], explanation: "'Lest' takes the modal 'should' without 'not' because 'lest' already carries a negative warning.", intent: "Application" } },
  { id: "isc12-preposition-phrasal", title: "ISC Precision Phrasal Verbs & Prepositional Collocations", explanation: "ISC Language Paper 1 tests nuanced phrasal distinctions: 'abide by' (a rule), 'acquitted of' (a charge), 'dispense with' (services), 'prevail upon' (persuade), and 'see through' (detect a deception).", keywords: ["acquitted of", "dispense with", "prevail upon", "phrasal verbs"], misconception: "One is 'accused of' or 'acquitted of' a crime (never 'from'), and one 'complies with' a regulation.", question: { prompt: "Fill in the correct prepositional collocation: 'The magistrate acquitted the merchant ___ all charges of fraud.'", answer: "of", options: ["of", "from", "by", "with"], explanation: "The verb 'acquit' always takes the preposition 'of' ('acquitted of all charges').", intent: "Recall" } },
  { id: "isc12-proposal-precis", title: "ISC Proposal Writing & 1/3rd Précis Synthesis", explanation: "An ISC Proposal requires a Heading/Introduction (2 sentences), Statement of Objective (2 sentences), and a bulleted List of Measures (minimum 4 concrete points). A Précis must condense a passage in one's own words within a strict word grid.", keywords: ["proposal writing", "precis", "statement of objective", "measures"], misconception: "A précis must be written entirely in reported/third-person prose without direct quotations or personal commentary.", question: { prompt: "In an ISC Proposal, which section explicitly states the concrete steps (who, where, budget, logistics) to execute the plan?", answer: "List of Measures", options: ["List of Measures", "Salutation", "Postscript", "Bibliography"], explanation: "The 'List of Measures' outlines the 4+ actionable steps for implementing the proposal after the Heading and Statement of Objective.", intent: "Recognition" } },
  { id: "isc12-poetic-criticism", title: "ISC Poetry & Prose Appreciation: Imagery, Enjambment & Allusion", explanation: "Literary appreciation analyses auditory/visual/tactile imagery, classical/biblical allusion, enjambment (run-on lines without terminal punctuation), and caesura (deliberate mid-line pause).", keywords: ["enjambment", "caesura", "allusion", "imagery", "elegy"], misconception: "Enjambment carries a clause across a line break without punctuation, accelerating rhythm, whereas a caesura creates a mid-line pause.", question: { prompt: "What is the term for a deliberate pause or break in the middle of a line of verse, often marked by punctuation?", answer: "Caesura", options: ["Caesura", "Enjambment", "Hyperbaton", "Apostrophe"], explanation: "A caesura is a rhythmic pause within a poetic line, contrasting with enjambment at the end of a line.", intent: "Recognition" } }
];

const socialConceptsClass12CBSE: Concept[] = [
  { id: "c12-harappan-stratigraphy", title: "Bricks, Beads & Bones: Harappan Stratigraphy & Cunningham's Confusion", explanation: "In NCERT Class 12 History Theme 1, R.E.M. Wheeler introduced military precision and stratigraphic layers to archaeology, correcting Alexander Cunningham's mistake of using Chinese Buddhist pilgrim accounts to date Harappan seals.", keywords: ["Wheeler", "Cunningham", "stratigraphy", "John Marshall", "steatite"], misconception: "John Marshall announced the discovery of the Indus Valley Civilisation in 1924, but excavated horizontally by regular measurement rather than following stratigraphy.", question: { prompt: "Which Director-General of the ASI (1944) recognised that archaeological excavations must follow horizontal stratigraphic layers rather than uniform metric depths?", answer: "R. E. M. Wheeler", options: ["R. E. M. Wheeler", "Alexander Cunningham", "Colin Mackenzie", "William Jones"], explanation: "Mortimer Wheeler rectified earlier excavation methods by insisting on following the stratigraphy of the mound.", intent: "Recall" } },
  { id: "c12-kings-farmers-towns", title: "Kings, Farmers & Towns: Mahajanapadas, Prinsep & Brahmi Epigraphy", explanation: "In 1838, James Prinsep deciphered Ashokan Brahmi and Kharosthi scripts, revealing references to 'Piyadassi' (Ashoka). The 6th century BCE saw 16 Mahajanapadas (with Magadha's rise), punch-marked coins, and land grants (agrahara).", keywords: ["James Prinsep", "Brahmi", "Kharosthi", "Magadha", "agrahara", "Prabhavati Gupta"], misconception: "Although Sanskrit legal texts barred women from independent land ownership, Vakataka Queen Prabhavati Gupta (daughter of Chandragupta II) granted land in her own right.", question: { prompt: "Which East India Company mint officer deciphered the ancient Brahmi and Kharosthi scripts in 1838?", answer: "James Prinsep", options: ["James Prinsep", "Max Müller", "Daya Ram Sahni", "Rakhal Das Banerji"], explanation: "James Prinsep's decipherment of Brahmi in 1838 unlocked the edicts of Mauryan Emperor Ashoka ('Devanampiya Piyadassi').", intent: "Recall" } },
  { id: "c12-bhakti-sufi", title: "Bhakti-Sufi Traditions: Alvars, Nayanars, Virashaivas & Chishti Silsila", explanation: "Early Tamil Bhakti was led by Vaishnava Alvars ('Nalayira Divyaprabandham') and Shaiva Nayanars ('Tevaram'). In 12th-century Karnataka, Basavanna founded the Virashaiva (Lingayat) movement challenging caste hierarchy; the Chishti Sufi order flourished under Khwaja Muinuddin Chishti.", keywords: ["Alvars", "Nayanars", "Basavanna", "Virashaiva", "Chishti", "Kabir"], misconception: "Alvars were devotees of Vishnu (including Andal), whereas Nayanars were devotees of Shiva (including Karaikkal Ammaiyar).", question: { prompt: "Which 12th-century philosopher-minister in Karnataka led the Virashaiva (Lingayat) movement and composed Vachanas in Kannada?", answer: "Basavanna", options: ["Basavanna", "Shankaradeva", "Ramanuja", "Mirabai"], explanation: "Basavanna (initially a minister in the Kalachuri court) initiated the Virashaiva movement advocating social equality.", intent: "Recognition" } },
  { id: "c12-vijayanagara", title: "An Imperial Capital: Vijayanagara (Amara-Nayaka System & Krishnadeva Raya)", explanation: "Founded in 1336 by Harihara and Bukka, Vijayanagara reached its zenith under Krishnadeva Raya (Tuluva dynasty, author of 'Amuktamalyada'). The Amara-Nayaka military-fiscal system (inspired by the Iqta system) maintained cavalry and temples like the Virupaksha and Vitthala.", keywords: ["Krishnadeva Raya", "Amara-Nayaka", "Amuktamalyada", "Hampi", "Talikota"], misconception: "'Amuktamalyada' (a work on statecraft by Krishnadeva Raya) was composed in Telugu, not Sanskrit.", question: { prompt: "In which language did Vijayanagara Emperor Krishnadeva Raya compose his celebrated work on statecraft, 'Amuktamalyada'?", answer: "Telugu", options: ["Telugu", "Sanskrit", "Persian", "Pali"], explanation: "Krishnadeva Raya composed 'Amuktamalyada' in Telugu, stating that a king should always improve the harbours and commerce of his realm.", intent: "Recall" } },
  { id: "c12-1857-revolt", title: "Rebels and the Raj (1857): Subsidiary Alliance & Awadh Annexation", explanation: "Lord Wellesley's Subsidiary Alliance (1798) and Lord Dalhousie's annexation of Awadh (1856, on the pretext of misgovernance, 'a cherry that will drop into our mouth') alienated sepoys, taluqdars, and peasants, culminating in the Revolt of 1857 led by Birjis Qadr and Begum Hazrat Mahal in Lucknow.", keywords: ["Subsidiary Alliance", "Awadh", "Dalhousie", "Begum Hazrat Mahal", "Azamgarh Proclamation"], misconception: "Awadh was annexed in 1856 not under the Doctrine of Lapse, but on the allegation of 'maladministration' of Nawab Wajid Ali Shah.", question: { prompt: "On what official pretext did Governor-General Lord Dalhousie annex the kingdom of Awadh in 1856?", answer: "Alleged misgovernance / maladministration", options: ["Alleged misgovernance / maladministration", "Absence of a natural male heir", "Failure to pay maritime customs", "Alliance with Russia"], explanation: "Unlike Jhansi and Satara (annexed via Doctrine of Lapse), Awadh was annexed in 1856 under the pretext of freeing the people from 'misrule'.", intent: "Reasoning" } },
  { id: "c12-constitution-making", title: "Framing the Constitution: Objectives Resolution & Constituent Assembly Debates", explanation: "On 13 December 1946, Jawaharlal Nehru moved the 'Objectives Resolution' proclaiming India an 'Independent Sovereign Republic'. Debates between centralisation (Ambedkar, Nehru) and provincial autonomy (K. Santhanam), and over separate vs. joint electorates (Govind Ballabh Pant, Begum Aizaz Rasul) shaped the Republic.", keywords: ["Objectives Resolution", "Constituent Assembly", "Ambedkar", "Santhanam", "Article 356"], misconception: "The Objectives Resolution moved by Nehru in December 1946 later formed the foundational blueprint for the Preamble of the Indian Constitution.", question: { prompt: "Who moved the historic 'Objectives Resolution' in the Constituent Assembly on 13 December 1946?", answer: "Jawaharlal Nehru", options: ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Dr. Rajendra Prasad", "B. N. Rau"], explanation: "Jawaharlal Nehru introduced the Objectives Resolution on 13 December 1946, outlining the constitutional ideals of justice, liberty, and equality.", intent: "Recall" } }
];

const socialConceptsClass12ICSE: Concept[] = [
  { id: "isc12-indian-nationalism", title: "ISC History: Mountbatten Plan, Cabinet Mission (1946) & Indian Independence Act (1947)", explanation: "In ISC Class 12 History, the Cabinet Mission (Pethick-Lawrence, Cripps, Alexander) proposed a three-tier federal union (Groups A, B, C) rejecting partition, whereas the Mountbatten Plan (3 June 1947) and Radcliffe Boundary Commission led to the Indian Independence Act 1947.", keywords: ["Cabinet Mission", "Mountbatten Plan", "Radcliffe", "Attlee", "1947"], misconception: "The Cabinet Mission Plan of 1946 explicitly rejected the demand for a separate sovereign Pakistan, proposing instead a loose 3-tier confederation.", question: { prompt: "How many provincial groupings (tiers) were proposed under the Cabinet Mission Plan of May 1946?", answer: "Three groupings (Sections A, B, and C)", options: ["Three groupings (Sections A, B, and C)", "Two sovereign dominions", "Fourteen linguistic states", "Five princely federations"], explanation: "The Cabinet Mission grouped provinces into Section A (Hindu-majority), Section B (North-West Muslim-majority), and Section C (East: Bengal & Assam).", intent: "Recall" } },
  { id: "isc12-states-reorganisation", title: "Integration of Princely States (Junagadh, Hyderabad, Kashmir) & 1956 Fazl Ali Commission", explanation: "Sardar Patel and V.P. Menon integrated 560+ princely states via the Instrument of Accession, a plebiscite in Junagadh, Operation Polo in Hyderabad (Sept 1948), and the States Reorganisation Act 1956 (creating 14 states and 6 UTs on linguistic lines following Potti Sreeramulu's fast).", keywords: ["Operation Polo", "Instrument of Accession", "Fazl Ali", "Potti Sreeramulu", "Andhra"], misconception: "Andhra State (1953) was the first state in independent India created on a linguistic basis before the 1956 States Reorganisation Act.", question: { prompt: "What was the code name of the September 1948 police action that integrated the princely state of Hyderabad into the Indian Union?", answer: "Operation Polo", options: ["Operation Polo", "Operation Vijay", "Operation Meghdoot", "Operation Blue Star"], explanation: "Operation Polo (September 1948) ended the Razakar militia standoff and integrated the Nizam's Hyderabad into India.", intent: "Recall" } },
  { id: "isc12-cold-war-detente", title: "World History (ISC): Truman Doctrine, Marshall Plan, Cuban Missile Crisis & Détente", explanation: "Cold War containment began with the 1947 Truman Doctrine and Marshall Plan ($13B European recovery), peaked during the October 1962 Cuban Missile Crisis (Kennedy vs. Khrushchev), and shifted toward Détente (SALT I, Helsinki Accords) before the 1989–91 Soviet collapse under Gorbachev's Glasnost & Perestroika.", keywords: ["Truman Doctrine", "Marshall Plan", "Cuban Missile Crisis", "Glasnost", "Perestroika"], misconception: "Glasnost meant political 'openness' and transparency, while Perestroika meant economic 'restructuring' under Mikhail Gorbachev.", question: { prompt: "Which two reform policies introduced by Mikhail Gorbachev after 1985 accelerated the democratisation and eventual dissolution of the USSR?", answer: "Glasnost (Openness) and Perestroika (Restructuring)", options: ["Glasnost (Openness) and Perestroika (Restructuring)", "New Deal and Fair Deal", "War Communism and NEP", "Ostpolitik and Containment"], explanation: "Gorbachev's twin policies of Glasnost and Perestroika loosened state censorship and central planning across the Soviet bloc.", intent: "Recognition" } },
  { id: "isc12-apartheid-mandela", title: "Anti-Apartheid Movement in South Africa: Sharpeville (1960), Soweto (1976) & Mandela", explanation: "Apartheid institutionalised racial segregation in 1948 under the National Party. After the 1960 Sharpeville Massacre, Nelson Mandela co-founded MK (Umkhonto we Sizwe), was sentenced at the Rivonia Trial (1964), and negotiated the dismantle of Apartheid with F.W. de Klerk (1990–1994).", keywords: ["Apartheid", "Sharpeville", "Rivonia Trial", "Mandela", "de Klerk", "ANC"], misconception: "Following the 1960 Sharpeville Massacre and banning of the ANC, Mandela transitioned from strictly non-violent defiance to sabotage via Umkhonto we Sizwe.", question: { prompt: "At which historic 1963–64 trial was Nelson Mandela sentenced to life imprisonment on Robben Island?", answer: "The Rivonia Trial", options: ["The Rivonia Trial", "The Nuremberg Trial", "The Pretoria Treason Trial of 1956", "The Meerut Conspiracy Case"], explanation: "Following the arrest of MK leaders at Liliesleaf Farm in Rivonia, Mandela delivered his 'I Am Prepared to Die' speech at the Rivonia Trial.", intent: "Recall" } },
  { id: "isc12-judicial-review", title: "ISC Political Science: Basic Structure Doctrine (Kesavananda Bharati 1973) & Judicial Review", explanation: "Under Article 368, Parliament can amend the Constitution, but in Kesavananda Bharati v. State of Kerala (1973), a 13-judge Supreme Court bench ruled that Parliament cannot alter the 'Basic Structure' (supremacy of Constitution, secularism, federalism, judicial review).", keywords: ["Kesavananda Bharati", "Basic Structure", "Article 368", "judicial review"], misconception: "The Basic Structure Doctrine is a judicial innovation from the 1973 Kesavananda Bharati landmark ruling, not a list originally written in the 1950 text.", question: { prompt: "Which landmark 1973 Supreme Court judgment established the 'Basic Structure Doctrine' limiting Parliament's amending power under Article 368?", answer: "Kesavananda Bharati v. State of Kerala", options: ["Kesavananda Bharati v. State of Kerala", "Golaknath v. State of Punjab", "A. K. Gopalan v. State of Madras", "Shah Bano Case"], explanation: "By a 7:6 majority, the 13-judge bench in Kesavananda Bharati (1973) held that Parliament cannot destroy the Basic Structure of the Constitution.", intent: "Recognition" } },
  { id: "isc12-emergency-jp", title: "Total Revolution (JP Movement), 1975 Emergency & 42nd/44th Constitutional Amendments", explanation: "Jayaprakash Narayan led the 1974–75 Bihar/Gujarat student movement calling for 'Sampoorna Kranti' (Total Revolution). After the June 1975 Emergency (Article 352), the 44th Amendment (1978) replaced 'internal disturbance' with 'armed rebellion' and made Fundamental Rights under Articles 20 & 21 non-suspendable.", keywords: ["Jayaprakash Narayan", "44th Amendment", "Article 352", "armed rebellion"], misconception: "The 42nd Amendment (1976) expanded executive power during the Emergency, whereas the 44th Amendment (1978) restored constitutional safeguards.", question: { prompt: "Which Constitutional Amendment Act replaced the phrase 'internal disturbance' with 'armed rebellion' under Article 352 and safeguarded Articles 20 and 21?", answer: "44th Amendment Act (1978)", options: ["44th Amendment Act (1978)", "42nd Amendment Act (1976)", "73rd Amendment Act (1992)", "1st Amendment Act (1951)"], explanation: "Enacted by the Janata government in 1978, the 44th Amendment prevented future misuse of Emergency provisions.", intent: "Recall" } }
];

// ==========================================
// SECONDARY CLASS 10 CONCEPTS (CBSE & ICSE BOARD LEVEL)
// ==========================================

const scienceConceptsClass10CBSE: Concept[] = [
  { id: "c10-life-processes", title: "Life Processes: Double Circulation & Nephron Ultrafiltration", explanation: "In NCERT Class 10 Science, the four-chambered human heart prevents mixing of oxygenated and deoxygenated blood via double circulation (pulmonary + systemic). Nephrons filter blood in Bowman's capsule and selectively reabsorb glucose, amino acids, and water.", keywords: ["double circulation", "nephron", "Bowman's capsule", "alveoli", "xylem"], misconception: "Pulmonary vein is the only vein that carries oxygenated blood (from lungs to left atrium); pulmonary artery carries deoxygenated blood.", question: { prompt: "Which chamber of the human heart receives oxygenated blood directly from the lungs via the pulmonary veins?", answer: "Left Atrium", options: ["Left Atrium", "Right Atrium", "Right Ventricle", "Vena Cava"], explanation: "Oxygenated blood from the lungs enters the thin-walled Left Atrium via pulmonary veins and is pumped to the body by the thick-walled Left Ventricle.", intent: "Recognition" } },
  { id: "c10-control-coord", title: "Control & Coordination: Reflex Arc, Plant Tropisms & Auxin", explanation: "A reflex arc routes urgent signals directly through the spinal cord (Receptor → Sensory Neuron → Relay Neuron → Motor Neuron → Effector). In plants, Auxin diffuses to the shaded side of a shoot tip, stimulating cell elongation and positive phototropism.", keywords: ["reflex arc", "auxin", "phototropism", "cerebellum", "insulin"], misconception: "Auxin accumulates on the SHADED side of a plant shoot (not the lit side), making shaded cells elongate faster so the shoot bends toward light.", question: { prompt: "Why does a plant shoot bend toward unidirectional sunlight (positive phototropism)?", answer: "Auxin diffuses to the shaded side and stimulates greater cell elongation there", options: ["Auxin diffuses to the shaded side and stimulates greater cell elongation there", "Sunlight destroys cells on the shaded side", "Abscisic acid pulls the stem toward light", "Roots push the stem sideways"], explanation: "Auxin hormone moves away from light to the shaded side of the shoot tip, causing cells on the shady side to grow longer and bend the stem toward light.", intent: "Reasoning" } },
  { id: "c10-heredity", title: "Heredity: Mendel's Monohybrid (3:1) & Sex Determination (XX/XY)", explanation: "In humans, females are homogametic (22 pairs autosomes + XX) and males are heterogametic (22 pairs + XY). The genetic sex of a child is determined solely by whether the father's sperm carries an X or a Y chromosome.", keywords: ["XX", "XY", "monohybrid", "genotype", "1:2:1"], misconception: "In a Mendelian monohybrid F2 cross (Tt × Tt), the phenotypic ratio is 3:1, but the genotypic ratio (TT : Tt : tt) is 1:2:1.", question: { prompt: "In Mendel's monohybrid F2 generation (Tt × Tt), what is the genotypic ratio of TT : Tt : tt?", answer: "1 : 2 : 1", options: ["1 : 2 : 1", "3 : 1", "9 : 3 : 3 : 1", "1 : 1"], explanation: "Crossing Tt × Tt produces 1 TT (homozygous dominant), 2 Tt (heterozygous tall), and 1 tt (homozygous dwarf)—a 1:2:1 genotypic ratio.", intent: "Recall" } },
  { id: "c10-reproduction", title: "Double Fertilisation in Angiosperms (Syngamy + Triple Fusion)", explanation: "In flowering plants, one male gamete fuses with the egg cell to form the diploid zygote (2n, Syngamy), while the second male gamete fuses with two polar nuclei to form the triploid Primary Endosperm Nucleus (3n, Triple Fusion).", keywords: ["double fertilisation", "triple fusion", "endosperm", "syngamy", "pollen tube"], misconception: "Endosperm in angiosperms is triploid (3n) because it results from triple fusion of one male gamete (n) and two polar nuclei (n + n).", question: { prompt: "What is the ploidy of the Primary Endosperm Nucleus (PEN) formed by triple fusion in flowering plants?", answer: "Triploid (3n)", options: ["Triploid (3n)", "Diploid (2n)", "Haploid (n)", "Tetraploid (4n)"], explanation: "One haploid male gamete (n) fuses with two haploid polar nuclei (2n) in the central cell to form a 3n triploid endosperm nucleus.", intent: "Application" } },
  { id: "c10-carbon-compounds", title: "Carbon & Its Compounds: Catenation, Homologous Series & Esterification", explanation: "Tetravalent carbon exhibits catenation. Consecutive members of a homologous series differ by a —CH₂— unit (14 u molecular mass). Carboxylic acids react with alcohols in the presence of concentrated H₂SO₄ to form sweet-smelling esters.", keywords: ["catenation", "homologous series", "esterification", "saponification", "alkane"], misconception: "Successive members of any homologous series always differ by —CH₂— (14 atomic mass units) and show a gradation in physical properties.", question: { prompt: "By what molecular unit and mass do two consecutive members of a homologous series (such as methane CH₄ and ethane C₂H₆) differ?", answer: "—CH₂— unit (14 u)", options: ["—CH₂— unit (14 u)", "—CH₃— unit (15 u)", "—C₂H₄— unit (28 u)", "—OH— unit (17 u)"], explanation: "Every successive homologue adds one carbon (12 u) and two hydrogens (2 u), making a —CH₂— difference of 14 u.", intent: "Recall" } },
  { id: "c10-ohms-magnetic", title: "Electricity & Ohm's Law: Series vs. Parallel Resistance & Joule's Heating", explanation: "By Ohm's Law, V = IR. Resistors in series add directly (Rs = R₁ + R₂), whereas in parallel 1/Rp = 1/R₁ + 1/R₂. Domestic circuits are wired in parallel so each appliance receives 220V and operates independently. Joule's heating is H = I²Rt.", keywords: ["Ohm's law", "parallel resistance", "Joule's law", "resistivity", "fuse"], misconception: "Resistivity (ρ) is an intrinsic property of the material and depends only on temperature—not on the length or cross-sectional area of the wire.", question: { prompt: "Two resistors of 6 Ω and 3 Ω are connected in parallel across a battery. What is their equivalent resistance Rp?", answer: "2 Ω", options: ["2 Ω", "9 Ω", "3 Ω", "4.5 Ω"], explanation: "1/Rp = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 ⇒ Rp = 2 Ω.", intent: "Application" } }
];

const mathsConceptsClass10CBSE: Concept[] = [
  { id: "c10-quadratics", title: "Quadratic Equations: Discriminant (D = b² − 4ac) & Nature of Roots", explanation: "For ax² + bx + c = 0 (a ≠ 0), the discriminant D = b² − 4ac determines the roots: D > 0 gives two distinct real roots; D = 0 gives two equal real roots (-b/2a); D < 0 gives no real roots.", keywords: ["discriminant", "quadratic", "equal roots", "real roots"], misconception: "When D = 0, the quadratic graph touches the x-axis at a single vertex point x = -b/(2a).", question: { prompt: "For what positive value of k does the quadratic equation 2x² + kx + 8 = 0 have two equal real roots?", answer: "k = 8", options: ["k = 8", "k = 4", "k = 16", "k = 64"], explanation: "For equal roots, D = b² − 4ac = 0 ⇒ k² − 4(2)(8) = 0 ⇒ k² = 64 ⇒ k = 8.", intent: "Application" } },
  { id: "c10-ap", title: "Arithmetic Progressions (AP): nth Term & Sum of n Terms", explanation: "In an AP with first term a and common difference d, the nth term is a_n = a + (n − 1)d and the sum of the first n terms is S_n = (n/2)[2a + (n − 1)d] = (n/2)(a + l).", keywords: ["arithmetic progression", "common difference", "nth term", "sum"], misconception: "The common difference d can be positive, negative, or zero, and a_n = S_n − S_(n−1).", question: { prompt: "What is the 15th term of the Arithmetic Progression 3, 8, 13, 18, ...?", answer: "73", options: ["73", "78", "68", "75"], explanation: "Here a = 3, d = 8 − 3 = 5. Thus a₁₅ = a + 14d = 3 + 14(5) = 3 + 70 = 73.", intent: "Application" } },
  { id: "c10-trigonometry", title: "Trigonometric Ratios, Complementary Identities & sin²θ + cos²θ = 1", explanation: "In a right-angled triangle, sin θ = Opposite/Hypotenuse, cos θ = Adjacent/Hypotenuse, tan θ = sin θ / cos θ. The three Pythagorean identities are sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, and 1 + cot²θ = cosec²θ.", keywords: ["trigonometry", "sec²θ", "tan²θ", "sin 30", "elevation"], misconception: "sec²θ − tan²θ = 1 (so (sec θ − tan θ) and (sec θ + tan θ) are reciprocals of each other).", question: { prompt: "If sec θ + tan θ = 4, what is the value of (sec θ − tan θ)?", answer: "1/4 (0.25)", options: ["1/4 (0.25)", "4", "1", "3"], explanation: "Since sec²θ − tan²θ = 1 ⇒ (sec θ + tan θ)(sec θ − tan θ) = 1 ⇒ 4(sec θ − tan θ) = 1 ⇒ sec θ − tan θ = 1/4.", intent: "Application" } },
  { id: "c10-triangles-thales", title: "Triangles: Basic Proportionality Theorem (Thales' Theorem) & Similarity", explanation: "By Thales' Basic Proportionality Theorem (BPT), a line drawn parallel to one side of a triangle divides the other two sides in the same ratio (AD/DB = AE/EC).", keywords: ["Thales theorem", "BPT", "similarity", "parallel"], misconception: "When comparing whole sides (AB and AC) with top segments, use AD/AB = AE/AC = DE/BC (not AD/DB = DE/BC).", question: { prompt: "In ΔABC, DE is parallel to BC. If AD = 3 cm, DB = 6 cm, and AE = 2 cm, what is the length of EC?", answer: "4 cm", options: ["4 cm", "3 cm", "6 cm", "9 cm"], explanation: "By Thales' Theorem (BPT), AD / DB = AE / EC ⇒ 3 / 6 = 2 / EC ⇒ EC = 4 cm.", intent: "Application" } },
  { id: "c10-circles-tangents", title: "Circles: Tangent-Radius Perpendicularity & External Point Tangents", explanation: "The tangent at any point of a circle is perpendicular (90°) to the radius through the point of contact, and the lengths of the two tangents drawn from an external point to a circle are always equal (PA = PB).", keywords: ["tangent", "radius", "perpendicular", "external point"], misconception: "The angle between two tangents from an external point P and the angle subtended by the radii at the centre O are supplementary (∠APB + ∠AOB = 180°).", question: { prompt: "Two tangents PA and PB are drawn from an external point P to a circle with centre O. If ∠APB = 70°, what is ∠AOB?", answer: "110°", options: ["110°", "70°", "90°", "55°"], explanation: "Since ∠OAP = ∠OBP = 90° in quadrilateral OAPB, ∠AOB + ∠APB = 180° ⇒ ∠AOB = 180° − 70° = 110°.", intent: "Application" } },
  { id: "c10-coordinate-dist", title: "Coordinate Geometry: Distance Formula, Section Formula & Centroid", explanation: "The distance between (x₁, y₁) and (x₂, y₂) is √[(x₂−x₁)² + (y₂−y₁)²]. The Section Formula for internal division in ratio m₁:m₂ is ((m₁x₂ + m₂x₁)/(m₁+m₂), (m₁y₂ + m₂y₁)/(m₁+m₂)).", keywords: ["distance formula", "section formula", "midpoint", "centroid"], misconception: "A point on the x-axis has coordinates (x, 0), whereas a point on the y-axis has coordinates (0, y).", question: { prompt: "What is the distance of the point P(3, -4) from the origin O(0, 0)?", answer: "5 units", options: ["5 units", "7 units", "1 unit", "25 units"], explanation: "Distance OP = √[(3 − 0)² + (-4 − 0)²] = √(9 + 16) = √25 = 5 units.", intent: "Application" } }
];

export const subjectCatalog: CurriculumSubject[] = [
  {
    slug: "science",
    name: "Science",
    house: "The Biology house",
    accent: "green",
    description: "Welcome to the neighbourhood of living things. Here, we revise how plants make their food, where they get nutrients from, and how they survive — all through games on Study Street.!",
    topic: "Plant Life",
    chapter: "Getting to know plants",
    chapters: ["Plant Life", "The Cell", "Human Body", "Health & Hygiene", "Adaptation"],
    source: { label: "NCERT Science Textbook · Foundations", chapter: "Living World", url: "https://www.ncert.nic.in/", board: "CBSE", grade: "6", subject: "Science", retrievedAt: "2026-09-30" },
    concepts: scienceConceptsClass6CBSE
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    house: "The Maths house",
    accent: "blue",
    description: "Welcome to the world of shapes and quantities. Here, we discover patterns, unlock fractions, and master logic — all through games on Study Street.!",
    topic: "Fractions & Decimals",
    chapter: "Knowing our numbers",
    chapters: ["Fractions & Decimals", "Integers", "Algebra", "Geometry", "Perimeter & Area"],
    source: { label: "NCERT Mathematics · Foundations", chapter: "Numbers & Geometry", url: "https://www.ncert.nic.in/", board: "CBSE", grade: "6", subject: "Mathematics", retrievedAt: "2026-10-10" },
    concepts: mathsConceptsClass6CBSE
  },
  {
    slug: "english",
    name: "English",
    house: "The English house",
    accent: "pink",
    description: "Welcome to the avenue of words and stories. Here, we build expressive grammar, vivid vocabulary, and confident reading — all through games on Study Street.!",
    topic: "Grammar & Vocabulary",
    chapter: "Sentences and words",
    chapters: ["Grammar & Vocabulary", "Parts of Speech", "Tenses", "Reading & Prose", "Creative Expression"],
    source: { label: "NCERT English · Foundations", chapter: "Grammar & Prose", url: "https://www.ncert.nic.in/", board: "CBSE", grade: "6", subject: "English", retrievedAt: "2026-10-10" },
    concepts: englishConceptsClass6CBSE
  },
  {
    slug: "social-science",
    name: "Social Science",
    house: "The History house",
    accent: "yellow",
    description: "Discover people, places and our past through stories on Study Street.!",
    topic: "Our Past",
    chapter: "What, Where, How and When?",
    chapters: ["Our Past", "Early Societies", "The Earth in Space", "Maps", "Local Government"],
    source: { label: "NCERT Social Science · Foundations", chapter: "Our Past", url: "https://www.ncert.nic.in/", board: "CBSE", grade: "6", subject: "Social Science", retrievedAt: "2026-10-10" },
    concepts: socialConceptsClass6CBSE
  }
];

function normalizeCatalogSlug(slug: string): string {
  const s = (slug || "").toLowerCase();
  if (s === "biology" || s === "bio") return "science";
  if (s === "maths" || s === "math") return "mathematics";
  if (s === "history" || s === "social") return "social-science";
  return s;
}

export function isIcseBoard(board?: string): boolean {
  const b = (board || "").trim().toUpperCase();
  return b === "ICSE" || b === "ISC" || b.includes("ICSE") || b.includes("CISCE");
}

export function getSubject(slug: string, grade?: string, board?: string): CurriculumSubject | undefined {
  const canon = normalizeCatalogSlug(slug);
  const base = subjectCatalog.find(s => s.slug === canon);
  if (!base) return undefined;

  const icse = isIcseBoard(board);
  const gradeNum = Number(grade || 6);
  const isClass5 = gradeNum <= 5;
  const isSenior12 = gradeNum >= 11;
  const isSecondary10 = gradeNum >= 8 && gradeNum <= 10;

  // ==========================================
  // SENIOR SECONDARY: CLASS 12 (AND CLASS 11)
  // ==========================================
  if (isSenior12) {
    if (icse) {
      if (canon === "science") {
        return {
          ...base,
          description: "ISC Class 12 Biology: Master C4 Kranz anatomy & photophosphorylation, nerve impulse action potentials (Na⁺/K⁺ pump), pBR322 blue-white screening, IgG (H₂L₂) immunity, gametogenesis, and Southern blot DNA fingerprinting!",
          topic: "Physiology, Molecular Genetics & Biotechnology (ISC Class 12)",
          chapter: "Photophosphorylation, Action Potential & rDNA Cloning (ISC Class 12)",
          chapters: ["Photosynthesis & Kranz Anatomy", "Neural Action Potential", "Recombinant DNA & pBR322", "Humoral Immunity (IgG)", "DNA Fingerprinting"],
          source: { label: "CISCE / ISC Class 12 Biology Syllabus", chapter: "Plant & Human Physiology + Biotechnology", url: "https://cisce.org/", board: "ICSE", grade: String(gradeNum), subject: "Biology", retrievedAt: "2026-11-02" },
          concepts: scienceConceptsClass12ICSE
        };
      }
      if (canon === "mathematics") {
        return {
          ...base,
          description: "ISC Class 12 Mathematics: Master L'Hôpital's Rule & Rolle's Theorem, Linear Differential Equations (Integrating Factor), Martin's Matrix Rule, Definite Integral Area Under Curves, Regression Lines, and Binomial Distribution!",
          topic: "Calculus, Differential Equations, Matrices & Regression (ISC Class 12)",
          chapter: "L'Hôpital's Rule, Differential Equations & Regression (ISC Class 12)",
          chapters: ["Limits & L'Hôpital's Rule", "Linear Differential Equations", "Matrices & Martin's Rule", "Area Under Curves", "Regression & Binomial Distribution"],
          source: { label: "CISCE / ISC Class 12 Mathematics Syllabus", chapter: "Calculus, Algebra & Statistics", url: "https://cisce.org/", board: "ICSE", grade: String(gradeNum), subject: "Mathematics", retrievedAt: "2026-11-02" },
          concepts: mathsConceptsClass12ICSE
        };
      }
      if (canon === "english") {
        return {
          ...base,
          description: "ISC Class 12 English (Paper 1 & Paper 2): Master Shakespearean tragedy ('Macbeth' hamartia & dramatic irony), negative adverbial inversion ('No sooner...than'), 'lest...should', precision phrasal collocations, and Proposal/Précis writing!",
          topic: "Shakespearean Criticism, Structural Transformation & Proposal Writing (ISC 12)",
          chapter: "Macbeth, Adverbial Inversion, Phrasal Collocations & Proposals (ISC Class 12)",
          chapters: ["Shakespeare's Macbeth", "Structural Transformations", "Prepositional Collocations", "Proposal & Précis Writing", "Poetic Criticism (Caesura & Enjambment)"],
          source: { label: "CISCE / ISC Class 12 English Syllabus", chapter: "Language Paper 1 & Literature Paper 2", url: "https://cisce.org/", board: "ICSE", grade: String(gradeNum), subject: "English", retrievedAt: "2026-11-02" },
          concepts: englishConceptsClass12ICSE
        };
      }
      if (canon === "social-science") {
        return {
          ...base,
          description: "ISC Class 12 History & Political Science: Analyse the 1946 Cabinet Mission & Mountbatten Plan, Operation Polo & 1956 States Reorganisation, Cold War Détente & Gorbachev's Reforms, Anti-Apartheid (Rivonia Trial), and the Basic Structure Doctrine (Kesavananda Bharati 1973)!",
          topic: "Modern Indian Polity, Cold War & Constitutional Landmark Rulings (ISC Class 12)",
          chapter: "Cabinet Mission, Cold War Détente & Basic Structure Doctrine (ISC Class 12)",
          chapters: ["Transfer of Power (1946–47)", "Integration & Linguistic States", "Cold War & Détente", "Anti-Apartheid Movement", "Kesavananda Bharati & 44th Amendment"],
          source: { label: "CISCE / ISC Class 12 History & Political Science", chapter: "Contemporary World & Indian Democracy", url: "https://cisce.org/", board: "ICSE", grade: String(gradeNum), subject: "History & Political Science", retrievedAt: "2026-11-02" },
          concepts: socialConceptsClass12ICSE
        };
      }
    }

    // CBSE Class 12 (NCERT Senior Secondary)
    if (canon === "science") {
      return {
        ...base,
        description: "NCERT CBSE Class 12 Biology: Master semi-conservative DNA replication & Chargaff's Rule, Lac Operon transcriptional control, Mendelian dihybrid linkage, PCR & restriction enzymes (EcoRI), Hardy-Weinberg equilibrium (2pq), and Lindeman's 10% energy law!",
        topic: "Molecular Inheritance, Genetics, Biotech & Ecology (NCERT Class 12)",
        chapter: "Molecular Basis of Inheritance, Biotechnology & Ecology (NCERT CBSE 12)",
        chapters: ["DNA Replication & Chargaff's Rule", "Lac Operon Gene Regulation", "Dihybrid Cross & Linkage", "PCR & Recombinant DNA", "Hardy-Weinberg & Ecosystems"],
        source: { label: "NCERT Class 12 Biology · Senior Secondary", chapter: "Genetics, Biotechnology & Ecology", url: "https://www.ncert.nic.in/", board: "CBSE", grade: String(gradeNum), subject: "Biology", retrievedAt: "2026-11-02" },
        concepts: scienceConceptsClass12CBSE
      };
    }
    if (canon === "mathematics") {
      return {
        ...base,
        description: "NCERT CBSE Class 12 Mathematics: Master Chain Rule differentiability, Second Derivative Maxima/Minima, Definite Integrals of odd/even functions, Matrix Adjoint Determinants |adj(A)| = |A|^(n-1), 3D Vector Orthogonality, and Bayes' Conditional Probability!",
        topic: "Calculus, Matrices, 3D Vectors & Probability (NCERT Class 12)",
        chapter: "Calculus, Matrices, 3D Vectors & Bayes' Theorem (NCERT CBSE 12)",
        chapters: ["Differentiability & Chain Rule", "Maxima & Minima", "Definite Integrals", "Matrices & Determinants", "3D Vectors & Bayes' Probability"],
        source: { label: "NCERT Class 12 Mathematics · Senior Secondary", chapter: "Calculus, Linear Algebra & Probability", url: "https://www.ncert.nic.in/", board: "CBSE", grade: String(gradeNum), subject: "Mathematics", retrievedAt: "2026-11-02" },
        concepts: mathsConceptsClass12CBSE
      };
    }
    if (canon === "english") {
      return {
        ...base,
        description: "NCERT CBSE Class 12 English Core (Flamingo & Vistas): Master Transferred Epithets & Paradox in poetry, Dramatic & Situational Irony, Nominative Absolute clause synthesis, Inverted Third Conditionals ('Had I known...'), and Formal Editorial Register!",
        topic: "Flamingo Poetics, Clause Synthesis & Advanced Rhetoric (NCERT Class 12)",
        chapter: "Poetic Devices, Nominative Absolute & Inverted Conditionals (NCERT CBSE 12)",
        chapters: ["Transferred Epithet & Synecdoche", "Irony & Satire in Prose", "Nominative Absolute Synthesis", "Inverted Conditionals", "Academic Register & Paradox"],
        source: { label: "NCERT Class 12 English Core · Flamingo & Vistas", chapter: "Advanced Rhetoric & Literary Criticism", url: "https://www.ncert.nic.in/", board: "CBSE", grade: String(gradeNum), subject: "English", retrievedAt: "2026-11-02" },
        concepts: englishConceptsClass12CBSE
      };
    }
    if (canon === "social-science") {
      return {
        ...base,
        description: "NCERT CBSE Class 12 History (Themes in Indian History I–III): Analyse Wheeler's Harappan stratigraphy, James Prinsep's Brahmi epigraphy, Basavanna's Virashaiva movement, Krishnadeva Raya's Vijayanagara, the 1857 Awadh annexation, and Nehru's Objectives Resolution!",
        topic: "Themes in Indian History & Framing the Constitution (NCERT Class 12)",
        chapter: "Harappan Stratigraphy, Epigraphy, Vijayanagara & 1857 Revolt (NCERT CBSE 12)",
        chapters: ["Bricks, Beads & Bones", "Kings, Farmers & Brahmi Epigraphy", "Bhakti-Sufi Traditions", "Vijayanagara (Amara-Nayakas)", "1857 Revolt & Constituent Assembly"],
        source: { label: "NCERT Class 12 History · Themes in Indian History", chapter: "Ancient, Medieval & Modern Constitutional Themes", url: "https://www.ncert.nic.in/", board: "CBSE", grade: String(gradeNum), subject: "History & Polity", retrievedAt: "2026-11-02" },
        concepts: socialConceptsClass12CBSE
      };
    }
  }

  // ==========================================
  // SECONDARY BOARD: CLASS 10 (AND CLASS 8–10)
  // ==========================================
  if (isSecondary10) {
    if (canon === "science") {
      return {
        ...base,
        description: `${icse ? "ICSE" : "NCERT CBSE"} Class ${gradeNum} Science/Biology: Master human double circulation & nephron ultrafiltration, reflex arcs & auxin phototropism, Mendelian monohybrid (1:2:1) genetics, angiosperm double fertilisation (3n), homologous carbon series, and Ohm's Law!`,
        topic: `Life Processes, Genetics, Carbon & Electricity (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        chapter: `Life Processes, Control, Heredity & Ohm's Law (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        chapters: ["Double Circulation & Nephrons", "Auxin & Reflex Arc", "Mendelian Heredity (1:2:1)", "Double Fertilisation (3n)", "Carbon & Ohm's Law"],
        source: { label: `${icse ? "CISCE ICSE" : "NCERT CBSE"} Class ${gradeNum} Science`, chapter: "Board Foundation Science", url: icse ? "https://cisce.org/" : "https://www.ncert.nic.in/", board: icse ? "ICSE" : "CBSE", grade: String(gradeNum), subject: "Science", retrievedAt: "2026-11-02" },
        concepts: scienceConceptsClass10CBSE
      };
    }
    if (canon === "mathematics") {
      return {
        ...base,
        description: `${icse ? "ICSE" : "NCERT CBSE"} Class ${gradeNum} Mathematics: Master Quadratic Discriminants (b² − 4ac), Arithmetic Progressions (nth term & sum), Trigonometric Identities (sec²θ − tan²θ = 1), Thales' Basic Proportionality Theorem, Circle Tangents, and Coordinate Distance!`,
        topic: `Quadratics, AP, Trigonometry & Circle Tangents (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        chapter: `Quadratics, AP, Trigonometry & Thales' Theorem (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        chapters: ["Quadratic Discriminant", "Arithmetic Progressions", "Trigonometric Identities", "Thales' Theorem (BPT)", "Circle Tangents & Coordinate Geometry"],
        source: { label: `${icse ? "CISCE ICSE" : "NCERT CBSE"} Class ${gradeNum} Mathematics`, chapter: "Algebra, Trigonometry & Geometry", url: icse ? "https://cisce.org/" : "https://www.ncert.nic.in/", board: icse ? "ICSE" : "CBSE", grade: String(gradeNum), subject: "Mathematics", retrievedAt: "2026-11-02" },
        concepts: mathsConceptsClass10CBSE
      };
    }
    if (canon === "english") {
      return {
        ...base,
        description: `${icse ? "ICSE" : "NCERT CBSE"} Class ${gradeNum} English: Master Active/Passive Voice transformations, Reported Speech tense shifts, Subordinate Clauses, Subject-Verb Concord, Poetic Figures of Speech, and Contextual Phrasal Verbs!`,
        topic: `Applied Grammar, Clauses & Literary Devices (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        chapter: `Voice, Reported Speech, Clauses & Figures of Speech (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        concepts: englishConceptsClass6ICSE
      };
    }
    if (canon === "social-science") {
      return {
        ...base,
        description: `${icse ? "ICSE" : "NCERT CBSE"} Class ${gradeNum} History & Civics: Explore Indian Nationalism, 1857 First War of Independence, Constitutional Framing, Federalism, and Local Self-Government!`,
        topic: `Nationalism, Constitution & Democratic Polity (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        chapter: `National Movement, Constitution & Three-Tier Civics (Class ${gradeNum} ${icse ? "ICSE" : "CBSE"})`,
        concepts: icse ? socialConceptsClass12ICSE : socialConceptsClass12CBSE
      };
    }
  }

  // ==========================================
  // JUNIOR / MIDDLE SCHOOL: CLASS 5 & CLASS 6
  // ==========================================
  if (icse) {
    if (isClass5) {
      if (canon === "science") {
        return {
          ...base,
          description: "CISCE Class 5 Biology & Science: Explore the human circulatory and skeletal systems, floral whorls, vegetative propagation, food chains, and balanced nutrition through street games!",
          topic: "Human Body Systems & Plant Reproduction",
          chapter: "Circulatory System, Joints & Floral Whorls (ICSE)",
          chapters: ["Circulatory System", "Skeletal Joints", "Pollination & Whorls", "Vegetative Propagation", "Interdependence"],
          source: { label: "CISCE / ICSE Science Curriculum · Class 5", chapter: "Human Body & Plant Life", url: "https://cisce.org/", board: "ICSE", grade: "5", subject: "Science", retrievedAt: "2026-10-28" },
          concepts: scienceConceptsClass5ICSE
        };
      }
      if (canon === "mathematics") {
        return {
          ...base,
          description: "CISCE Class 5 Mathematics: Master HCF & LCM by prime factorisation, unitary method, speed-distance-time, percentages, BODMAS, and 3D volume through street games!",
          topic: "HCF/LCM, Unitary Method & Percentages",
          chapter: "HCF, Unitary Method, Percentages & Volume (ICSE)",
          chapters: ["HCF & LCM", "Unitary Method & Speed", "Percentages", "BODMAS & Fractions", "Triangles & Volume"],
          source: { label: "CISCE / ICSE Mathematics · Class 5", chapter: "Commercial & Geometric Maths", url: "https://cisce.org/", board: "ICSE", grade: "5", subject: "Mathematics", retrievedAt: "2026-10-28" },
          concepts: mathsConceptsClass5ICSE
        };
      }
      if (canon === "english") {
        return {
          ...base,
          description: "CISCE Class 5 English Language: Build structural grammar with abstract & collective nouns, degrees of comparison, transitive/intransitive verbs, and correlative conjunctions!",
          topic: "Structural Grammar & Word Craft",
          chapter: "Nouns, Degrees of Comparison & Transitive Verbs (ICSE)",
          chapters: ["Abstract & Collective Nouns", "Degrees of Comparison", "Transitive Verbs", "Adverbs", "Conjunctions & Affixes"],
          source: { label: "CISCE / ICSE English Language · Class 5", chapter: "Structural Grammar", url: "https://cisce.org/", board: "ICSE", grade: "5", subject: "English", retrievedAt: "2026-10-28" },
          concepts: englishConceptsClass5ICSE
        };
      }
      if (canon === "social-science") {
        return {
          ...base,
          description: "CISCE Class 5 Social Studies: Explore the Indian Constitution, Fundamental Rights, Stone-to-Iron Age evolution, latitudes/longitudes, and Earth's heat zones!",
          topic: "Constitution, Heat Zones & Early Humans",
          chapter: "The Constitution, Latitudes & Stone-to-Iron Age (ICSE)",
          chapters: ["Indian Constitution", "Latitudes & Longitudes", "Heat Zones of Earth", "Stone to Iron Age", "Organs of Government"],
          source: { label: "CISCE / ICSE Social Studies · Class 5", chapter: "Civics & World Geography", url: "https://cisce.org/", board: "ICSE", grade: "5", subject: "Social Science", retrievedAt: "2026-10-28" },
          concepts: socialConceptsClass5ICSE
        };
      }
    }

    // ICSE Class 6 (Default ICSE)
    if (canon === "science") {
      return {
        ...base,
        description: "CISCE Class 6 Biology: Dive deep into cell structure (cell wall, plastids, vacuoles), simple vs. compound leaves & phyllotaxy, the four whorls of a bisexual flower, pollination, and epigeal/hypogeal seed germination!",
        topic: "The Cell & Plant Life (CISCE Biology)",
        chapter: "Cell Structure, Floral Whorls & Germination (ICSE)",
        chapters: ["The Cell: Unit of Life", "Plastids & Organelles", "Leaf Phyllotaxy & Modifications", "Four Floral Whorls", "Pollination & Germination"],
        source: { label: "CISCE / ICSE Biology Syllabus · Class 6", chapter: "The Cell & Plant Life", url: "https://cisce.org/", board: "ICSE", grade: "6", subject: "Biology (Science)", retrievedAt: "2026-10-28" },
        concepts: scienceConceptsClass6ICSE
      };
    }
    if (canon === "mathematics") {
      return {
        ...base,
        description: "CISCE Class 6 Mathematics: Master Set Theory (roster form & cardinality), Ratio & Proportion, Commercial Maths (Profit, Loss & %), Polynomial degrees, Parallel-line transversals, and Circle geometry!",
        topic: "Sets, Commercial Maths & Geometry (CISCE)",
        chapter: "Set Theory, Ratio, Profit/Loss & Circle Elements (ICSE)",
        chapters: ["Set Theory & Cardinality", "Ratio & Proportion", "Percentages & Profit/Loss", "Polynomials & Algebra", "Transversals & Circle Chords"],
        source: { label: "CISCE / ICSE Mathematics Syllabus · Class 6", chapter: "Sets, Commercial Arithmetic & Geometry", url: "https://cisce.org/", board: "ICSE", grade: "6", subject: "Mathematics", retrievedAt: "2026-10-28" },
        concepts: mathsConceptsClass6ICSE
      };
    }
    if (canon === "english") {
      return {
        ...base,
        description: "CISCE Class 6 English Language & Literature: Master Active & Passive Voice transformation, Direct & Indirect Speech, Main vs. Subordinate Clauses, Subject-Verb Concord, and Literary Figures of Speech!",
        topic: "Applied Grammar, Voice, Speech & Literary Devices (CISCE)",
        chapter: "Active/Passive Voice, Reported Speech & Clauses (ICSE)",
        chapters: ["Active & Passive Voice", "Direct & Indirect Speech", "Main & Subordinate Clauses", "Subject-Verb Concord", "Figures of Speech & Idioms"],
        source: { label: "CISCE / ICSE English Syllabus · Class 6", chapter: "Applied Grammar & Literary Appreciation", url: "https://cisce.org/", board: "ICSE", grade: "6", subject: "English", retrievedAt: "2026-10-28" },
        concepts: englishConceptsClass6ICSE
      };
    }
    if (canon === "social-science") {
      return {
        ...base,
        description: "CISCE Class 6 History & Civics: Explore Mesopotamian Ziggurats & Egyptian Pyramids, the Lothal Dockyard, Early & Later Vedic Assemblies (Sabha & Samiti), Jainism & Buddhism, the Gupta Golden Age, and Zila Parishad Civics!",
        topic: "River Valley Civilisations, Vedic Age & Local Civics (CISCE)",
        chapter: "Mesopotamia, Vedic Period, Buddhism & Zila Parishad (ICSE)",
        chapters: ["Mesopotamian & Egyptian Civilisations", "Indus Valley & Lothal Dockyard", "Early & Later Vedic Period", "Jainism & Buddhism", "Gupta Empire & Local Self-Government"],
        source: { label: "CISCE / ICSE History & Civics Syllabus · Class 6", chapter: "Ancient Civilisations & Local Self-Government", url: "https://cisce.org/", board: "ICSE", grade: "6", subject: "History & Civics", retrievedAt: "2026-10-28" },
        concepts: socialConceptsClass6ICSE
      };
    }
  }

  // CBSE Class 5
  if (isClass5) {
    if (canon === "science") return { ...base, concepts: scienceConceptsClass5CBSE, topic: "Seeds & Green Leaves", chapter: "Super Senses & Seeds (NCERT EVS)" };
    if (canon === "mathematics") return { ...base, concepts: mathsConceptsClass5CBSE, topic: "Numbers & Shapes", chapter: "Halves, Angles & Patterns (NCERT Math-Magic)" };
    if (canon === "english") return { ...base, concepts: englishConceptsClass5CBSE, topic: "Grammar & Stories", chapter: "Words & Rhymes (NCERT Marigold)" };
  }

  // Default: CBSE Class 6
  return {
    ...base,
    chapter:
      canon === "science"
        ? "Getting to Know Plants (NCERT CBSE)"
        : canon === "mathematics"
          ? "Knowing Our Numbers, Fractions & Mensuration (NCERT CBSE)"
          : canon === "english"
            ? "Sentences, Parts of Speech & Honeysuckle Grammar (NCERT CBSE)"
            : "What, Where, How and When? & Panchayati Raj (NCERT CBSE)"
  };
}

export function subjectForName(name: string, grade?: string, board?: string): CurriculumSubject | undefined {
  const sub = subjectCatalog.find(s => s.name.toLowerCase() === name.toLowerCase());
  return sub ? getSubject(sub.slug, grade, board) : undefined;
}

export function hasGroundedContent(learner: { board: string; grade: string } | null, subject: CurriculumSubject): boolean {
  return subject.concepts && subject.concepts.length > 0;
}

export interface ConceptStoneView {
  id: string;
  stoneNumber: number;
  title: string;
  summary: string;
  keyFacts: string[];
}

export interface ChapterView {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  concepts: ConceptStoneView[];
}

export interface SubjectHouseView {
  id: string;
  slug: string;
  name: string;
  houseName: string;
  signpostLabel: string;
  syllabusTag: string;
  tagline: string;
  description: string;
  color: string;
  accentColor: string;
  chapters: ChapterView[];
}

export const STREET_GAMES = [
  { slug: "catch-catch", title: "Catch-Catch", icon: "🏃", color: "#EEF4D4" },
  { slug: "cops-and-robbers", title: "Cops & Robbers", icon: "👮", color: "#FFE0C2" },
  { slug: "simon-says", title: "Simon Says", icon: "🗣️", color: "#E2ECF7" },
  { slug: "king", title: "Rotating King", icon: "👑", color: "#FFF3B0" },
  { slug: "hide-and-seek", title: "Hide & Seek", icon: "🙈", color: "#FCE8EE" }
];

const SUBJECT_UI_META_CBSE: Record<
  string,
  { id: string; houseName: string; signpostLabel: string; tagline: string; color: string; accentColor: string }
> = {
  science: {
    id: "biology",
    houseName: "The Biology House",
    signpostLabel: "BIOLOGY HOUSE = SCIENCE (PLANTS, CELLS & GENETICS)",
    tagline: "NCERT Science & Biology: Living plants, cells, genetics & ecosystems",
    color: "#D8E0AE",
    accentColor: "#606F1B"
  },
  mathematics: {
    id: "maths",
    houseName: "The Maths House",
    signpostLabel: "MATHS HOUSE = NUMBERS, ALGEBRA, GEOMETRY & CALCULUS",
    tagline: "NCERT Mathematics: Numbers, algebra, geometry & calculus",
    color: "#FFE0C2",
    accentColor: "#BA5E08"
  },
  english: {
    id: "english",
    houseName: "The English House",
    signpostLabel: "ENGLISH HOUSE = GRAMMAR, VOCABULARY, PROSE & POETICS",
    tagline: "NCERT English: Grammar, clauses, poetic devices & comprehension",
    color: "#D5E3F0",
    accentColor: "#285888"
  },
  "social-science": {
    id: "history",
    houseName: "The History House",
    signpostLabel: "HISTORY HOUSE = CIVILISATIONS, POLITY & CIVICS",
    tagline: "NCERT Social Science: Ancient cities, epigraphy, constitution & civics",
    color: "#F3DFC8",
    accentColor: "#8A4B18"
  }
};

const SUBJECT_UI_META_ICSE: Record<
  string,
  { id: string; houseName: string; signpostLabel: string; tagline: string; color: string; accentColor: string }
> = {
  science: {
    id: "biology",
    houseName: "The Biology House",
    signpostLabel: "BIOLOGY HOUSE = CISCE BIOLOGY (CELLS, PHYSIOLOGY & BIOTECH)",
    tagline: "CISCE Biology: Cell organelles, floral whorls, physiology & biotech",
    color: "#D8E0AE",
    accentColor: "#606F1B"
  },
  mathematics: {
    id: "maths",
    houseName: "The Maths House",
    signpostLabel: "MATHS HOUSE = CISCE MATHS (SETS, COMMERCIAL, GEOMETRY & CALCULUS)",
    tagline: "CISCE Maths: Set theory, profit & loss, polynomials & calculus",
    color: "#FFE0C2",
    accentColor: "#BA5E08"
  },
  english: {
    id: "english",
    houseName: "The English House",
    signpostLabel: "ENGLISH HOUSE = CISCE LANGUAGE & LITERATURE (VOICE, CLAUSES & DRAMA)",
    tagline: "CISCE English: Active/passive voice, transformation, clauses & literature",
    color: "#D5E3F0",
    accentColor: "#285888"
  },
  "social-science": {
    id: "history",
    houseName: "The History House",
    signpostLabel: "HISTORY HOUSE = CISCE HISTORY, WORLD AFFAIRS & CIVICS",
    tagline: "CISCE History & Civics: Civilisations, Vedic Sabha, world history & judiciary",
    color: "#F3DFC8",
    accentColor: "#8A4B18"
  }
};

export function getSubjectsForClass(classLevel: number | string = 6, board: string = "CBSE"): SubjectHouseView[] {
  const gradeStr = String(classLevel || 6);
  const gradeNum = Number(classLevel || 6);
  const icse = isIcseBoard(board);
  const boardLabel = icse ? (gradeNum >= 11 ? "ISC (CISCE)" : "ICSE (CISCE)") : "CBSE (NCERT)";
  const metaMap = icse ? SUBJECT_UI_META_ICSE : SUBJECT_UI_META_CBSE;

  return subjectCatalog.map(raw => {
    const adapted = getSubject(raw.slug, gradeStr, board) || raw;
    const meta = metaMap[raw.slug] || metaMap.science;
    const stoneViews: ConceptStoneView[] = adapted.concepts.slice(0, 6).map((c, idx) => ({
      id: c.id,
      stoneNumber: idx + 1,
      title: c.title,
      summary: c.explanation,
      keyFacts: [
        c.explanation,
        c.question.explanation,
        `Watch out for the common mix-up: ${c.misconception}`
      ]
    }));

    return {
      id: meta.id,
      slug: raw.slug,
      name: raw.name,
      houseName: meta.houseName,
      signpostLabel: meta.signpostLabel,
      syllabusTag: `Class ${gradeStr} • ${boardLabel}`,
      tagline: adapted.topic ? `${boardLabel} • ${adapted.topic}` : meta.tagline,
      description: adapted.description,
      color: meta.color,
      accentColor: meta.accentColor,
      chapters: [
        {
          id: `${meta.id}-ch-1`,
          number: 1,
          title: adapted.chapter || adapted.topic || "Core Chapter",
          subtitle: `${stoneViews.length} Hopscotch Concept Stones • Class ${gradeStr} ${boardLabel}`,
          concepts: stoneViews
        }
      ]
    };
  });
}

export function getSubjectById(classLevel: number | string, idOrSlug: string, board: string = "CBSE"): SubjectHouseView | undefined {
  const list = getSubjectsForClass(classLevel, board);
  const target = (idOrSlug || "").toLowerCase();
  return list.find(
    s =>
      s.id === target ||
      s.slug === target ||
      (target === "mathematics" && s.id === "maths") ||
      (target === "science" && s.id === "biology") ||
      (target === "social-science" && s.id === "history")
  );
}
