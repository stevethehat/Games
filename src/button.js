
import React from 'react';

class Button extends React.Component {
    render(){
        return (
            <button className={this.props.className} onClick={this.props.onClick}>{this.props.children}</button>
        )    
    }
}

export default Button;