/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Timestamps = require('./timestamps')
  , Extends = require('./extends')
  , Schema = mongoose.Schema;

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

