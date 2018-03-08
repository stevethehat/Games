import React from 'react';

export class SudokuUtil {
    constructor(grid){
        this.grid = grid;
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
    checkGo(row, col, currentNum){
        var sector,
            result = [];

        if(this.getRow(row).indexOf(currentNum) > -1){
            result.push(checkGoResult.rowError);
        }
        if (this.getColumn(col).indexOf(currentNum) > -1){
            result.push(checkGoResult.colError);
        }
        // do the sectors
        sector = this.getSector(row, col);
        if(sector.indexOf(currentNum) > -1){
            result.push(checkGoResult.sectorError);
        }

        if(result.length === 0){
            return checkGoResult.ok;
        } else {
            return result;
        }
    }  
    getColumn(col){
        // no need for the zeros
        return this.grid.map((row, i) => row[col]).filter((cell) => cell !== 0);
    }
    getRow(row){
        return this.grid[row].filter((cell) => cell !== 0);
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
                sectors[this.getSectorId(row, col)].push(this.grid[row][col]);
            }
        }
        return sectors;
    }  
    check(){

    }
    solve(){
        while(this.fillKnownCells() > 0){
            console.log('GOT THIS');
            console.log(this.grid);
        }
        return this.grid;
    }
    fillKnownCells(){
        var row, col, availableNums, found = 0;
        for(row = 0;row < 9;row++){
            for(col = 0;col < 9;col++){
                if(this.grid[row][col] === 0){
                    availableNums = this.getAvailableNums(row, col);
                    //console.log(`${row} x ${col} - ${availableNums}`);
                    if(availableNums.length === 1){
                        found++;
                        console.log(`${row} x ${col} - FIXED ${availableNums[0]}`);
                        this.grid[row][col] = availableNums[0];
                    }
                }
            }
        }
        return found
    }


    static getInitialGrid(game){
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
}

export const checkGoResult = {
    none: -1,
    ok: 0,
    rowError: 1,
    colError: 2,
    sectorError: 3
}

