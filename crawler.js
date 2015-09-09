var Xray = require('x-ray'),
    x = Xray(),
    Promise = require('bluebird'),
    _ = require('underscore'),
    moment = require('moment'),
    winston = require('winston');

var crawler = function() {};

crawler.prototype.getRecentEpisodeList = function() {
    return new Promise(function (resolve, reject) {
        x('http://youtubeowaraitv.blog32.fc2.com/', 'div#mainBlock div.index_area div a', [{
            link: '@href',
            title: '@title'
        }])(function (err, list) {
            if (err) throw new Error(err);

            list = _.map(list, function (episode) {
                // episode id 분리
                episode.videoId = episode.link.substring(episode.link.lastIndexOf('-') + 1, episode.link.lastIndexOf('.'));

                // title 과 날짜 분리
                var episodeDate = episode.title.substring(episode.title.lastIndexOf('　') + 1, episode.title.length);
                episode.date = moment(moment().year() + '年' + episodeDate, 'YYYYMMDD').format('YYYYMMDD');

                // title 추출
                episode.title = episode.title.substring(0, episode.title.lastIndexOf('　'));

                return episode;
            });

            resolve(list);
        });
    });
};
crawler.prototype.getEpisodeTitle = function(episode) {
    return new Promise(function(resolve, reject) {
        x(episode.link, 'div#mainBlock div.mainEntryBody')(function (err, body) {
            if (err) throw new Error(err);

            var matchArr = body.match(/201\d/g);

            var title = episode.title;
            if (matchArr.length > 0) {
                title = body.substring(0, body.indexOf(matchArr[0])).trim();
            }

            resolve(title);
        });
    });
};

crawler.prototype.getEpisodeVideoList = function(episode) {
    return new Promise(function (resolve, reject) {
        x(episode.link, 'div#mainBlock div.mainEntryMore a', [{
            link: '@href',
            source: '@html'
        }])(function (err, list) {
            if (err) throw new Error(err);

            // 괄호가 있는 것들만 replace해서 추리고, 나머지는 null
            var videoList = _.chain(list)
                .map(function(video) {
                    if (video.source.indexOf('&#x3010;') > -1) {
                        video.source = video.source.replace(/(&#x3010;|&#x3011;)/g, '');
                        return video;
                    } else {
                        return null;
                    }
                })
                .reject(function(video) {
                    return video === null;
                })
                .value();

            resolve(videoList);
        });
    });
};

module.exports = new crawler();