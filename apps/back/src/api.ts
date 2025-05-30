import { Elysia , t} from "elysia";
import { DateTime } from "luxon";
import TimingService from "./timing";

type Player = {
  id: string;
  name: string;
  stamp: string;
  secret: string;
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
  startTime: "9:00 PM"
})
.derive(async ()=>{
  return {
    stamp: DateTime.now().setZone('America/Toronto').toFormat('h:mm a')
  }
})
.onBeforeHandle(async ({store:{db},stamp,timingService,status})=>{
  const [day,month] = DateTime.now().setZone('America/Toronto').toFormat('dd MMM').split(' ');
  const [pDay, pMonth] = db.past;
  if (month!==pMonth){
    db.complaints = [];
  }
  if (day !== pDay){
    db.past = [day,month];
    db.players = [];
  }
  if (timingService.compareTimes(db.startTime,stamp)>=0){
    return status(403,{message: `Participation starts at ${db.startTime}`});
  }
})
.get("/health",async () => {
  return {status: "ok"};
})
.get("/players",async ({store:{db}}) => {
  const players = db.players.map(player => ({
    id: player.id,
    name: player.name,
    stamp: player.stamp,
  }));
  players.sort((a,b)=>a.id.localeCompare(b.id));
  return players;
})
.get("/complains",async ({store:{db}}) => {
  return db.complaints;
})
.post("/join", async ({body:{name,secret},store:{db},status,stamp})=>{
  const player = {
    id: (db.players.length+1).toString(),
    name,
    secret,
    stamp,
  } as Player;
  if (db.players.find(p => p.name === player.name)) {
    return status(409,{message: "Player name already exists"});
  }
  db.players.push(player);
  return status(201,{message: "Player joined successfully"});
},{
  body:t.Object({
    name: t.String(),
    secret: t.String({
      min: 8,
      max: 15,
      message: "Secret must be between 8 and 15 characters"
    })
  }),
})
.post("/complain", async ({body:{complaint},store:{db},status})=>{
  db.complaints.push(complaint);
  return status(201,{message: "Complaint submitted successfully"});
},{
  body:t.Object({
    complaint: t.String()
  })
})
.delete("/erase:id",async ({params:{id},store:{db},body:{secret},status})=>{
  const index = db.players.findIndex(player => player.id === id);
  if(index === -1) return status(404,{message: "Player not found"});
  if (db.players[index].secret !== secret)
    return status(403,{message: "Invalid secret"});
  db.players.splice(index,1);
  return status(200,{message: "Player erased successfully"});
},{
  params:t.Object({
    id: t.String(),
  }),
  body:t.Object({
    secret: t.String({
      min: 8,
      max: 15,
      message: "Secret must be between 8 and 15 characters"
    })
  })
})
