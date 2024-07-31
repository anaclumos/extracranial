FROM node:latest AS base

FROM base AS builder
RUN apt-get update && apt-get install -y python3
RUN npm install -g bun
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun build

FROM base
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["bun", "serve"]
