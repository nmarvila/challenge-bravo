FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y redis-server

EXPOSE 6379

COPY . .

CMD [ "npm", "start" ]