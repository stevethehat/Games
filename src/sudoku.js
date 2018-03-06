
import React from 'react';
import Board from './board'
import Numbers from './numbers'

class Sudoku extends React.Component {
    constructor(props){
        super(props);

        this.game="400508100200009005075060900000800091109007500730000400820604310013702050900003070";
        this.state = {
            'currentNum': 1,
            'grid': this.getInitialGrid(this.game)
        }
    }
    getInitialGrid(game){
        var grid = [], row;
        if(game !== undefined){
            for(row = 0; row < 9;row++){
                grid.push(Array.from(game.substr(0, 9)));
                game = game.substr(9);
            }
        }
        return grid;
    }
    cellClick(row, col){
        var grid = this.state.grid.slice();
        grid[row][col] = String(this.state.currentNum);
        this.setState(
            {
                'currentNum': this.state.currentNum,
                'grid': grid
            }
        );
    }
    numberClick(num){
        this.setState(
            {
                'currentNum': num,
                'grid': this.state.grid
            }
        )
    }
    getLabel(row, col){
        var label = this.state.grid[row][col];
        return (label === "0") ? "" : label;
    }
    render(){
        const currentNum = this.state.currentNum;
        return (
            <div className="sudoku">
                <h1>Sudoku</h1>
                <br/>
                <Board rows="9" cols="9" getLabel={(row, col) => this.getLabel(row, col)} onClick={(row, col) => this.cellClick(row, col)}/>
                <div className="current-number">
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