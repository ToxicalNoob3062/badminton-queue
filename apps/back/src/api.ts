import { Elysia , t} from "elysia";
import { DateTime } from "luxon";
import TimingService from "./timing";

type Player = {
  id: string;
  name: string;
  stamp: string;
};

export const api = new Elysia({
  name: "Badminton Queue API",
  prefix: "/api",
})
.decorate('timingService', TimingService)
.state("db",{
  past: [] as string[],
  players: [] as Player[],
  complaints: [] as string[],
  startTime: "3:00 PM"
})
.derive(async ()=>{
  return {
    stamp: DateTime.now().setZone('America/Toronto').toFormat('h:mm a')
  }
})
.onBeforeHandle(async ({store,stamp,timingService,status})=>{
  const [day,month,year] = DateTime.now().setZone('America/Toronto').toFormat('dd MMM yyyy').split(' ');
  const [pDay, pMonth] = store.db.past;
  if (month!==pMonth){
    store.db.complaints = [];
  }
  if (day !== pDay){
    store.db.past = [day,month,year];
    store.db.players = [];
  }
  if (timingService.compareTimes(store.db.startTime,stamp)<0){
    return status(403,{message: "Participation starts at 3:00 pm"});
  }
})
.get("/health",async () => {
  return {status: "ok"};
})
.get("/players",async ({store}) => {
  return store.db.players;
})
.post("/join", async ({body,store,status,stamp})=>{
  const player = {
    id: body.id,
    name: body.name,
    stamp,
  } as Player;
  store.db.players.push(player);
  return status(201,{message: "Player joined successfully"});
},{
  body:t.Object({
    id: t.String(),
    name: t.String(),
  }),
})
.post("/complain", async ({body,store,status})=>{
  store.db.complaints.push(body);
  return status(201,{message: "Complaint submitted successfully"});
},{
  body:t.String()
})
.delete("/erase:id",async ({params,store,status})=>{
  const {id} = params;
  const index = store.db.players.findIndex(player => player.id === id);
  if(index === -1) return status(404,{message: "Player not found"});
  store.db.players.splice(index,1);
  return status(200,{message: "Player erased successfully"});
},{
  params:t.Object({
    id: t.String(),
  }),
})
