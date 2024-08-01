FROM node:latest AS base

RUN apt-get update && apt-get install -y python3
RUN npm install -g bun

WORKDIR /usr/src/app

RUN rm -rf blog build docs .docusaurus node_modules
COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "start"]
