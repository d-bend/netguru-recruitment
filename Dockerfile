FROM node:14.15-alpine as builder

ENV PORT 3000

WORKDIR /app

COPY ./package*.json .

RUN npm ci

ADD . .

RUN npm run build

FROM node:14.15-alpine

WORKDIR /app

COPY --from=builder /app/package*json ./
COPY --chown=builder /app/dist ./dist/
ENV NODE_ENV PRODUCTION

RUN npm ci

CMD ["npm", "run", "start:prod"]