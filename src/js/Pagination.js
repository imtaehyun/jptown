var React = require('react');

var Pagination = React.createClass({
    render: function () {

        return (
            <nav>
                <ul className="pager">
                    <li><a href="#" onClick={this.props.prevPage}>Previous</a></li>
                    <li><a href="#" onClick={this.props.nextPage}>Next</a></li>
                </ul>
            </nav>
        );
    }
});

module.exports = Pagination;