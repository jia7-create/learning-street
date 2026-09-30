"use client";
import { useState } from "react";
import { questionFor } from "@/lib/questions";
export default function CopsRobbers({round,award,next}:any){
 const q=questionFor(round); const [caught,setCaught]=useState(false);
 const choose=(a:string)=>{setCaught(true); if(a!==q.answer) award(100); setTimeout(next,700)};
 return <section className="game-shell chase-shell"><div className="game-intro"><div className="ghost-title game-ghost">It&apos;s cops vs Robbers</div><h1>Catch what&apos;s wrong before the robber runs away.</h1><p>{q.prompt}</p></div><div className="chase-stage">{q.options.map((a:string,i:number)=><button key={a} className={`chase-card ${caught?"caught":""}`} onClick={()=>choose(a)} style={{left:`${15+i*30}%`}}><span className="cop">COP</span><strong>{a}</strong><span className="robber">🏃</span></button>)}</div></section>
}