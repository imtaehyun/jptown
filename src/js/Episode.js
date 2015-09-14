var React = require('react');

var Episode = React.createClass({
    render: function() {
        return (
            <a className="list-group-item episode" href={this.props.episode.link}>
                <div className="left">
                    <span>{this.props.episode.title}</span>
                </div>
                <div className="right">
                    <span>{this.props.episode.date}</span>
                </div>
            </a>
        )
    }
});

module.exports = Episode;