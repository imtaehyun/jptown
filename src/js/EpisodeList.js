var React = require('react'),
    Episode = require('./Episode');

var EpisodeList = React.createClass({
    render: function() {
        var list = [];
        this.props.list.forEach(function(episode) {
            list.push(<Episode episode={episode} />);
        });
        return (
            <div className="list-group">
                {list}
            </div>
        )
    }
});

module.exports = EpisodeList;