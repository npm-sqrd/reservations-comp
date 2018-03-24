const moment = require('moment-timezone');
const mongoose = require('mongoose');
const Restaurants = require('./mongoSchema');
const redisClient = require('../redisClient');

mongoose.connect('mongodb://localhost/silverspoon');

require('dotenv').config();

const bookingsToday = (restaurantData) => {
  const todayStr = moment(new Date()).tz('America/Los_Angeles').format('YYYY-MM-DD');
  const resToday = restaurantData.reservations.filter(res => res.timeStamp === todayStr);
  return resToday.length;
};
const getMaxSeats = (restaurantData => restaurantData.seats);

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
  restaurantData.reservations.forEach((res) => {
    if (res.date === date) {
      slots[res.time] -= res.party;
    }
  });
  return slots;
});

// const genReservations = (({ restaurantData, date }) => Promise.all([
//   bookingsToday(restaurantData),
//   getOpenSeats({ restaurantData, date }),
// ])
//   .then((results) => {
//     // console.log('==>', results[1]);
//     const returnedSlots = [];
//     const timeSlots = Object.keys(results[1]);
//     timeSlots.forEach((timeSlot) => {
//       returnedSlots.push({
//         time: timeSlot,
//         remaining: results[1][timeSlot],
//       });
//     });
//     const output = {
//       madeToday: Number(results[0]),
//       reservations: returnedSlots,
//     };
//     return output;
//   }));

// const genReservationSlots = ((resId, date) =>
//   Restaurants.find({ id: resId })
//     .then(data => genReservations({ restaurantData: data, date })));

const genSlots = (({ restaurantData, date }) => {
  const bookings = bookingsToday(restaurantData);
  const openSlots = getOpenSeats({ restaurantData, date });
  const returnedSlots = [];
  const timeSlots = Object.keys(openSlots);
  timeSlots.forEach((timeSlot) => {
    returnedSlots.push({
      time: timeSlot,
      remaining: openSlots[timeSlot],
    });
  });
  const output = {
    madeToday: Number(bookings),
    reservations: returnedSlots,
  };
  return output;
});

const genReservationSlots = ((resId, date, cb) => {
  const key = resId;
  redisClient.get(key, (err, data) => {
    if (data !== null) {
      cb(null, data);
    } else {
      Restaurants.findOne({ id: resId }).lean().exec((error, resData) => {
        if (error) {
          cb(error, null);
        } else {
          // console.log(resData);
          const openSlots = genSlots({ restaurantData: resData, date });
          const result = JSON.stringify(openSlots);
          redisClient.setex(key, 10, result);
          cb(null, result);
        }
      });
    }
  });
});

// const addReservation = (request =>
//   genReservationSlots(request.restaurantId)
//     .then((data) => {
//       const requestedSlot = data.reservations.find(item => item.time === request.time);
//       const todayStr = moment(new Date()).tz('America/Los_Angeles').format('YYYY-MM-DD');
//       if (requestedSlot.remaining >= request.party) {
//         const newRes = {
//           restaurantId: request.restaurantId,
//           date: request.date,
//           time: request.time,
//           name: request.name,
//           party: request.party,
//           timeStamp: todayStr,
//         };
//         return Restaurants.update({ id: request.restaurantId }, { $push: { reservations: newRes } });
//       }
//     })
// );

const addReservation = ((request, cb) => {
  genReservationSlots(request.restaurantId, request.date, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      const parsedData = JSON.parse(data);
      const requestedSlot = parsedData.reservations.find(item => item.time === request.time);
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
        Restaurants.update({ id: request.restaurantId }, { $push: { reservations: newRes } }, (error, result) => {
          if (error) {
            cb(error, null);
          } else {
            cb(null, result);
          }
        });
      }
    }
  });
});

module.exports = {
  bookingsToday,
  getOpenSeats,
  getMaxSeats,
  genReservationSlots,
  addReservation,
};
