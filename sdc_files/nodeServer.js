require('newrelic');
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./mongo/index');

const port = 3005;

http.createServer((req, res) => {
  const { method, url } = req;
  const id = url.split('/')[2];
  const date = url.split('/')[4];

  if (method === 'GET' && url === '/') {
    const staticStream = fs.createReadStream(path.join(__dirname, '../client/dist/index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    staticStream.pipe(res);
  } else if (method === 'GET' && url === '/res-bundle.js') {
    const stream = fs.createReadStream(path.join(__dirname, '../client/dist/res-bundle.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    stream.pipe(res);
  } else if (method === 'GET' && url === '/res-bundle-server.js') {
    const stream = fs.createReadStream(path.join(__dirname, '../client/dist/res-bundle-server.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    stream.pipe(res);
  } else if (method === 'GET' && url === `/restaurants/${id}/reservations/${date}`) {
    db.genReservationSlots(id, date, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else if (method === 'POST' && url === '/reservations') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      db.addReservation(JSON.parse(body), (err, data) => {
        if (err) {
          res.writeHead(400);
          res.end(err);
        } else {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
    });
  }
}).listen(port);

console.log(`server listening on port ${port}`);
