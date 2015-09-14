var React = require('react'),
    EpisodeList = require('./EpisodeList');

var App = React.createClass({
    getInitialState: function() {
        return {
            episodeList: []
        }
    },

    componentDidMount: function() {
        $.get('/episodes', function(results) {
            this.setState({
                episodeList: results
            });
        }.bind(this));
    },

    render: function() {

        return (
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <EpisodeList list={this.state.episodeList} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

React.render(
    <App />,
    document.body
);