
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
    getCellInfo(row, col){
        return {
            'label': ''
        };
    }
    render(){
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <Board rows="3" cols="3" getCellInfo={(row, col) => this.getCellInfo(row, col)} onClick={this.handleClick}/>
            </div>
        )
    }
}

export default TicTacTow;