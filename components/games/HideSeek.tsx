"use client";
import { useState } from "react";
import { questionFor } from "@/lib/questions";
export default function HideSeek({round,award,next}:any){
 const q=questionFor(round); const [found,setFound]=useState(false);
 const find=(a:string)=>{setFound(true); if(a===q.answer) award(100); setTimeout(next,700)};
 return <section className="game-shell"><div className="game-intro"><div className="ghost-title game-ghost">Hide & Seek</div><h1>Find the concept.</h1><p>Find: <b>{q.answer}</b></p></div><div className="seek-board">{q.options.map((a:string,i:number)=><button key={a} className={`concept-card ${found?"found":""}`} onClick={()=>find(a)} style={{transform:`translate(${i*10}px,${(i%2)*35}px) rotate(${i%2?3:-3}deg)`}}>{a}</button>)}</div></section>
}