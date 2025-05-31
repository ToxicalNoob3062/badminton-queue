FROM oven/bun:latest as builder

WORKDIR /app

COPY ./package.json ./bun.lockb ./
COPY ./apps/front/package.json ./apps/front/
COPY ./apps/back/package.json ./apps/back/
COPY turbo.json ./

RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:latest as runner

WORKDIR /app

COPY --from=builder /app/dist /app/dist

ENV NODE_ENV production
ENV PORT 80


EXPOSE 80
EXPOSE 3000



