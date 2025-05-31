FROM oven/bun:latest AS builder

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Install dependencies
COPY ./package.json ./
COPY ./apps/front/package.json ./apps/front/
COPY ./apps/back/package.json ./apps/back/
COPY turbo.json ./
RUN bun install --frozen-lockfile
COPY . .

# Build the application
RUN bun run build

# Copy the built application to the runner image
FROM oven/bun:latest AS runner

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=builder /app/dist /app/dist

ENV NODE_ENV=production
ENV PORT=80 

EXPOSE 80
EXPOSE 3000

# Start the application
WORKDIR /app/dist
CMD ["./server"]
