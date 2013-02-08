/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Timestamps = require('./timestamps')
  , Extends = require('./extends')
  , Schema = mongoose.Schema
  , db = mongoose.connect("mongodb://heroku_app11694290:iqcjfn8kj0gbkuqigp1p9pme5j@ds037997.mongolab.com:37997/heroku_app11694290");

var Channel = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    code: String,
    description: String,
    owner: Schema.ObjectId
}, { collection : 'channels' });

Channel.plugin(Timestamps, {index: true});
Channel.plugin(Extends, {index: true});

mongoose.model('UstreamChannel', Channel);
module.exports = db.model("UstreamChannel");
