# Multi-stage build for owner-app
FROM node:20-bullseye AS builder


# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json tsconfig.json ./

# Copy shared packages
COPY packages/ ./packages/

# Copy owner app
COPY apps/owner-app/ ./apps/owner-app/

RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install

# Build using turbo (handles dependency order)
RUN pnpm build:owner-app

# Production stage
FROM nginx:alpine AS production

# Copy build files
COPY --from=builder /app/apps/owner-app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/owner-app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
