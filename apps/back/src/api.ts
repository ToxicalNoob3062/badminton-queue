import { Elysia , t} from "elysia";
import { DateTime } from "luxon";
import { createPinoLogger } from '@bogeychan/elysia-logger';
import { compareTimes } from "./timing";
import db from "./db";

const logger = createPinoLogger();

type Player = {
  id: string;
  name: string;
  stamp: string;
  secret: string;
};

const secretSchema = t.String({
  minLength: 8,
  maxLength: 15,
  error: {
    message: "Secret must be between 8 and 15 characters!"
  }
});

export const api = new Elysia({
  name: "Badminton Queue API",
  prefix: "/api",
})
.onError(({error})=>{
  logger.error(error)
  throw error;
})
.decorate('db', db)
.get("/health",async () => {
  return {status: "ok"};
})
.get("/complaints",async ({db,status}) => {
  return db.getAllComplaints();
})
.derive(async ()=>{
  return {
    stamp: DateTime.now().setZone('America/Toronto').toFormat('h:mm a')
  }
})
.onBeforeHandle(async ({db,stamp,status})=>{
  const [day,month] = DateTime.now().setZone('America/Toronto').toFormat('dd MMM').split(' ');
  const [pDay, pMonth] = db.appState.past;
  if (month!==pMonth){
    await db.clearComplaints();
  }
  if (day !== pDay){
    await db.resetQueue([day,month]);
  }
  if (compareTimes(db.appState.startTime,stamp)>=0){
    return status(403,{message: `Participation starts at ${db.appState.startTime}!`});
  }
})
.get("/players",async ({db}) => {
  return await db.getAllPlayers();
})
.post("/complain", async ({body:{complaint},db,status})=>{
  await db.addComplaint(complaint);
  return status(201,{message: "Complaint submitted successfully!"});
},{
  body:t.Object({
    complaint: t.String()
  })
})
.model({
  joinPayload: t.Object({
    name: t.String(),
    secret: secretSchema
  }),
  leavePayload: t.Object({
    secret: secretSchema
  })
})
.post("/join", async ({body:{name,secret},db,status,stamp})=>{
  if (db.appState.players.find(p => p.name === name)) {
    return status(409,{message: "Player name already exists!"});
  }
  return status(201,await db.addPlayer(name, secret, stamp));
},{
  body:'joinPayload',
})
.delete("/leave/:id",async ({params:{id},db,body:{secret},status})=>{
  const index = db.appState.players.findIndex(player => player.id === id);
  if(index === -1) return status(404,{message: "Player not found!"});
  if (db.appState.players[index].secret !== secret)
    return status(403,{message: "Invalid secret!"});
  await db.removePlayer(id);
  return status(200,{message: "Player erased successfully!"});
},{
  params:t.Object({
    id: t.String(),
  }),
  body: 'leavePayload',
})
