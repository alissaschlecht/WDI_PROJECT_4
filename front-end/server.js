var express      = require("express");
var app          = express();
var env          = require("./config/environment");
var mongoose     = require("mongoose");
var bodyParser   = require("body-parser");
var passport     = require("passport");
var jwt          = require("jsonwebtoken");
var expressJWT   = require("express-JWT");

require("./config/passport")(passport);

var User         = require("./models/user");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));
app.use(bodyParser.json({urlencoded: true}));
app.use(passport.initialize());

app.use("/api", expressJWT({ secret: env.secret })
   .unless({
      path: [
        { url: "/api/login",    methods: ["POST"]},
        { url: "/api/register", methods: ["POST"]}
      ]
   }));

app.use(function(err, req, res, next){
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized request."});
  }
  return next();
});

app.post("/api/login", function(req, res, next){
  User
  .findOne({ email: req.body.email })
  .then(function(user){
    if (!user) return res.status(404).json({ message: "No user found."});
    if (!user.validatePassword(req.body.password)) return res.status(403).json({
      message: "Please try again."
    });

    var token   = jwt.sign(user, env.secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: "Welcome back.",
      token: token,
      user: user
    });
  })
  .catch(function(err){
    return res.status(500).json({ message: "Something went wrong."});
  });
});

app.post("/api/register", function(req, res, next){
  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).json({ message: 'Something went wrong!'});
    if (err) return res.status(401).json({ message: info.message });

    var token   = jwt.sign(user, env.secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: "Thanks for registering.",
      token: token,
      user: user
    })
    // JWT stuff

  });
  return localStrategy(req, res, next);
});

app.get("/api/users", function(req, res, next){
  User.find({}).then(function(users){
    return res.status(200).json({ users: users});
  }).catch(console.log);
});

app.get("/*", function(req, res, next){
  return res.sendFile(__dirname + "/public/index.html");
});

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen(){
  return app.listen(env.port, startup);
}

function connect(){
  return mongoose.connect(env.databaseUrl).connection;
}

function startup(){
  console.log("We're listening!");
}
