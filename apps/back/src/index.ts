import { Elysia } from "elysia";
import {swagger} from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import {staticPlugin} from "@elysiajs/static";
import { api } from "./api";

const app = new Elysia()
.use(swagger())
.use(cors({
  // origin: [
  //   'http://localhost:3000',
  //   'http://localhost:5173',
  //   "192.168.86.102:5173",
  // ]
}))
.use(api)
.use(staticPlugin({
  prefix: '',
  assets: "../front/dist"
}))
.listen(3000)

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
