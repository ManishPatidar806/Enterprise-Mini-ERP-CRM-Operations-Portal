# Production Dockerfile for Backend
FROM node:20-bookworm-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run render:start

FROM node:20-bookworm-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev

RUN npx prisma generate --schema=prisma/schema.postgres.prisma

COPY --from=builder /app/dist ./dist

EXPOSE 5000


CMD ["npm", "run", "render:start"]

