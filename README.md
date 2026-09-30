# Learning Street

An interactive revision app built with Next.js, React and TypeScript. The screens follow the connected Learning Street Figma direction: a clean white street, black rounded navigation, soft blue progress areas and pastel subject houses.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production build, run `npm run build` and then `npm start`.

## Student journey

- `/` Welcome screen. First-time learners continue to onboarding.
- `/onboarding` collects name, grade, board, subjects and preferred language.
- `/hub` shows clickable subject houses, recent recall activity and a revision recommendation.
- `/subjects` lists selected subjects; `/subjects/[subject]` opens a house and its concept hopscotch.
- `/games` lists six revision mechanics; `/games/[game]` records answers, correctness, response time, difficulty and game type.
- `/progress` displays mastery, concepts strengthened, activity and recent answers.
- `/ai-aunty` answers from the source-linked concepts included in the app.

Learner profile and attempts are saved in this browser's local storage. This version does not sync between devices or use an external database.

## Seeded curriculum

The only imported question set is **CBSE Class 6 Science — Getting to Know Plants**, linked to the NCERT chapter PDF. It appears only when the learner selects CBSE, Class 6 and Science. Other boards, grades and subjects remain available as houses, but show a clear message until approved source material is added. The app does not invent a syllabus for them.

Mastery uses correctness, recent successful recall and repeated attempts. A concept counts as strengthened at 65% mastery. The power-line markers show how many concepts remain; hopscotch shows progress made.

## Current integration boundaries

- AI Aunty is a local, curriculum-grounded topic helper, not a connected language model.
- Browser storage is suitable for a prototype, not production student accounts or cross-device progress.
- Curriculum ingestion, uploaded materials and additional source-backed question sets still need a server-side pipeline and content review.
- The Figma asset download endpoint rejected direct downloads from this environment, so the house/street art is a CSS-built stand-in. The layout and color treatment follow the Figma screenshots; replace the isolated `HouseArt` component with the exported Figma illustrations when the assets can be exported from the file.

## Deploy

For a preview, push this folder to a Git repository and import it into Vercel as a Next.js project. No environment variables are needed for the local-storage prototype. Use the production build command `npm run build` and output defaults. Before inviting students to use it, connect authentication, server-side progress storage, reviewed curriculum ingestion and a real AI service with curriculum retrieval.
