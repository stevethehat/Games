
import React from 'react';

class Square extends React.Component {
    render(){
        if(this.props.children !== ""){
            return (
                <button className={this.props.className} onClick={this.props.onClick}>{this.props.children}</button>
            )    
        } else {
            return (
                <button className={this.props.className} onClick={this.props.onClick}>&nbsp;</button>
            )    
        }
    }
}

export default Square;