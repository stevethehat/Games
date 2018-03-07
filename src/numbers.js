
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
                <Square key={value} value={value} onClick={() => this.props.onClick(value)}/>
            )
        });
        return(
            <div>{numbersJSX}<Square key="none" value={noneButton} onClick={() => this.props.onClick('none')}/></div>
        )
    }
}

export default Numbers;