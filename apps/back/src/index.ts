import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import {staticPlugin} from "@elysiajs/static";
import { api } from "./api";

const app = new Elysia()
.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
     process.env.APP_DOMAIN || "https://queue.code-with-rahat.com"
  ]
}))
.use(api)
.use(staticPlugin({
  prefix: '',
  assets: "./front",
}))
.listen({
  port:  process.env.PORT || 3000,
  hostname: '0.0.0.0'
})

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
