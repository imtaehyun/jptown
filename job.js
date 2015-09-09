var _ = require('underscore'),
    database = require('./database'),
    logger = require('./config/logger'),
    crawler = require('./crawler'),
    Promise = require('bluebird');

// 이미 등록된 비디오 최신 id를 가져온다.
Promise.using(database.getLastVideoId(), crawler.getRecentEpisodeList(), function (lastVideoId, episodeList) {
    logger.info('=== [JOB] CollectNewEpisodes 시작 ===');
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
    return database.addVideo(episode);
}).then(function(episodeList) {
    logger.info('새로운 Episode ' + episodeList.length + '건 등록됨');
}).catch(function(err) {
    logger.error(err);
}).finally(function() {
    logger.info('=== [JOB] CollectNewEpisodes 종료 ===');
});