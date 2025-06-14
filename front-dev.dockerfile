# Stage 1: Build
FROM node:20-alpine AS builder

ARG APP_NAME
ARG PACKAGE_NAME
ENV APP_NAME=${APP_NAME}
ENV PACKAGE_NAME=${PACKAGE_NAME}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@8.9.0 --activate


COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Pre-create dirs to avoid pnpm complaining
RUN mkdir -p ./apps/admin-app ./apps/owner-app ./apps/renter-app ./packages/api-stub ./packages/eslint-config ./packages/typescript-config
COPY apps/admin-app/package.json ./apps/admin-app/
COPY apps/owner-app/package.json ./apps/owner-app/
COPY apps/renter-app/package.json ./apps/renter-app/
COPY packages/api-stub/package.json ./packages/api-stub/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN pnpm install --force


COPY . .

# Build Next.js standalone
RUN pnpm turbo run build --filter=${PACKAGE_NAME}

# --------------------------------------------

# Stage 2: Runtime
FROM node:20-alpine AS runtime

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /app


RUN npm install -g pm2

# ✅ Correct: copy full standalone output (with trailing slash!)
COPY --from=builder /app/apps/${APP_NAME}/.next/standalone/ ./

# ✅ Static and public folders
COPY --from=builder /app/apps/${APP_NAME}/.next/static ./.next/static
COPY --from=builder /app/apps/${APP_NAME}/public ./public

# Optional: PM2 config file if needed
COPY ecosystem.config.ts .

# Runtime environment
EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["pm2-runtime", "server.js"]

