const express = require('express');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const db = require('../index');

mongoose.connect('mongodb://localhost/silverspoon');

const router = express.Router();

router.get('/:id/reservations/:date?', (req, res) => {
  const dateParam = req.params.date
    ? req.params.date
    : moment(new Date()).tz('America/Los_Angeles').format('YYYY-MM-DD');

  db.getHandler(req.params.id, dateParam)
    .then(result => res.send(result))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
