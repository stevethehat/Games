
import React from 'react';
import SudokuUtil from './sudokuutil';
import Board from './board';
import Numbers from './numbers';

class Sudoku extends SudokuUtil {
    constructor(props){
        super(props);

        this.game="400508100200009005075060900000800091109007500730000400820604310013702050900003070";
        this.state = {
            'currentNum': 1,
            'grid': this.getInitialGrid(this.game)
        }
    }
    cellClick(row, col){
        var grid = this.state.grid.slice();
        if(!this.legalClick(row, col)){
            console.log('illegal click');
            return;
        }
        grid[row][col] = this.state.currentNum;
        this.setState(
            {
                'currentNum': this.state.currentNum,
                'grid': grid
            }
        );
    }
    legalClick(row, col){
        var sectors,
            currentNum = this.state.currentNum;

        if(this.getRow(row).indexOf(currentNum) > -1){
            return false
        } else if (this.getColumn(col).indexOf(currentNum) > -1){
            return false;
        } else {
            // do the sectors
            sectors = this.getSectors();
            sectors.forEach(function(sector){
                if(sector.indexOf(currentNum) > -1){
                    return false;
                }
            });
        }
        return true;
    }
    numberClick(num){
        this.setState(
            {
                'currentNum': num,
                'grid': this.state.grid
            }
        )
    }
    getCellInfo(row, col){
        var label, cssClass = 'cell-light';
        label = this.state.grid[row][col];

        switch(this.getSector(row, col)){
            case 0: case 2: case 4: case 6: case 8:
                cssClass = 'cell-dark';
                break;
            default:
                cssClass = 'cell-light';
                break;
        }
        return {
            'label': (label === 0) ? "" : label,
            'class': cssClass
        }
    }
    render(){
        const currentNum = this.state.currentNum;
        return (
            <div className="sudoku">
                <h1>Sudoku</h1>
                <br/>
                <Board rows="9" cols="9" getCellInfo={(row, col) => this.getCellInfo(row, col)} onClick={(row, col) => this.cellClick(row, col)}/>
                <div className="current-number">
                    <b>Current number: {currentNum}</b>
                </div>
                <Numbers from="1" to="9" onClick={num => this.numberClick(num)}/>
            </div>
        )
    }
}

export default Sudoku;