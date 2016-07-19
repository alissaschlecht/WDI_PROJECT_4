var express    = require('express');
var path       = require('path');
var cors       = require('cors');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var app        = express();

var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bikes');

var routes     = require('./config/routes');

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT || 3000);
console.log("Express is alive and listening.")