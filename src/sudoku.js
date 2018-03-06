
import React from 'react';
import Board from './board'

class Sudoku extends React.Component {
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
        var pos, label;
        pos = (row *3) + col;
        label = (this.game[pos] === "0") ? "" : this.game[pos];
        return label;
    }
    render(){
        return (
            <div>
                <h1>Sudoku</h1>
                <Board rows="9" cols="9" getLabel={this.getLabel} onClick={this.handleClick}
                    game="400508100200009005075060900000800091109007500730000400820604310013702050900003070"
                />
            </div>
        )
    }
}

export default Sudoku;