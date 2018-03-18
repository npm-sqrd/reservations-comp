const dataGen = require('./mongoDataGen');
const { exec } = require('child_process');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/silverspoon');

// not seeding correctly yet - run tests

dataGen.reservationsList(9999900, (done) => {
  if (done) {
    const path = '/Users/MatBagnall/Desktop/matHr/Immersive/senior-portion/npm-sqrd-SDC/reservations-comp/sdc_files/mongo/reservationData.json';
    exec(`mongoimport --db silverspoon --collection reservations --drop --file ${path}`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        mongoose.disconnect();
      }
    });
    console.log('done');
  }
});
