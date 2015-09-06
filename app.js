var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var allArticles = require('./routes/all_articles');

var app = express();
var server = require('http').Server(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// production log
// output to a file instead of console
logger.token('reqBody', function (req) {
  return ' request: ' + JSON.stringify(req.body);
});
if (app.get('env') == 'production') {
  fs.exists('log', function (flag) {
    flag ? null : fs.mkdir('log');
  });
  var logFile = fs.createWriteStream('./log/production.log', {flags: 'a'});
  app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"  :reqBody :status :res[content-length]', {stream: logFile }));
} else {
  app.use(logger(':method :url :reqBody :status :response-time ms - :res[content-length]'));
}

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/all_articles', allArticles);

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
  res.render('index');
});

module.exports = app;
