
import React from 'react';
import Board from './board'

class TicTacTow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'a': 'b'
        }
    }
    handleClick(row, col){
        alert('handle click ' + row + ' ' + col);
    }
    getLabel(row, col){
        return "";
    }
    render(){
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <Board rows="3" cols="3" getLabel={this.getLabel} onClick={this.handleClick}/>
            </div>
        )
    }
}

export default TicTacTow;