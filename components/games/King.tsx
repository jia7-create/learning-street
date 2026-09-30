"use client";
import { useState } from "react";
const topics=["Roots","Photosynthesis","Leaves","Water transport"];
export default function King({award,next}:any){
 const [selected,setSelected]=useState<string|null>(null);
 const choose=(t:string)=>{setSelected(t);award(100);setTimeout(next,700)};
 return <section className="game-shell king-shell"><div className="game-intro"><div className="ghost-title game-ghost">KING</div><h1>Challenge a weak topic.</h1><p>Pick a concept you want to conquer.</p></div><div className="king-grid">{topics.map((t,i)=><button key={t} className={`king-card ${selected===t?"selected":""}`} onClick={()=>choose(t)}><span>LEVEL {i+1}</span><strong>{t}</strong><em>{20+i*7}% mastery</em></button>)}</div></section>
}