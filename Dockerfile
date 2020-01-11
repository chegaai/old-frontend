FROM node:13.0-alpine as production-stage

WORKDIR /app

COPY . .

RUN npm i -g @quasar/cli
RUN rm -rf node_modules
RUN npm i --silent

RUN quasar build -m ssr

ENV PORT=80

EXPOSE 80

CMD ["node", "dist/ssr/server/index.js"]
