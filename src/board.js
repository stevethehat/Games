
import React from 'react';
import Square from './square'

class Board extends React.Component {
    render(){
        var rowI, colI, rowCells, rows, board;
        rows = []
        for(rowI = 0;rowI < this.props.rows;rowI++){
            rowCells = [];
            for(colI = 0;colI < this.props.cols;colI++){
                rowCells.push(
                    {
                        'label': this.props.getLabel(rowI, colI),
                        'row': rowI,
                        'col': colI
                    }
                );
            }

            rows.push(rowCells.map((cell, i) => {
                return <Square key={i} value={cell.label} onClick={() => this.props.onClick(cell.row, cell.col)}/>
            }));
        }

        board = rows.map((row, i) => <div key={i}>{row}</div>);

        return <div>{board}</div>
    }
}

export default Board;