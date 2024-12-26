# Builder stage
FROM node:lts-alpine AS builder

# Install python3 and curl only if actually needed for the build
RUN apk add --no-cache python3 curl

WORKDIR /usr/src/app

# Copy package files first to leverage cache
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies in a single layer
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

# Copy source files
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:lts-alpine AS production

# Use a non-root user for security
RUN addgroup -g 1001 nodejs && adduser -S -u 1001 -G nodejs nodejs

WORKDIR /usr/src/app

# Copy only the built artifacts and package files
COPY --from=builder /usr/src/app/build ./build
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod && pnpm cache clean && rm -rf /root/.npm /root/.pnpm-store

# Switch to non-root user
USER nodejs

EXPOSE 3000

# Use array syntax for CMD
CMD ["pnpm", "serve"]
