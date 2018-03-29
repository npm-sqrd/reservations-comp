const dataGen = require('./mongoDataGen');
const { exec } = require('child_process');
const mongoose = require('mongoose');

// mongoose.connect(`${process.env.MONGO_HOST}://${process.env.MONGO_PATH}/${process.env.MONGO_DB}`);
mongoose.connect('mongodb://localhost/silverspoon');

dataGen.reservationsList(10000001, (done) => {
  if (done) {
    const path = '../../reservationData.json';
    exec(`mongoimport --db silverspoon --collection reservations --drop --file ${path}`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        mongoose.disconnect();
      }
    });
    console.log('data createion complete');
  }
});
