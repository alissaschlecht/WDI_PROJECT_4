var mongoose = require('mongoose');

var BikeSchema = mongoose.Schema({
  name: String,
  wheelOne: { type: mongoose.Schema.ObjectId, ref: 'Part' },
  wheelTwo: { type: mongoose.Schema.ObjectId, ref: 'Part' },
  frame: { type: mongoose.Schema.ObjectId, ref: 'Part' },
  handlebars: { type: mongoose.Schema.ObjectId, ref: 'Part' },
  seat: { type: mongoose.Schema.ObjectId, ref: 'Part' }
});

module.exports = mongoose.model('Bike', BikeSchema);