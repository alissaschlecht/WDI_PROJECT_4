var mongoose = require('mongoose');

var PartSchema = mongoose.Schema({
  type: String,
  imageData: String,
  userId: String
});

module.exports = mongoose.model('Part', PartSchema);