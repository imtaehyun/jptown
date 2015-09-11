var _ = require('underscore'),
    Promise = require('bluebird'),
    moment = require('moment'),
    database = require('./database'),
    logger = require('./config/logger'),
    crawler = require('./crawler');

var job = {};

job.collectLatestEpisodes = function() {
    // 이미 등록된 비디오 최신 id를 가져온다.
    Promise.using(database.getLatestEpisodeId(), crawler.getRecentEpisodeList(), function (lastVideoId, episodeList) {
        // 기등록된 episode 들은 제거
        return Promise.filter(episodeList, function (episode) {
            return episode.videoId > lastVideoId;
        });
    }).map(function(episode) {
        // title, videoList 추가
        return Promise.join(crawler.getEpisodeTitle(episode), crawler.getEpisodeVideoList(episode), function(title, videoList) {
            episode.title = title;
            episode.videoList = videoList;
            return episode;
        });
    }).map(function(episode) {
        return database.addEpisode(episode);
    }).then(function(episodeList) {
        logger.info('새로운 Episode ' + episodeList.length + '건 등록됨');
    }).catch(function(err) {
        logger.error(err);
    });
};

job.updateVideoList = function() {

    var condStartDate = moment().subtract(2, 'days').hours(0).minutes(0).seconds(0).format(),
        condEndDate = moment().hours(0).minutes(0).seconds(0).subtract(1, 'seconds').format();

    var condition = {
        createdAt: {
            '$gte': condStartDate,
            '$lte': condEndDate
        }
    };

    database.getEpisodeList(condition).then(function(episodeList) {
        logger.info('대상: ' + condStartDate + ' ~ ' + condEndDate + ' ' + episodeList.length + '건');
    }).map(function(episode) {
        return crawler.getEpisodeVideoList(episode).then(function(videoList) {
            if (episode.videoList.length < videoList.length) {
                episode.videoList = videoList;
                return episode;
            } else {
                return null;
            }
        });
    }).filter(function(episode) {
        return episode != null;
    }).map(function(episode) {
        return database.updateEpisode(episode);
    }).then(function(episodeList) {
        logger.info('Episode ' + episodeList.length + '건의 videoList 갱신됨');
    }).catch(function (err) {
        logger.error(err);
    });

};

module.exports = job;