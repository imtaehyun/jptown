var React = require('react');

var Episode = React.createClass({
    render: function() {
        var episode = this.props.episode;
        var videoList = episode.videoList.map(function(video) {
            return <a href={video.link} target="_blank"><span className="label label-default">{video.source}</span></a>;
        });
        return (
            <li className="list-group-item episode">
                <div className="left">
                    <a href={episode.link} target="_blank"><span>{episode.title}</span></a>
                    {videoList}
                </div>
                <div className="right">
                    <span>{episode.date}</span>
                </div>
            </li>
        );
    }
});

module.exports = Episode;