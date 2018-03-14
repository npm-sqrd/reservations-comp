const request = require('supertest');

const app = require('./app');


describe('app.js', () => {
  test('app.js serves 200 for "/"', () => {
    expect(true).toBe(true);
    return request(app).get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('app.js returns 404 for "/nonsense_url_request"', () => {
    expect(true).toBe(true);
    return request(app).get('/nonsense_url_request')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
