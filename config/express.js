var express = require('express');
var glob = require('glob');
var mongoose = require('mongoose');
var _ = require('underscore');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var Twitter = require('node-tweet-stream');

var t = new Twitter({
    consumer_key: 'L6fRaXOpiWKm4iCSIFlqXk3Wl',
    consumer_secret: 'gkngP5uPGqcjMAH2Xbynqc6Yv6PT0NEd6DvWrYBy3s4won2Vk1',
    token: '96738731-7nfNeFaCqINPhlamSsk6YZswx878u4Z992WVJTsyY',
    token_secret: 'D9UrHMdpJlLRnG7j6qTux9ZgPEB9seDNIrBIl12qRWay9'
});

var rodaTwit = mongoose.model('rodaTwit');


module.exports = function(app, config) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  t.on('tweet', function(tweet) {
    console.log(tweet);
    var tags = [];
    _.each(tweet.text.split('#'), function(str,idx){
        if(idx > 0) {
            tags.push(str.split(" ")[0].toLowerCase());
        }
    });

    var twit = new rodaTwit({
        'user': tweet.user.name,
        'text': tweet.text,
        'tags': tags,
        'time': tweet.timestamp_ms
    });
    twit.save();

  });

  t.on('error', function (err) {
    console.log('error twitter')
  })

  t.track('#hackfashion');



};
