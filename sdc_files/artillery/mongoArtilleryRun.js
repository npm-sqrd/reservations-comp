const gen = require('../postgres/pgDataGen');
const { exec } = require('child_process');

// generating 1 million records for artillery csv file
gen.reservationsList(99e5, 'mongo', (data) => {
  if (data) {
    exec('artillery run ./sdc_files/artillery/mongoConfig.yml', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});
