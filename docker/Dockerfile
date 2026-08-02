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

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]