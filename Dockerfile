FROM node:20 as builder 

WORKDIR /app

COPY package.json package-lock.json components.json \
eslint.config.mjs next.config.ts postcss.config.mjs tsconfig.json ./
COPY src src

RUN npm ci
RUN npm run build


FROM node:20

WORKDIR /app

RUN apt update -y && apt dist-upgrade -y && apt autoremove

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next .next

RUN npm ci --omit=dev

# サーバーを起動
CMD ["npm", "run", "start"]
