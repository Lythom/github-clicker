var React = require('react');
var GenerateCodeButton = require('./GenerateCodeButton.js');
var GenerateCodeDisplay = require('./GenerateCodeDisplay.js');


var App = React.createClass({
    componentDidMount: function () {
        // this.refs.myInput.getDOMNode().focus();
    },
    getInitialState: function(){
        return {
            nbClick:0
        };
    },

    handleClick: function(){
        this.setState({
            nbClick:this.state.nbClick + 1
        });
    },

    render: function(){

        inlineCss={
            background:'white',
            opacity:'0.9'
        }

        return(
            <div style={inlineCss}>
                <h1>Github - Clicker !!!</h1>
                <p>
                    <strong>Lignes de code : </strong>  <GenerateCodeDisplay lineOfCode={this.state.nbClick} />
                </p>

                <p>
                    <GenerateCodeButton onClick={this.handleClick}/>
                </p>
            </div>
        )
    }

});
module.exports=App;