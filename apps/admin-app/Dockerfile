# Multi-stage build for admin-app
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json tsconfig.json ./

# Copy shared packages
COPY packages/ ./packages/

# Copy admin app
COPY apps/admin-app/ ./apps/admin-app/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build using turbo (handles dependency order)
RUN pnpm build:admin-app

# Production stage
FROM nginx:alpine AS production

# Copy build files
COPY --from=builder /app/apps/admin-app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/admin-app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]