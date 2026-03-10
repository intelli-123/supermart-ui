# ── Stage 1: Build Angular app ──────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build -- --configuration production

# ── Stage 2: Serve with nginx ────────────────────────────────────────────────
# Uses the official nginx image which processes /etc/nginx/templates/*.template
# files with envsubst at container start, injecting the $API_URL env var.
FROM nginx:1.27-alpine
COPY --from=build /app/dist/supermart-ui/browser /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 8080
