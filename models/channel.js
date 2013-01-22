/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Timestamps = require('./timestamps')
  , Extends = require('./extends')
  , Schema = mongoose.Schema
  , db = mongoose.connect("mongodb://heroku_app10506621:rg03r91cg78i0qi9j88rrnnujq@ds037817.mongolab.com:37817/heroku_app10506621");

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
