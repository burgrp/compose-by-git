FROM node:10-jessie

RUN curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

WORKDIR /app
COPY . .
RUN npm install

WORKDIR /data
CMD node /app/main.js