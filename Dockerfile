FROM node:latest AS base

FROM base AS builder
RUN apt-get update && apt-get install -y python3
RUN npm install -g bun
WORKDIR /usr/src/app
RUN rm -rf blog build docs .docusaurus node_modules
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM base
RUN npm install -g bun
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
EXPOSE 3000
CMD ["bun", "run", "serve"]
