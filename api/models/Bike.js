var mongoose = require('mongoose');

var BikeSchema = mongoose.Schema({
  name: String,
  color: String,
  rearWheel : {type: mongoose.Schema.ObjectId, ref: 'Part'},
  frontWheel: {type: mongoose.Schema.ObjectId, ref: 'Part'},
  crank: {type: mongoose.Schema.ObjectId, ref: 'Part'},
  seat: {type: mongoose.Schema.ObjectId, ref: 'Part'},
  handlebars: {type: mongoose.Schema.ObjectId, ref: 'Part'}
  // parts: [{type: mongoose.Schema.ObjectId, ref: 'Part'}]
});

module.exports = mongoose.model('Bike', BikeSchema);