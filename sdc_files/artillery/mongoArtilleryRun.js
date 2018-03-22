const gen = require('../postgres/pgDataGen');
const { exec } = require('child_process');

// generating 1 million records for artillery csv file
gen.reservationsList(99e5, 'mongo', (data) => {
  if (data) {
    const path = '/Users/MatBagnall/Desktop/matHr/Immersive/senior-portion/npm-sqrd-SDC/reservations-comp/sdc_files/artillery/mongoConfig.yml';
    exec(`artillery run ${path}`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});
