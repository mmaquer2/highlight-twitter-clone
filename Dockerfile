FROM node:20.10.0-alpine3.10

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

CMD ["npm", "start"]