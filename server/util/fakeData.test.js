const fakeData = require('./fakeData');
const sampleData = require('./sampleData');

describe('fakeData', () => {
  describe('infoList', () => {
    test('should be an Array', () => {
      expect(Array.isArray(fakeData.infoList)).toBe(true);
    });

    test('should have array items with appropriate keys & types', () => {
      const keys = Object.keys(fakeData.infoList[0]);

      expect(keys.length).toBe(3);
      expect(keys.includes('id')).toBe(true);
      expect(keys.includes('name')).toBe(true);
      expect(keys.includes('seats')).toBe(true);
      expect(typeof fakeData.infoList[0].id).toBe('number');
      expect(typeof fakeData.infoList[0].name).toBe('string');
      expect(typeof fakeData.infoList[0].seats).toBe('number');
    });

    test('should have an entry for every restaurant in sampleData', () => {
      expect(fakeData.infoList.length).toBe(sampleData.length);

      const fakeDataIds = fakeData.infoList.map(item => item.id);
      const sampleDataIds = sampleData.map(item => item.id);
      sampleDataIds.forEach((id) => {
        expect(fakeDataIds.includes(id)).toBe(true);
      });
    });
  });

  describe('generateReservations', () => {
    test('should return an Array', () => {
      const reservationList = fakeData.generateReservations();
      expect(Array.isArray(reservationList)).toBe(true);
    });

    test('should have objects with appropriate keys & types', () => {
      const reservationList = fakeData.generateReservations();
      const keys = Object.keys(reservationList[0]);

      expect(keys.length).toBe(5);

      expect(keys.includes('restaurantId')).toBe(true);
      expect(keys.includes('date')).toBe(true);
      expect(keys.includes('time')).toBe(true);
      expect(keys.includes('name')).toBe(true);
      expect(keys.includes('party')).toBe(true);

      expect(typeof reservationList[0].restaurantId).toBe('number');
      expect(typeof reservationList[0].date).toBe('string');
      expect(typeof reservationList[0].time).toBe('number');
      expect(typeof reservationList[0].party).toBe('number');
      expect(typeof reservationList[0].name).toBe('string');
    });
  });
});

// DEBUG
// const aggregateRes = reservationList
//   .reduce((acc, item) => {
//     acc[item.restaurantId] = acc[item.restaurantId]
//       ? acc[item.restaurantId]
//       : {
//         17: 0,
//         18: 0,
//         19: 0,
//         20: 0,
//         21: 0,
//       };
//     acc[item.restaurantId][item.time] += item.party;
//     return acc;
//   }, {});

