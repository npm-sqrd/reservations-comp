
const getReservationInfo = (id, date, callback) => {
  // console.log('MOCK lib/helper.js');

  const fakeReservationInfo = [
    { time: 17, remaining: 10 },
    { time: 18, remaining: 5 },
    { time: 19, remaining: 0 },
    { time: 20, remaining: 2 },
    { time: 21, remaining: 20 },
  ];

  if (id === 305) {
    callback(null, {
      madeToday: 42,
      reservations: fakeReservationInfo,
    });
  } else {
    callback('Error!', null);
  }
};

const requestReservation = (id, date, time, name, party, callback) => {
  // console.log('MOCK lib/helper.js');

  if (id === 305) {
    callback(null, 'success!');
  } else {
    callback('Error!', null);
  }
};

module.exports = {
  getReservationInfo, requestReservation,
};
