
import React from 'react';
import Square from './square';

class Numbers extends React.Component {
    render(){
        const noneButton = this.props.noneButton ? this.props.noneButton : 'Clear';
        var numbers = [], num;
        for(num = Number(this.props.from); num <= Number(this.props.to);num++){
            numbers.push(num);
        }
        const numbersJSX = numbers.map((value, i) => {
            return(
                <Square key={value} onClick={() => this.props.onClick(value)}>{value}</Square>
            )
        });
        return(
            <div>{numbersJSX}<Square key="none" onClick={() => this.props.onClick('none')}>{noneButton}</Square></div>
        )
    }
}

export default Numbers;