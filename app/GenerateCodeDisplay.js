var React = require('react');
var GenerateCodeDisplay = React.createClass({


    render: function() {
        return (
            <p>{this.props.lineOfCode}</p>
        );
    }
});

module.exports = GenerateCodeDisplay;