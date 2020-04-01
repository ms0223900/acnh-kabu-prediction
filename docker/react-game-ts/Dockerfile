#build stage
FROM node:10.15.0-alpine AS builder

LABEL MAINTAINER="Penguin Cho"
LABEL version="1.0.0"

WORKDIR /react-game-ts
COPY . /react-game-ts

RUN apk update
RUN apk add tzdata \ 
  git \
  && cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime \
  && apk del tzdata
RUN yarn install --silent
RUN npm run build && echo "Build End"

# #run stage

FROM node:10.15.0-alpine

WORKDIR /root/

COPY --from=builder /react-game-ts/build ./build

COPY . .

RUN npm install -g serve 

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000"]