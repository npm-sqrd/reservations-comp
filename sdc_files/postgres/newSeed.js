const fakeData = require('./dataGen');
const { Client } = require('pg');
const { exec } = require('child_process');


require('dotenv').config();

// clients will also use environment variables
// for connection information
const client = new Client({
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT,
});

client.connect();

fakeData.infoList(0, (done) => {
  if (done) {
    const path1 = '/Users/MatBagnall/Desktop/matHr/Immersive/senior-portion/npm-sqrd-SDC/reservations-comp/sdc_files/postgres/seedPG.sql';
    exec(`psql -f ${path1} silverspoon`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        client.end();
      }
    });
  }
});
client.on('end', () => {
  console.log('pg client end');
});

client.on('error', (error) => {
  console.error('pg client error', error);
});
