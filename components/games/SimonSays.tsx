"use client";
import { useState } from "react";
const actions=[["ROOTS ABSORB WATER","DO IT",true],["LEAVES ABSORB WATER","DON'T DO IT",false],["STOMATA ARE FOUND IN LEAVES","DO IT",true],["ROOTS MAKE FOOD","DON'T DO IT",false]];
export default function SimonSays({round,award,next}:any){
 const [step,setStep]=useState(0); const [done,setDone]=useState(false); const [feedback,setFeedback]=useState("");
 const [statement,action,truth]=actions[(round+step)%actions.length];
 const choose=(yes:boolean)=>{const ok=yes===truth;setFeedback(ok?"Correct!":"Watch the statement.");if(ok)award(50);setDone(true);setTimeout(()=>{setDone(false);setFeedback("");setStep(s=>s+1);},700)};
 return <section className="game-shell simon-shell"><div className="game-intro"><div className="ghost-title game-ghost">It&apos;s Simon Says!</div><h1>Follow the steps. But watch out for the fake one!</h1><p>{statement}</p><div className="game-meta"><span>◷ 5 mins</span><span>10 QUESTIONS</span></div></div><div className="simon-actions"><button disabled={done} onClick={()=>choose(true)}>DO IT</button><button disabled={done} onClick={()=>choose(false)}>DON&apos;T DO IT</button></div><div className="feedback">{feedback}</div></section>
}