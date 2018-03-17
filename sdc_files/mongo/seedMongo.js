const dataGen = require('./mongoDataGen');

dataGen.reservationsList(9000000, (results) => {
  if (results) {
    console.log(results);
  }
});
