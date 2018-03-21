const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  resName: String,
  seats: Number,
  reservations: [
    {
      restaurantId: Number,
      date: String,
      time: Number,
      name: String,
      party: Number,
      timeStamp: String,
    },
  ],
});

restaurantSchema.index({ resName: 1 });

const Restaurants = mongoose.model('reservations', restaurantSchema);

module.exports = Restaurants;
