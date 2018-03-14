const moment = require('moment-timezone');

const config = require('./knexfile.js');
const db = require('../db');
const fakeData = require('../util/fakeData');

const env = 'development';
const knex = require('knex')(config[env]);

// console.log(config);
knex.migrate.rollback([config])
  .then(() => {
    // migrate the tables
    knex.migrate.latest([config])
      .then(() => {
        console.log('migration complete, loading restaurant data');
        // seed the restaurant information
        const restaurantInsert = [];
        fakeData.infoList.forEach((info) => {
          restaurantInsert.push(db.addRestaurantInfo(info));
        });
        return Promise.all(restaurantInsert);
      })
      .then(() => {
        // seed the reservation data
        console.log('restaurant data complete, loading reservations');

        const reservationInsert = [];
        // generate reservations for the next week
        for (let i = 0; i < 7; i += 1) {
          const date = moment.tz('America/Los_Angeles').add(i, 'days');

          const fakeReservations = fakeData.generateReservations(date);
          console.log(`Generated ${fakeReservations.length} reservations for ${date.format('YYYY-MM-DD')}`);

          fakeReservations.forEach((reservation) => {
            reservationInsert.push(db.addReservation(reservation));
          });
        }
        return Promise.all(reservationInsert);
      })
      .then(() => {
        console.log('reservations complete');
      })
      .catch((err) => {
        console.log('Error', err);
      })
      .finally(() => {
        // close connection
        console.log('closing connections');
        db.client.end();
        knex.destroy();
      });
  });
