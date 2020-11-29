FROM node:latest

RUN "BOT_TOKEN=$BOT_TOKEN" > .env
RUN "CRON_TIMER=* * * * * *" > .env
ADD . /app
WORKDIR /app

RUN npm install --production

CMD npm start
