var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

require('./models/Users');
require('./models/Evt_Admins');
require('./models/Events');
require('./models/Judges');
require('./models/Teams');


var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');

var uristring =
  process.env.MONGODB_URI ||
  process.env.MONGOHQ_URL;

var theport = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

//mongoose.connect("mongodb://localhost:27017/Scored!");

// app
var app = express();
// cors
app.use(cors());
// views. -- VERY IMPORTANT
app.set('views', path.join(__dirname, 'views'));
// engine
app.set('view engine', 'ejs');
//app.engine('view engine', require('ejs').renderFile);
// angular  dist -- VERY IMPORTANT
app.use(express.static(path.join(__dirname, 'public')));
// body bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));



// routes
//app.use('/', index);

app.use('/', routes);
app.use('/users', users);
app.use('/events', events);
// port.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

//var express = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//var mongoose = require('mongoose');

// require('./models/Users');
// require('./models/Evt_Admins');
// require('./models/Events');
// require('./models/Judges');
//
//
// var routes = require('./routes/index');
// var users = require('./routes/users');
// var events = require('./routes/events');


//var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var myapp = angular.module('myapp',[]);

myapp.directive('ngConfirmClick', [
  function(){
    return {
      link: function (scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.confirmedClick;
        element.bind('click',function (event) {
          if ( window.confirm(msg) ) {
            scope.$eval(clickAction)
          }
        });
      }
    };
  }]);
module.exports = myapp;
module.exports = app;
