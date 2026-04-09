FROM node:20-alpine AS dependencias
WORKDIR /app
ENV TZ=UTC
COPY package*.json ./
RUN npm ci

FROM dependencias AS desarrollo
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=3000
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM dependencias AS compilacion
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY . .
RUN npm run css:build && npm prune --omit=dev

FROM node:20-alpine AS produccion
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=compilacion /app/package*.json ./
COPY --from=compilacion /app/server.js ./
COPY --from=compilacion /app/node_modules ./node_modules
COPY --from=compilacion /app/src ./src
COPY --from=compilacion /app/views ./views
COPY --from=compilacion /app/public ./public
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 CMD wget -qO- "http://127.0.0.1:${PORT}/" || exit 1
USER node
CMD ["npm", "start"]
