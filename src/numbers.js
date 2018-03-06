
import React from 'react';
import Square from './square';

class Numbers extends React.Component {
    render(){
        const numbers = [0,1,2,3,4,5,6,7,8,9].map((value, i) => {
            return(
                <Square key={value} value={value} onClick={() => this.props.onClick(value)}/>
            )
        })
        ;
        return(
                <div>{numbers}</div>
        )
    }
}

export default Numbers;