var mongoose = require('mongoose');

var PathSchema = mongoose.Schema({
  desc: String, 
  value: String 
});

module.exports = mongoose.model('Path', PathSchema);