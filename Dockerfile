# Stage 1: Build the client
FROM node:18-alpine as client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

# Stage 2: Build the server
FROM node:18-alpine as server-builder
WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server/ ./
RUN npm run build

# Stage 3: Final production image
FROM node:18-alpine
WORKDIR /app

COPY --from=server-builder /app/server/package*.json ./
COPY --from=server-builder /app/server/dist ./dist
COPY --from=client-builder /app/client/dist ./dist/public

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/server.js"]