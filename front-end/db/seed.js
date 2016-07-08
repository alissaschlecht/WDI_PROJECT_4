var mongoose = require("mongoose");
var User     = require("../models/user");
var env      = require("../config/environment");

mongoose.connect(env.databaseUrl);

var data = [
  {
    firstName: "Alex",
    lastName: "Chin",
    email: "alex@alexchin.co.uk",
    password: "password",
    passwordConfirmation: "password"
  },
  {
    firstName: "Steve",
    lastName: "Reid",
    email: "steve@stevereid.co.uk",
    password: "password",
    passwordConfirmation: "password"
  },
  {
    firstName: "Mike",
    lastName: "Hayden",
    email: "mike@mikehayden.co.uk",
    password: "password",
    passwordConfirmation: "password"
  }
];

User.remove().then(function(){
  User.create(data).then(function(){
    console.log("Done");
    process.exit();
  }).catch(console.log);
}).catch(console.log);
