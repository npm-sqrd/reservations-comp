const moment = require('moment-timezone');
const faker = require('faker');
const fs = require('fs');

const stream = fs.createWriteStream('reservationData.json');

const reservationGen = (num) => {
  const index = Math.min(Math.random() * 100);
  const resObj = {};
  let count = 0;
  const data = [];
  let numberOfRes = 0;
  // compare index to set the number of reservations to be created for this restaurant
  if (index > 60 && index < 85) {
    numberOfRes = 3;
  }
  if (index > 85) {
    numberOfRes = 5;
  }
  while (count < numberOfRes) {
    // // // const dateObj = moment(new Date()).tz('America/Los_Angeles');
    // randomly generates how many days from now the reservation will be made for
    const daysFromNow = Math.floor(Math.random() * 7);
    // generate reservation date
    const dateObj = moment.tz('America/Los_Angeles').add(daysFromNow, 'days');
    const dateToday = moment.tz('America/Los_Angeles').format('YYYY-MM-DD');
    const dateStr = dateObj.format('YYYY-MM-DD');
    // generate time slot between 5pm and 9pm(inc)
    const timeSlot = Math.floor((Math.random() * (22 - 17)) + 17);
    // check to see if reservation already exists
    if (!resObj[`${dateStr}${timeSlot}`]) {
      // adds date and time combination as key to resObj
      resObj[`${dateStr}${timeSlot}`] = 1;
      // generates party size of reservation
      const seatsLeft = 30 * 0.8;
      const partySize = Math.min(seatsLeft, 1 + Math.floor(8 * Math.random()));
      const res = {
        restaurantId: num,
        date: dateStr,
        time: timeSlot,
        name: faker.name.findName(),
        party: partySize,
        timeStamp: dateToday,
      };
      data.push(res);
      count += 1;
    }
  }
  return data;
};

const reservationsList = (num, cb) => {
  const end = 1e7;
  let index = num;
  let freeSpace = true;

  while (index < end && freeSpace) {
    const resArray = reservationGen(index);
    const data = {
      id: index,
      resName: faker.lorem.words(),
      seats: 30,
      reservations: resArray,
    };
    const dataStr = JSON.stringify(data);
    freeSpace = stream.write(`${dataStr}\n`);
    index += 1;
    if (index % 500000 === 0) {
      console.log('resIndex ==>', index);
    }
  }
  if (index < end) {
    stream.once('drain', () => reservationsList(index, cb));
  } else {
    cb(index);
  }
};

module.exports.reservationsList = reservationsList;
