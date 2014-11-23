var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  _ = require('underscore'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var app = express();


require('./config/express')(app, config);

var server = app.listen(config.port);

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('new:twit', function (data) {
        socket.broadcast.emit('new:twit',data);
    });
});
