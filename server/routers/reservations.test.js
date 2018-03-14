const express = require('express');
const request = require('supertest');

// jest.unmock('pg');
jest.mock('../db');

const reservationsRouter = require('./reservations');

describe('reservations Router', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use('/reservations', reservationsRouter);
  });

  test('should return a 201 on a proper POST request', (done) => {
    const testInput = {
      restaurantId: 305,
      date: (new Date()).toISOString().slice(0, 10),
      time: 18,
      name: 'Baron von Hershey Kiss',
      party: 3,
    };
    request(app)
      .post('/reservations')
      .send(testInput)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      })
      .catch(done.fail);
  });

  test('should return a 500 on a bad POST request', (done) => {
    const testInput = {
      restaurantId: 'hello world', // invalid restaurant id
      date: (new Date()).toISOString().slice(0, 10),
      time: 18,
      name: 'Baron von Hershey Kiss',
      party: 3,
    };
    request(app)
      .post('/reservations')
      .send(testInput)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        done();
      })
      .catch(done.fail);
  });

  test('should return a 404 on a GET request', (done) => {
    request(app).get('/reservations')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      })
      .catch(done.fail);
  });
});
