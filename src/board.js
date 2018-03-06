
import React from 'react';
import Square from './square'

class Board extends React.Component {
    render(){
        var row, col, rowCells, rows, board, cellInfo;
        rows = []
        for(row = 0;row < this.props.rows;row++){
            rowCells = [];
            for(col = 0;col < this.props.cols;col++){
                cellInfo = this.props.getCellInfo(row, col);
                rowCells.push(
                    {
                        'label': cellInfo.label,
                        'row': row,
                        'col': col,
                        'class': cellInfo.class
                    }
                );
                //debugger;
            }

            rows.push(rowCells.map((cell, i) => {
                return <Square className={cell.class} key={i} value={cell.label} onClick={() => this.props.onClick(cell.row, cell.col)}/>
            }));
        }

        board = rows.map((row, i) => <div key={i}>{row}</div>);

        return <div>{board}</div>
    }
}

export default Board;