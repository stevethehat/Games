
import React from 'react';
import Board from './board'
import Numbers from './numbers'

class Sudoku extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'currentNum': 0
        }
    }
    cellClick(row, col){
        alert('handle click');
    }
    numberClick(num){
        this.setState(
            {
                'currentNum': num
            }
        )
    }
    getLabel(row, col){
        var pos, label;
        pos = (row *3) + col;
        label = (this.game[pos] === "0") ? "" : this.game[pos];
        return label;
    }
    render(){
        const currentNum = this.state.currentNum;
        return (
            <div className="sudoku">
                <h1>Sudoku</h1>
                <br/>
                <Board rows="9" cols="9" getLabel={this.getLabel} onClick={this.cellClick}
                    game="400508100200009005075060900000800091109007500730000400820604310013702050900003070"
                />
                <div>
                    <b>Current number: {currentNum}</b>
                </div>
                {/*
                have to use the one below to pass num through
                <Numbers onClick={() => this.numberClick()}/>
                */}
                <Numbers onClick={num => this.numberClick(num)}/>
            </div>
        )
    }
}

export default Sudoku;