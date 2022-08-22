# stage1 - build react app first 
FROM node:16.13.2-alpine3.14 as build
WORKDIR /app

COPY ./react-app/ /app
RUN npm install
RUN npm run build

# Download and build our environment injector
FROM golang:1.15.6-alpine3.12 as go-downloader
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN go get github.com/nrmitchi/runtime-js-env

# Copy the built application into Nginx for serving
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy the runtime-js-env binary
COPY --from=go-downloader /go/bin/runtime-js-env /

COPY ./react-app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Add our startup script
RUN echo "/runtime-js-env -i /usr/share/nginx/html/index.html && chmod 644 /usr/share/nginx/html/index.html" > /docker-entrypoint.d/docker-nginx-startup-runtime-env.sh
RUN chmod a+x /docker-entrypoint.d/docker-nginx-startup-runtime-env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
