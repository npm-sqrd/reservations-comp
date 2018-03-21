const moment = require('moment-timezone');
const mongoose = require('mongoose');
const Restaurants = require('./mongoSchema');

mongoose.connect('mongodb://localhost/silverspoon');

require('dotenv').config();

const bookingsToday = (restaurantData) => {
  const todayStr = moment(new Date()).tz('America/Los_Angeles').format('YYYY-MM-DD');
  const resToday = restaurantData[0].reservations.filter(res => res.timeStamp === todayStr);
  return resToday.length;
};
const getMaxSeats = (restaurantData => restaurantData[0].seats);

const getOpenSeats = (({ restaurantData, date }) => {
  // call getMaxSeats in here
  const max = getMaxSeats(restaurantData);
  // loop through reservations array and match against todays date
  const slots = {
    17: max,
    18: max,
    19: max,
    20: max,
    21: max,
  };
  restaurantData[0].reservations.forEach((res) => {
    if (res.date === date) {
      slots[res.time] -= res.party;
    }
  });
  return slots;
});

const genReservationSlots = (({ restaurantData, date }) => Promise.all([
  bookingsToday(restaurantData),
  getOpenSeats({ restaurantData, date }),
])
  .then((results) => {
    // console.log('==>', results[1]);
    const returnedSlots = [];
    const timeSlots = Object.keys(results[1]);
    timeSlots.forEach((timeSlot) => {
      returnedSlots.push({
        time: timeSlot,
        remaining: results[1][timeSlot],
      });
    });
    const output = {
      madeToday: Number(results[0]),
      reservations: returnedSlots,
    };
    return output;
  }));

const getHandler = ((resId, date) =>
  Restaurants.find({ id: resId })
    .then(data => genReservationSlots({ restaurantData: data, date })));

const postHandler = (request =>
  getHandler(request.restaurantId)
    .then((data) => {
      const requestedSlot = data.reservations.find(item => item.time === request.time);
      const todayStr = moment(new Date()).tz('America/Los_Angeles').format('YYYY-MM-DD');
      if (requestedSlot.remaining >= request.party) {
        const newRes = {
          restaurantId: request.restaurantId,
          date: request.date,
          time: request.time,
          name: request.name,
          party: request.party,
          timeStamp: todayStr,
        };
        return Restaurants.update({ id: request.restaurantId }, { $push: { reservations: newRes } });
      }
    })
);

module.exports = {
  bookingsToday,
  getOpenSeats,
  getMaxSeats,
  genReservationSlots,
  getHandler,
  postHandler,
};
