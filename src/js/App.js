var React = require('react'),
    EpisodeList = require('./EpisodeList');

var App = React.createClass({

    render: function() {

        return (
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <EpisodeList />
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