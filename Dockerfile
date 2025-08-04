# Stage 1: Build the app
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN mkdir -p config
RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
