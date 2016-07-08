var localStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport){

  passport.use("local-signup", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, done){

    User.findOne({ email: email })
    .then(function(user){
      if(user) return done(null, false, { message: "Please choose another email."});

      var newUser = new User();
      newUser.firstName             = req.body.firstName;
      newUser.lastName              = req.body.lastName;
      newUser.email                 = email;
      newUser.password              = password;
      newUser.passwordConfirmation  = req.body.passwordConfirmation;

      newUser
      .save()
      .then(function(user){
        return done(null, user);
      })
      .catch(function(err){
        return done(err, false, { message: "Something went wrong."});
      });
    })
    .catch(function(err){
      return done(err, false, { message: "Something went wrong."});
    });


    // Check if there is a user with that email
    // Make a new instance of the user object with the correct fields
    // Save
    // Send back to the callback in the controller

  }));

};