var React = require('react'),
    Episode = require('./Episode');

var EpisodeList = React.createClass({
    render: function() {

        var episodeList = this.props.list.map(function(episode) {
            return <Episode episode={episode} />;
        });

        return (
            <ul className="list-group">
                {episodeList}
            </ul>
        )
    }
});

module.exports = EpisodeList;