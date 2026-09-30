"use client";
import { useState } from "react";
const choices=["ROCK","PAPER","SCISSORS"];
export default function RockPaperScissors({award,next}:any){
 const [pick,setPick]=useState<string|null>(null);
 const choose=(x:string)=>{setPick(x);award(100);setTimeout(next,700)};
 return <section className="game-shell rps-shell"><div className="game-intro"><div className="ghost-title game-ghost">Rock Paper Scissors</div><h1>Make the concept battle.</h1><p>Choose an action to test your recall.</p></div><div className="rps-arena">{choices.map((x,i)=><button key={x} className={`rps ${pick===x?"picked":""}`} onClick={()=>choose(x)}><span>{["✊","✋","✌️"][i]}</span>{x}</button>)}</div></section>
}