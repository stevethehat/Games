
import React from 'react';
import SudokuUtil from './sudokuutil';
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
            'grid': this.getInitialGrid(this.game)
        }
    }
    getInitialGrid(game){
        var grid = [], row, cells;
        if(game !== undefined){
            for(row = 0; row < 9;row++){
                // this will be an array of strings
                cells = Array.from(game.substr(0, 9));
                // convert to ints
                cells = cells.map((cell, i) => Number(cell))
                grid.push(cells);
                game = game.substr(9);
            }
        }
        return grid;
    }
    
    cellClick(row, col){
        var legalNums,
            grid = this.state.grid.slice(),
            lastClick = {'row': row, 'col': col},
            util = new SudokuUtil(grid);

        if(this.state.currentNum !== 'none'){
            if(!util.legalClick(row, col, this.state.currentNum)){
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

    /*
    getInitialGrid(game){
        var grid = [], row, cells;
        if(game !== undefined){
            for(row = 0; row < 9;row++){
                // this will be an array of strings
                cells = Array.from(game.substr(0, 9));
                // convert to ints
                cells = cells.map((cell, i) => Number(cell))
                grid.push(cells);
                game = game.substr(9);
            }
        }
        return grid;
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
    // 4 5 8 1 7 3 2 1 4 2 7 5
    // 1 2 3 4 5 7 8 = 6 9
    getAvailableNums(row, col){
        var nums, availableNums;
        nums = new Set([].concat(this.getRow(row))
                .concat(this.getColumn(col))
                .concat(this.getSector(row, col)));
        availableNums = [1,2,3,4,5,6,7,8,9].filter((num) => !nums.has(num));
        console.log(`available nums for ${row} x ${col} = ${availableNums}`);
        
        return availableNums;
    }
    getColumn(col){
        // no need for the zeros
        return this.state.grid.map((row, i) => row[col])
                              .filter((cell) => cell !== 0);
    }
    getRow(row){
        return this.state.grid[row]
                .filter((cell) => cell !== 0);
    }
    getSector(row, col){
        var sectors = this.getSectors();
        return sectors[this.getSectorId(row, col)];
    }
    getSectorId(row, col){
        // top row
        if(row <= 2 && col <= 2){
            return 0;
        }
        if(row <= 2 && (col > 2 && col <= 5)){
            return 1;
        }
        if(row <= 2 && col > 5){
            return 2;
        }
        // middle row
        if((row > 2 && row <= 5) && col <= 2){
            return 3;
        }
        if((row > 2 && row <= 5) && (col > 2 && col <= 5)){
            return 4;
        }
        if((row > 2 && row <= 5) && col > 5){
            return 5;
        }
        // bottom row
        if(row > 5 && col <= 2){
            return 6;
        }
        if(row > 5 && (col > 2 && col <= 5)){
            return 7;
        }
        if(row > 5 && col > 5){
            return 8;
        }        
    }
    getSectors(){
        var row, col, sectors = [[],[],[],[],[],[],[],[],[]];
        for(row = 0;row < 9;row++){
            for(col = 0;col < 9;col++){
                sectors[this.getSectorId(row, col)].push(this.state.grid[row][col]);
            }
        }
        return sectors;
    }
    */    
}

export default Sudoku;