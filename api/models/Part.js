var mongoose = require('mongoose');

var PartSchema = mongoose.Schema({
  type: String,
  svg: String,
  width: Number,
  height: Number,
  top: Number,
  left: Number
});

module.exports = mongoose.model('Part', PartSchema);