FROM node:latest
RUN apt-get update && apt-get install -y python3
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm qa:build
EXPOSE 3000
CMD ["pnpm", "serve"]
