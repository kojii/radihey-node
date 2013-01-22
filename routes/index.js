var UstreamChannel = require("../models/channel");

/*
 * GET home page.
 */
exports.index = function(req, res) {
    UstreamChannel.find(function(err, channels) {
        res.render("index", { channels: channels });
    });
};
