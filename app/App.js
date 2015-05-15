var React = require('react');
var $ = require('jquery');
var GenerateCodeButton = require('./GenerateCodeButton.js');
var GenerateCodeDisplay = require('./GenerateCodeDisplay.js');


var App = React.createClass({
    componentDidMount: function () {
        // this.refs.myInput.getDOMNode().focus();
        setInterval(this.saveCountToServer, this.props.pollInterval);
    },
    saveCountToServer: function(){
        $.post('count',{nbClick: this.state.nbClick});
    },
    getInitialState: function(){
        return {
            nbClick: parseInt(this.props.nbClick)
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