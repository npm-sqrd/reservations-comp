const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  seats: Number,
  reservations: [
    {
      date: String,
      time: Number,
      name: String,
      party: Number,
      timeStamp: String,
    },
  ],
});

const Restaurants = mongoose.model('reservations', restaurantSchema);

module.exports = { Restaurants, restaurantSchema };
