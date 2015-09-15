var React = require('react'),
    EpisodeList = require('./EpisodeList'),
    Pagination = require('./Pagination');

var App = React.createClass({
    getInitialState: function() {
        return {
            episodeList: [],
            page: 1,
        }
    },

    componentDidMount: function() {
        this.changePage(this.state.page);
    },

    prevPage: function () {
        this.changePage((this.state.page > 1) ? this.state.page - 1 : 1);
    },

    nextPage: function () {
        this.changePage(this.state.page + 1);
    },

    changePage: function(page) {
        $.get('/episodes/' + page, function(results) {
            this.setState({
                page: page,
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
                    <div className="row">
                        <div className="col-md-12">
                            <Pagination prevPage={this.prevPage} nextPage={this.nextPage} />
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