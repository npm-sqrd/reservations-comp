const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');

const router = express.Router();

// middleware that is specific to this router
router.use(bodyParser.json());

router.post('/', (req, res) => {
  // res.set({ 'Access-Control-Allow-Origin': '*' });
  db.addReservation(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = router;
