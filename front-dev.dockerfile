# Stage 1: Build Next.js app as static export
FROM node:20-alpine AS builder

ARG APP_NAME
ARG PACKAGE_NAME
ENV APP_NAME=${APP_NAME}
ENV PACKAGE_NAME=${PACKAGE_NAME}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Pre-create needed folders and copy individual package.jsons
RUN mkdir -p ./apps/admin-app ./apps/owner-app ./apps/renter-app ./packages/api-stub ./packages/eslint-config ./packages/typescript-config
COPY apps/admin-app/package.json ./apps/admin-app/
COPY apps/owner-app/package.json ./apps/owner-app/
COPY apps/renter-app/package.json ./apps/renter-app/
COPY packages/api-stub/package.json ./packages/api-stub/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN pnpm install --frozen-lockfile

# Copy the rest
COPY . .

# Build the target app
RUN pnpm turbo run build --filter=${PACKAGE_NAME}

# Export the app to static HTML
RUN pnpm --filter ${PACKAGE_NAME} exec next export

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine AS runtime

ARG APP_NAME

# Copy exported static files
COPY --from=builder /app/apps/${APP_NAME}/out /usr/share/nginx/html

# Optional: your custom proxy or routing config
COPY ./nginx/proxy.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
