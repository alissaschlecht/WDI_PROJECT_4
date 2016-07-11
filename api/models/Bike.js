var mongoose = require('mongoose');

var BikeSchema = mongoose.Schema({
  name: String,
  parts: [{ type: mongoose.Schema.ObjectId, ref: 'Part' }], //reference part model
  width: Number,
  height: Number
});

module.exports = mongoose.model('Bike', BikeSchema);