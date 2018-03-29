import $ from 'jquery';

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : '';

const getReservationInfo = (resName, date, callback) => {
  $.ajax({
    url: `${BASE_URL}/restaurants/${resName}/reservations/${date}`,
    method: 'GET',
    crossDomain: true,
    success: (data) => {
      callback(null, data);
    },
    error: (jqxhr, status, error) => {
      // console.log('ajax GET error', jqxhr, status, error);
      callback(error, null);
    },
  });
};

const requestReservation = (resName, date, time, name, party, callback) => {
  const id = resName.slice(10);
  $.ajax({
    url: `${BASE_URL}/reservations`,
    method: 'POST',
    crossDomain: true,
    contentType: 'application/json',
    data: JSON.stringify({
      restaurantId: id,
      date,
      time,
      name,
      party,
    }),
    success: (result) => {
      // console.log('ajax POST success', result);
      callback(null, result);
    },
    error: (jqxhr, status, error) => {
      // console.log('ajax POST error', jqxhr, status, error);
      callback(error, null);
    },
  });
};

module.exports = {
  getReservationInfo, requestReservation,
};
