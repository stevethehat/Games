
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
        this.legalClick(row, col);        
    }
    legalClick(row, col){
        var sectors;
        if(this.getRow(row).indexOf(this.state.currentNum) > -1){
            return false
        } else if (this.getColumn(col).indexOf(this.state.currentNum) > -1){
            return false;
        } else {
            // do the sectors
            debugger;
            sectors = this.getSectors();
            return false
        }
    }
    numberClick(num){
        this.setState(
            {
                'currentNum': num,
                'grid': this.state.grid
            }
        )
    }
    getLegalNums(){

    }
    getColumn(col){
        return this.state.grid.map((row, i) => row[col]);
    }
    getRow(row){
        return this.state.grid[row];
    }
    getSector(row, col){
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
        var row, col, cell, sector, sectors = [[],[],[],[],[],[],[],[],[]];
        for(row = 0;row < 9;row++){
            for(col = 0;col < 9;col++){
                cell = this.state.grid[row][col];
                sector = this.getSector(row, cell);
                sectors[sector].push(cell);
            }
        }
        return sectors;
    }
    getCellInfo(row, col){
        var label, cssClass = 'cell-light';
        label = this.state.grid[row][col];

        switch(row){
            case 0: case 1: case 2: case 6: case 7: case 8:
                switch(col){
                    case 0: case 1: case 2: case 6: case 7: case 8:
                        cssClass = 'cell-dark';
                        break;
                    default:
                        cssClass = 'cell-light';
                        break;
                }
                break;
            default:
                switch(col){
                    case 0: case 1: case 2: case 6: case 7: case 8:
                        cssClass = 'cell-light';
                        break;
                    default:
                        cssClass = 'cell-dark';
                    break;
                }
                break;
        }
        return {
            'label': (label === "0") ? "" : label,
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