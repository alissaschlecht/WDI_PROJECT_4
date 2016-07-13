var mongoose = require('mongoose');

var BikeSchema = mongoose.Schema({
  name: String,
  parts: [{type: mongoose.Schema.ObjectId, ref: 'Part'}]
});

module.exports = mongoose.model('Bike', BikeSchema);