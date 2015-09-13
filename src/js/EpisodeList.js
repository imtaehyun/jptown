var React = require('react'),
    Episode = require('./Episode');

var EpisodeList = React.createClass({
    render: function() {
        return (
            <div className="list-group">
                <Episode />
            </div>
        )
    }
});

module.exports = EpisodeList;