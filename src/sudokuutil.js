import React from 'react';

class SudokuUtil extends React.Component {
    /*
    getInitialGrid(game){
        var grid = [], row, cells;
        debugger;
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
        var row, col, sectors = [[],[],[],[],[],[],[],[],[]];
        for(row = 0;row < 9;row++){
            for(col = 0;col < 9;col++){
                sectors[this.getSector(row, col)].push(this.state.grid[row][col]);
            }
        }
        return sectors;
    }    
    */
}

export default SudokuUtil;