FROM node:carbon

RUN mkdir /app

WORKDIR /app

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run build"]
CMD [ "npm", "start" ]