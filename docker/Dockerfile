# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Optimize layer caching by copying only package files first
COPY package*.json ./
RUN npm ci --quiet

# Copy source code
COPY . .

# EmailJS credentials, baked into the client bundle at build time (see .env.example).
# The public key is meant to be exposed client-side; EmailJS enforces restrictions
# (allowed domains, template scope) from its dashboard, not by hiding this value.
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Install gettext for envsubst (used to inject the Cloud Run $PORT at startup)
RUN apk add --no-cache gettext curl

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config as a template — ${PORT} will be substituted at container startup
COPY docker/nginx.conf /etc/nginx/nginx.conf.template

# Cloud Run sets PORT (default 8080). We expose it as a convention.
EXPOSE 8080

# Health check (used for local docker-compose; Cloud Run uses its own probe)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT:-8080}/ || exit 1

# Substitute ${PORT} in the nginx template then start nginx.
# Single-quoting '${PORT}' prevents the shell from expanding it — envsubst receives
# the literal string "${PORT}" and knows which variable to substitute.
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]