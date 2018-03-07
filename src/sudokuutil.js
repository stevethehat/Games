import React from 'react';

class SudokuUtil extends React.Component {
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
}

export default SudokuUtil;