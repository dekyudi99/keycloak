# Multi-stage Dockerfile untuk build Keycloak Theme JAR tanpa butuh Maven/Java di mesin host
FROM node:20-bookworm-slim AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends openjdk-17-jdk-headless maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build-keycloak-theme

FROM scratch AS export
COPY --from=builder /app/dist_keycloak/ /
