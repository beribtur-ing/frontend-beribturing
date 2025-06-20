# Multi-stage build for renter-app
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

# Copy renter app
COPY apps/renter-app/ ./apps/renter-app/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build dependencies first (api-stub)
RUN pnpm run build:api-stub

# Build the renter app
RUN pnpm run build:renter-app

# Production stage
FROM nginx:alpine AS production

# Copy build files
COPY --from=base /app/apps/renter-app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/renter-app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]