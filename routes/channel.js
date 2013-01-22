var UstreamChannel = require("../models/channel");

exports.index = function(req, res) {
    UstreamChannel.find(function(err, channels) {
        res.render("channels/index", { channels: channels });
    });
};

exports.show = function(req, res) {
    UstreamChannel.find(function(err, channels) {
        UstreamChannel.findById(req.params.cid, function(err, channel) {
            if (err) console.log(err);
            res.render('channels/show', {
                cid: req.params.cid,
                channels: channels,
                channel: channel
            });
        });
    });
};

exports.new = function(req, res) {
    UstreamChannel.find(function(err, channels) {
        res.render("channels/new", { channels: channels, channel: new UstreamChannel });
    });
};

exports.edit = function(req, res) {
    UstreamChannel.find(function(err, channels) {
        UstreamChannel.findById(req.params.cid, function(err, channel) {
            if (err) console.log(err);
            res.render('channels/edit', {
                channels: channels,
                channel: channel
            });
        });
    });
};

exports.create = function(req, res) {
    console.log(req.body.channel);
    var ch = new UstreamChannel(req.body.channel);
    ch.save();
    res.redirect("/chs");
}
