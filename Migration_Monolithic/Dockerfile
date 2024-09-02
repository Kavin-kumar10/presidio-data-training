FROM node:18-alpine as builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# add this line
# RUN apt-get update -y && apt-get install -y openssl

CMD [ "npm", "run", "dev" ]