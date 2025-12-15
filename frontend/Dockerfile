# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies
COPY frontend/package.json frontend/bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY frontend/. .

# Build-time API URL for Vite
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build static assets
RUN bun run build

# Runtime stage
FROM nginx:1.27-alpine

# Copy built files to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Basic SPA config: serve index.html for all routes
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
