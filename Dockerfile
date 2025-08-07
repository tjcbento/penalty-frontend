FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_ENVIRONMENT=development
ENV VITE_ENVIRONMENT=$VITE_ENVIRONMENT

# Important: Pass VITE_ENVIRONMENT to npm run build so Vite sees it
RUN VITE_ENVIRONMENT=$VITE_ENVIRONMENT npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
