FROM node:20-alpine AS builder

# Build arguments to specify which app to build
ARG APP_NAME
ARG PACKAGE_NAME
ENV APP_NAME=${APP_NAME}
ENV PACKAGE_NAME=${PACKAGE_NAME}

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Create directories and copy package.json files
RUN mkdir -p ./apps/admin-app ./apps/owner-app ./apps/renter-app ./packages/api-stub ./packages/eslint-config ./packages/typescript-config
COPY apps/admin-app/package.json ./apps/admin-app/
COPY apps/owner-app/package.json ./apps/owner-app/
COPY apps/renter-app/package.json ./apps/renter-app/
COPY packages/api-stub/package.json ./packages/api-stub/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the monorepo
COPY . .

# Build the specific application
RUN pnpm turbo build --filter=${PACKAGE_NAME}

# Serve with Node.js
FROM node:20-alpine AS runtime

# Build arguments to specify which app to serve
ARG APP_NAME
ARG PACKAGE_NAME
ENV APP_NAME=${APP_NAME}
ENV PACKAGE_NAME=${PACKAGE_NAME}

WORKDIR /app

# Copy built files from the specific app (using standalone build)
COPY --from=builder /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder /app/apps/${APP_NAME}/.next/static ./.next/static
COPY --from=builder /app/apps/${APP_NAME}/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
