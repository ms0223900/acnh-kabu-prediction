#build stage
FROM node:10.15.0-alpine AS builder

LABEL MAINTAINER="Penguin Cho"
LABEL version="1.0.0"

ENV VERSION=1.0.0

WORKDIR /react-game-ts-storybook
COPY . /react-game-ts-storybook

RUN apk update
RUN apk add tzdata \
  && cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime \
  && apk del tzdata
RUN npm install --silent
RUN npm run build-storybook && echo "Storybook Build End"

# #run stage
FROM node:10.15.0-alpine

WORKDIR /root/

COPY --from=builder /react-game-ts-storybook/storybook-static ./storybook-static

COPY . .

RUN npm install -g serve 

EXPOSE 9009

CMD [ "serve", "./storybook-static", "-l", "9009" ]