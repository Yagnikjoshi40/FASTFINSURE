FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:20-bookworm-slim
WORKDIR /app
COPY --from=deps /app .
EXPOSE 3000
CMD ["npm","run","start"]
