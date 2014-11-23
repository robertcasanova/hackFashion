'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  _ = require('underscore'),
  rodaTwit = mongoose.model('rodaTwit');


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  rodaTwit.find({},function (err, twits) {
    console.log(err);
    if (err) return next(err);
    res.render('index', {
      title: 'Roda Twitter App',
      twits: twits
    });
  });
});

router.get('/msg/:id', function(req,res,next) {

    rodaTwit.findById(req.params.id, function(err, twit){
        if (err) return next(err);
        res.render('msg', {
            title:'Roda Msg',
            twit: twit
        });
    });

});



router.post('/api/twits', function(req,res){
    console.log(req.body);
    var tags = [];
    _.each(req.body.msg.split('#'), function(str, idx){
        if(idx > 0) {
            tags.push(str.split(" ")[0].toLowerCase());
        }
    });

    var twit = new rodaTwit({
        'user': '',
        'text': req.body.msg,
        'tags': tags,
        'time': (new Date().getTime()) / 1000
    });
    twit.save();
    res.json({
        'status': 'OK',
        'id': twit.id
    });
});

router.get('/api/twits', function(req,res,next) {
    rodaTwit.find({}, function(err,twits) {
        if (err) return next(err);
        res.json(twits);
    }).sort('date');
});

router.get('/api/twits/:id', function(req,res,next) {
    rodaTwit.findById(req.params.id, function(err, twit){
        if (err) return next(err);
        res.json(twit);
    });
});

