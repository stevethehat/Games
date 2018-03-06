
import React from 'react';

class Square extends React.Component {
    render(){
        if(this.props.value !== ""){
            return (
                <button onClick={this.props.onClick}>{this.props.value}</button>
            )    
        } else {
            return (
                <button onClick={this.props.onClick}>&nbsp;</button>
            )    
        }
    }
}

export default Square;