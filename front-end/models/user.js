var mongoose = require("mongoose");
var bcrypt   = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
  firstName:    { type: String },
  lastName:     { type: String },
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

userSchema
  .virtual("password")
  .get(getPassword)
  .set(setPassword);

userSchema
  .virtual("passwordConfirmation")
  .get(getPasswordConfirmation)
  .set(setPasswordConfirmation);

// userSchema.statics -- use on model (kind of like class)
// userSchema.methods -- use on specific instance

userSchema.methods.validatePassword = validatePassword;


function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash, null);
}

module.exports = mongoose.model("User", userSchema);

function getPassword(){
  return this._password;
}

function setPassword(password){
  this._password = password;
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function getPasswordConfirmation(){
  return this._passwordConfirmation;
}

function setPasswordConfirmation(value){
  this._passwordConfirmation = value;
}
