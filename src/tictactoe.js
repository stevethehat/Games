
import React from 'react';
import Board from './board'

class TicTacTow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'a': 'b'
        }
    }
    handleClick(){
        alert('handle click');
    }
    getLabel(row, col){
        return (row *3) + col;
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