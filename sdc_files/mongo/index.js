const moment = require('moment-timezone');
const mongoose = require('mongoose');
const Restaurants = require('./mongoSchema');
const redisClient = require('../redisClient');

mongoose.connect('mongodb://mongo/silverspoon');

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
          const openSlots = genSlots({ restaurantData: resData, date });
          const result = JSON.stringify(openSlots);
          redisClient.setex(key, 20, result);
          cb(null, result);
        }
      });
    }
  });
});

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
            parsedData.reservations.forEach((item, i) => {
              const remaining = item.remaining - newRes.party;
              if (item.time === newRes.time) {
                parsedData.reservations[i].remaining = remaining;
              }
            });
            parsedData.madeToday += 1;
            const slots = JSON.stringify(parsedData);
            redisClient.setex(request.restaurantId, 20, slots);
            cb(null, slots);
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
