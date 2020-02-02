FROM node:13.3.0-alpine
RUN apk add --no-cache bash ffmpeg

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json

RUN if [ "$NODE_ENV" = "development" ]; \
        then yarn install;  \
 	else yarn install --only=production; \
	fi

COPY . /app
