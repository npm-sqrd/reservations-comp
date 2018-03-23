// const gen = require('../postgres/pgDataGen');
// const { exec } = require('child_process');

// // generating 1 million records for artillery csv file
// gen.reservationsList(7e6, 'pg', (data) => {
//   if (data) {
//     exec('artillery run ./sdc_files/artillery/pgConfig.yml', (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//       }
//     });
//   }
// });


// *********** This file is in case I decide to try and use payloads for testing ***** //
