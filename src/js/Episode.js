var React = require('react');

var Episode = React.createClass({
    render: function() {
        var episode = {
            "createdAt": "2015-09-06T07:03:12.629Z",
            "date": "20150905",
            "link": "http://youtubeowaraitv.blog32.fc2.com/blog-entry-73118.html",
            "objectId": "5zOoWc9XhB",
            "title": "ランク王国",
            "updatedAt": "2015-09-06T07:03:12.629Z",
            "videoId": "73118",
            "videoList": [
                {
                    "link": "http://video.fc2.com/content/201509060M0XzVnt/",
                    "source": "FC2"
                }
            ]
        };
        return (
            <a className="list-group-item episode" href={episode.link}>
                <div className="left">
                    <span>{episode.title}</span>
                </div>
                <div className="right">
                    <span>{episode.date}</span>
                </div>
            </a>
        )
    }
});

module.exports = Episode;