FROM node:lts-alpine AS builder
RUN apk add --no-cache python3 curl
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:lts-alpine AS production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./
EXPOSE 3000
CMD ["pnpm", "serve"]
