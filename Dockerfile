FROM node:21-alpine

WORKDIR /app
COPY . .

RUN yarn --production && yarn cache clean

ENV MHS_URL=example.com

CMD [ "yarn", "start" ]
