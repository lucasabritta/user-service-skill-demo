FROM node:18-alpine AS builder
WORKDIR /app


COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src
COPY infrastructure ./infrastructure

RUN npm run build
