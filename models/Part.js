var mongoose = require('mongoose');

var PartSchema = mongoose.Schema({
  bike_id: { type: mongoose.Schema.ObjectId, ref: 'Bike' },
  category: String,
  name: String,
  svg: String,
  width: Number,
  height: Number,
  top: Number,
  left: Number
});

module.exports = mongoose.model('Part', PartSchema);