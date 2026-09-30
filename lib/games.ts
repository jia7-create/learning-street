export type GameConfig = {
  slug: string; number: string; name: string; purpose: string; time: string;
};
export const games: GameConfig[] = [
 {slug:"catch-catch",number:"01",name:"Catch-Catch",purpose:"Catch the correct concept before it gets away.",time:"5 mins"},
 {slug:"cops-robbers",number:"02",name:"Cops & Robbers",purpose:"Identify what is wrong before the robber runs away.",time:"5 mins"},
 {slug:"hide-seek",number:"03",name:"Hide & Seek",purpose:"Find the concept hidden around Study Street.",time:"5 mins"},
 {slug:"king",number:"04",name:"King",purpose:"Challenge a concept you need to strengthen.",time:"5 mins"},
 {slug:"simon-says",number:"05",name:"Simon Says",purpose:"Follow the action only when the statement is true.",time:"5 mins"},
 {slug:"rock-paper-scissors",number:"06",name:"Rock Paper Scissors",purpose:"Turn concepts into an action battle.",time:"5 mins"}
];