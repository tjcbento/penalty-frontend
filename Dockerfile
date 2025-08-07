FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_ENVIRONMENT=development
ENV VITE_ENVIRONMENT=$VITE_ENVIRONMENT

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
