'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  _ = require('underscore');



module.exports = function (app) {
  app.use('/', router);
};

router.get('/wall', function (req, res, next) {
    res.render('wall',{
        title: 'Roda Twitter App'
    });
});



