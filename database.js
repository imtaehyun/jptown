var Promise = require('bluebird'),
    _ = require('underscore'),
    Parse = require('node-parse-api').Parse,
    logger = require('./config/logger');

var db = function() {
    this.parse = new Parse({
        app_id: process.env.PARSE_APP_ID,
        api_key: process.env.PARSE_API_KEY
    });
};

db.prototype.getLatestEpisodeId = function() {
    var self = this;

    return new Promise(function(resolve, reject) {
        self.parse.find('Video', { order: '-videoId', limit: 1 }, function(err, response) {
            if (err) throw new Error(err);

            resolve((response.results.length == 1) ? response.results[0].videoId : 0);
        });
    });
};

db.prototype.getEpisodeList = function(condition) {
    var self = this;
    var condition = condition || {};

    return new Promise(function(resolve, reject) {
        self.parse.find('Video', { where: condition, order: 'videoId'}, function(err, response) {
            if (err) throw new Error(err);

            resolve(response.results);
        });
    });
};

db.prototype.addEpisode = function(episode) {
    var self = this;

    return new Promise(function(resolve, reject) {
        self.parse.insert('Video', episode, function(err, response) {
            if (err) throw new Error(err);
            else resolve(episode);
        });
    });
};

db.prototype.updateEpisode = function(episode) {
    var self = this;

    return new Promise(function(resolve, reject) {
        self.parse.update('Video', episode.objectId, { videoList: episode.videoList }, function(err, response) {
            if (err) throw new Error(err);

            else resolve(episode);
        });
    });
};

db.prototype.getJobList = function() {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.parse.find('Job', {}, function (err, response) {
            if (err) throw new Error(err);

            resolve(response.results);
        });
    });
};

db.prototype.updateJobLastExecTime = function(job) {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.parse.update('Job', job.objectId, { lastExecTime: job.lastExecTime }, function (err, response) {
            if (err) throw new Error(err);

            resolve(response);
        });
    });
};

module.exports = new db();