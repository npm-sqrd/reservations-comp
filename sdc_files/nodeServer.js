require('newrelic');
const http = require('http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const db = require('../server/db/index');

const port = 3005;

http.createServer((req, res) => {
  const { method, url } = req;
  const id = url.split('/')[2];
  const date = url.split('/')[4];
  console.log(url);
  if (method === 'GET' && url === '/') {
    fs.readFileAsync(path.join(__dirname, '../client/dist/index.html'), 'utf8')
      .then((html) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      })
      .catch(() => {
        res.writeHead(400);
        res.end();
      });
  } else if (method === 'GET' && url.match('.js')) {
    const stream = fs.createReadStream(path.join(__dirname, '../client/dist/bundle.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    stream.pipe(res);
  } else if (method === 'GET' && url === `/restaurants/${id}/reservations/${date}`) {
    db.genReservationSlots({ restaurantId: id, date })
      .then((result) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      })
      .catch(() => {
        res.writeHead(500);
        res.end();
      });
  } else if (method === 'POST' && url === '/reservations') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      db.addReservation(JSON.parse(body))
        .then((result) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        })
        .catch((err) => {
          res.writeHead(500);
          res.end(err);
        });
    });
  }
}).listen(port);

console.log(`server listening on port ${port}`);
