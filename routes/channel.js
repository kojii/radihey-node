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
    ch.save(function(err){
      if (err) {
        UstreamChannel.find(function(err, channels) {
          res.render('channels/new', {
            channels: channels,
            channel: ch,
            token: req.body._csrf
          });
        });
      } else {
        res.redirect("/chs");
      }
    });
}

exports.update = function(req, res) {
  console.log(req.body.channel);
  UstreamChannel.find(function(err, channels) {
    UstreamChannel.findByIdAndUpdate(req.params.cid, req.body.channel, function(err, channel) {
      if (err) {
        res.render('/ch'+channel.id+'/edit', {
          channels: channels,
          channel: channel,
          token: req.body._csrf
        });
      } else {
        res.redirect('/ch/'+channel.id);
      }
    });
  });
}
