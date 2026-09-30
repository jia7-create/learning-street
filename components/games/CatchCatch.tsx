"use client";
import { useEffect, useState } from "react";
import { questionFor } from "@/lib/questions";

export default function CatchCatch({ round, award, next }: any) {
  const q = questionFor(round);
  const [speed, setSpeed] = useState(1);
  const [caught, setCaught] = useState<string | null>(null);
  useEffect(() => { setSpeed(1); setCaught(null); const t=setInterval(()=>setSpeed(s=>Math.min(3,s+1)),2500); return()=>clearInterval(t)},[round]);
  const catchAnswer=(a:string)=>{setCaught(a); if(a===q.answer) award(100); setTimeout(next,700)};
  return <section className="game-shell catch-shell">
    <div className="game-intro"><div className="ghost-title game-ghost">Catch-Catch</div><h1>Catch the correct answer!</h1><p>{q.prompt}</p><span className="speed">SPEED ×{speed}</span></div>
    <div className="runway">
      {q.options.map((a:string,i:number)=><button key={a} className={`runner runner-${i} ${caught===a?"caught":""}`} style={{animationDuration:`${8/speed}s`}} onClick={()=>catchAnswer(a)}>{a}</button>)}
    </div>
  </section>
}