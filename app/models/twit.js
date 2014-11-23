// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TwitSchema = new Schema({
  user: String,
  text: String,
  tags: Array,
  time: String
},{ autoIndex: true });

TwitSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('rodaTwit', TwitSchema);

