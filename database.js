var Promise = require('bluebird'),
    _ = require('underscore'),
    Parse = require('node-parse-api').Parse;

var db = function() {
    this.parse = new Parse({
        app_id: process.env.PARSE_APP_ID,
        api_key: process.env.PARSE_API_KEY
    });
};

db.prototype.getLastVideoId = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.parse.find('Video', { order: '-videoId', limit: 1 }, function(err, response) {
            if (err) throw new Error(err);

            resolve((response.results.length == 1) ? response.results[0].videoId : 0);
        });
    });
};

db.prototype.addVideo = function(episode) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.parse.insert('Video', episode, function(err, response) {
            if (err) throw new Error(err);
            else resolve(episode);
        });
    });
};

module.exports = new db();