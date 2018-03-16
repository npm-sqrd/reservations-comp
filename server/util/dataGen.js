const moment = require('moment-timezone');
const faker = require('faker');
const fs = require('fs');

const streamOne = fs.createWriteStream('infoListData.csv');
const streamTwo = fs.createWriteStream('reservationData.csv');
let startIndex = '';

const reservationGen = (num) => {
  const dateObj = moment(new Date()).tz('America/Los_Angeles'); // how to make this within 3 month range?
  const dateStr = dateObj.format('YYYY-MM-DD');
  const seatsLeft = 30 * 0.8;
  const partySize = Math.min(seatsLeft, 1 + Math.floor(10 * Math.random()));
  const data = {
    restaurantId: num,
    date: dateStr,
    time: 18,
    name: faker.name.findName(),
    party: partySize,
  };
  const dataStr = `${data.restaurantId},${data.date},${data.time},${data.name},${data.party}\n`;
  return dataStr;
};

const reservationsList = (num) => {
  const end = 2e7;
  let index = num;
  let freeSpace = true;

  while (index < end && freeSpace) {
    const data = reservationGen(index);
    freeSpace = streamTwo.write(data);
    index += 1;
    if (index % 500000 === 0) {
      console.log('resIndex ==>', index);
    }
  }
  if (index < end) {
    streamTwo.once('drain', () => reservationsList(index));
  } else {
    console.log('reservationData.csv file complete!');
  }
};

const infoList = (num) => {
  const end = 2e7;
  let index = num;
  let freeSpace = true;
  if (startIndex === '') {
    startIndex = num;
  }
  while (index < end && freeSpace) {
    const data = { id: index, name: faker.company.companyName(), seats: 30 };
    const dataStr = `${data.id},${data.name},${data.seats}\n`;

    freeSpace = streamOne.write(dataStr);
    index += 1;
    if (index % 500000 === 0) {
      console.log('index ==>', index);
    }
  }
  if (index < end) {
    streamOne.once('drain', () => infoList(index));
  } else {
    console.log('infoListData.csv file complete!');
    reservationsList(startIndex);
  }
};


module.exports = { infoList, reservationsList };
