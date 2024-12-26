FROM node:latest AS base

RUN apt-get update && apt-get install -y python3
RUN npm install -g pnpm

WORKDIR /usr/src/app

RUN rm -rf blog build docs .docusaurus node_modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "serve"]
