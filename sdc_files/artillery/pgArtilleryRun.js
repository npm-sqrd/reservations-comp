const gen = require('../postgres/pgDataGen');
const { exec } = require('child_process');

// generating 1 million records for artillery csv file
gen.reservationsList(99e5, 'pg', (data) => {
  if (data) {
    console.log('done');
  }
});
