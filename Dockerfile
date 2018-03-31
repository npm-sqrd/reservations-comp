FROM node:carbon

RUN mkdir /ss_reservation_app

WORKDIR /ss_reservation_app

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run build"]
CMD [ "npm", "start" ]