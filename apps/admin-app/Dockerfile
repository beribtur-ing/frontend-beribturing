# Multi-stage build for admin-app
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

# Copy admin app
COPY apps/admin-app/ ./apps/admin-app/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build dependencies first (api-stub)
RUN pnpm run build:api-stub

# Build the admin app
RUN pnpm run build:admin-app

# Production stage
FROM nginx:alpine AS production

# Copy build files
COPY --from=base /app/apps/admin-app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/admin-app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]