const express = require('express');
const request = require('supertest');

jest.mock('../db');

const restaurantsRouter = require('./restaurants');

const today = (new Date()).toISOString().slice(0, 10);
const restaurantId = 3267;
const url = `/restaurants/${restaurantId}/reservations`;
const urlWithDate = `/restaurants/${restaurantId}/reservations/${today}`;


describe('restaurants router', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use('/restaurants', restaurantsRouter);
  });

  describe('GET /restaurants/:id/reservations/', () => {
    test('should return 200 response', () => request(app).get(url)
      .then(response => expect(response.statusCode).toBe(200)));

    test('should return expected object shape', () => request(app).get(url)
      .then((response) => {
        const expectedObject = {
          madeToday: expect.any(Number),
          reservations: expect.any(Array),
        };

        return expect(response.body).toMatchObject(expectedObject);
      }));


    test('should return expected reservation information', () => request(app).get(url)
      .then((response) => {
        const expectedReservation = {
          time: expect.any(Number),
          remaining: expect.any(Number),
        };

        return expect(response.body.reservations[0]).toMatchObject(expectedReservation);
      }));
  });

  describe(`GET /restaurants/:id/reservations/${today}`, () => {
    test('should return 200 response', () => request(app).get(urlWithDate)
      .then(response => expect(response.statusCode).toBe(200)));

    test('should return expected object shape', () => request(app).get(urlWithDate)
      .then((response) => {
        const expectedObject = {
          madeToday: expect.any(Number),
          reservations: expect.any(Array),
        };

        return expect(response.body).toMatchObject(expectedObject);
      }));

    test('should return expected reservation information', () => request(app).get(urlWithDate)
      .then((response) => {
        const expectedReservation = {
          time: expect.any(Number),
          remaining: expect.any(Number),
        };

        return expect(response.body.reservations[0]).toMatchObject(expectedReservation);
      }));

    test('should send 500 back on errors', () => request(app).get(`/restaurants/${restaurantId}/reservations/2018-02-31`)
      .then(response => expect(response.statusCode).toBe(500)));
  });
});
