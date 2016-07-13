var mongoose = require('mongoose');

var PartSchema = mongoose.Schema({
  name: String,
  svg: String,
  width: Number,
  height: Number,
  top: Number,
  left: Number
});

module.exports = mongoose.model('Part', PartSchema);