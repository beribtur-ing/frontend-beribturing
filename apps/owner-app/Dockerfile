# Multi-stage build for owner-app
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm@8

# Set working directory
WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy shared packages
COPY packages/ ./packages/

# Copy owner app
COPY apps/owner-app/ ./apps/owner-app/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build dependencies first (api-stub)
RUN pnpm run build:api-stub

# Build the owner app
RUN pnpm run build:owner-app

# Production stage
FROM nginx:alpine AS production

# Copy build files
COPY --from=base /app/apps/owner-app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/owner-app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]