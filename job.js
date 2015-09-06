var _ = require('underscore'),
    database = require('./database'),
    logger = require('./config/logger'),
    crawler = require('./crawler');

var lastVideoId = 0;

// 이미 등록된 비디오 최신 id를 가져온다.
database.getLastVideoId().then(function(videoId) {
    logger.info('lastVideoId: ', videoId);
    lastVideoId = videoId;

    // 최신 영상 episode들을 가져온다
    return crawler.getNewEpisodesList();
}).then(function(episodeList) {

    // 기등록된 episode 들은 제거
    episodeList = _.reject(episodeList, function(episode) {
        return episode.videoId <= lastVideoId;
    });

    // 각 영상의 video 리스트들을 수집해온다.
    _.each(episodeList, function(episode) {
        crawler.getEpisodeDetail(episode).then(function(episode) {
            // 수집해온 episode를 db에 등록한다.
            return database.addVideo(episode);
        }).then(function(response) {
            logger.debug(response);
        }).catch(function(err) {
            logger.error(err);
        });
    });

}).catch(function(err) {
    logger.error(err);
});