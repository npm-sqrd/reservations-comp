jest.mock('jquery');

const helper = require('./helper');

describe('getReservationInfo', () => {
  test('send an AJAX request to the expected URL', () => {
    const id = 200;
    const date = '2018-04-01';
    helper.getReservationInfo(id, date, (err, data) => {
      // console.log(data);
      expect(data.inputOptions.url).toBe('/restaurants/200/reservations/2018-04-01');
    });
  });

  test('should handle errors correctly', () => {
    const id = 200;
    const date = '2018-02-31';
    helper.getReservationInfo(id, date, (err) => {
      expect(err).toBe('error');
    });
  });
});

describe('requestReservation', () => {
  test('send an AJAX request to the expected URL with expected data object', () => {
    const restaurantId = 305;
    const date = (new Date()).toISOString().slice(0, 10);
    const time = 20;
    const name = 'Lenny Carl';
    const party = 8;
    helper.requestReservation(restaurantId, date, time, name, party, (err, data) => {
      expect(data.inputOptions.url).toBe('/reservations');
      expect(data.inputOptions.method).toBe('POST');
      expect(data.inputOptions.contentType).toBe('application/json');

      const expectedInput = {
        restaurantId: expect.any(Number),
        date: expect.any(String),
        time: expect.any(Number),
        name: expect.any(String),
        party: expect.any(Number),
      };

      const inputJSON = JSON.parse(data.inputOptions.data);
      expect(inputJSON).toMatchObject(expectedInput);
    });
  });

  test('should handle errors correctly', () => {
    const restaurantId = 305;
    const date = '2018-02-31';
    const time = 20;
    const name = 'Lenny Carl';
    const party = 8;
    helper.requestReservation(restaurantId, date, time, name, party, (err) => {
      expect(err).toBe('error');
    });
  });
});
