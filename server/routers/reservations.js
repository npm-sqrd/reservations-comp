const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');

const router = express.Router();

// middleware that is specific to this router
router.use(bodyParser.json());

router.post('/', (req, res) => {
  // res.set({ 'Access-Control-Allow-Origin': '*' });
  console.log(req.body);
  db.addReservation(req.body)
    .then(() => {
      // console.log(req.body);
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
      // console.log('shit didn\'t work');
    });
});

module.exports = router;
