const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const db = require('../index');

mongoose.connect('mongodb://localhost/silverspoon');
const router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
  db.addReservation(req.body)
    .then(() => {
      res.send(201);
    })
    .catch(() => res.sendStatus(500));
});

module.exports = router;
