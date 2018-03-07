
import React from 'react';
import {SudokuUtil, checkGoResult} from './sudokuutil';
import Board from './board';
import Numbers from './numbers';

class Sudoku extends React.Component {
    constructor(props){
        super(props);

        this.game="400508100200009005075060900000800091109007500730000400820604310013702050900003070";
        this.state = {
            'currentNum': 1,
            'mode': 'play',
            'lastClick': {'row': 0, 'col': 0},
            'grid': SudokuUtil.getInitialGrid(this.game)
        }
    }
    
    cellClick(row, col){
        var legalNums,
            grid = this.state.grid.slice();
        const lastClick = {'row': row, 'col': col},
                util = new SudokuUtil(grid),
                checkResult = util.checkGo(row, col, this.state.currentNum);

        if(this.state.currentNum !== 'none'){
            debugger;
            if(checkResult !== checkGoResult.ok){
                console.log('illegal click');
                return;
            }
            grid[row][col] = this.state.currentNum;
            this.setState(
                {
                    'currentNum': this.state.currentNum,
                    'mode': 'play',
                    'lastClick': lastClick,
                    'grid': grid
                }
            );
        } else {
            legalNums = util.getAvailableNums(row, col);
            this.setState(
                {
                    'currentNum': this.state.currentNum,
                    'mode': 'hint',
                    'lastClick': lastClick,
                    'grid': this.state.grid
                }
            );            
        }
    }
    numberClick(num){
        const mode = num !== 'none' ? 'play' : 'hint';
        this.setState(
            {
                'currentNum': num,
                'mode': mode,
                'lastClick': this.state.lastClick,
                'grid': this.state.grid
            }
        )
    }
    getCellInfo(row, col){
        const util = new SudokuUtil(this.state.grid),
            label = this.state.grid[row][col];
        var cssClass = 'cell-light';

        switch(util.getSectorId(row, col)){
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
        const currentNum = this.state.currentNum,
                row = this.state.lastClick.row,
                col = this.state.lastClick.col,
                util = new SudokuUtil(this.state.grid),
                availableNums = util.getAvailableNums(row, col);

        var hint = '';

        if(this.state.mode === 'hint' && this.state.grid[row][col] === 0){
            hint = `Hint for ${col +1} x ${row +1}: ${availableNums}`;
        }
        return (
            <div className="sudoku">
                <h1>Sudoku</h1>
                <br/>
                <Board rows="9" cols="9" getCellInfo={(row, col) => this.getCellInfo(row, col)} onClick={(row, col) => this.cellClick(row, col)}/>
                <div className="current-number">
                    <b>Current number: {currentNum}</b>
                </div>
                <div className="hint">
                    <b>{hint}</b>
                </div>
                <Numbers from="1" to="9" noneButton="Hint" onClick={num => this.numberClick(num)}/>
            </div>
        )
    }
}

export default Sudoku;