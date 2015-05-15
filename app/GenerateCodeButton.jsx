var React = require('react');
var GenerateCodeButton = React.createClass({

    handleClick: function(){
        this.props.onClick();
    },

    render: function() {
        return (
            <input type="button" value="Généner du code" onClick={this.handleClick} />
        );
    }
});


module.exports = GenerateCodeButton;