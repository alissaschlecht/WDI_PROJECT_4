var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bikes: [{ type: mongoose.Schema.ObjectId, ref: 'Bike' }]
});

module.exports = mongoose.model('User', UserSchema);