
import React from 'react';
import Square from './square'

class Board extends React.Component {
    render(){
        var rowI, colI, rowLabels, rows, board;
        rows = []
        for(rowI = 0;rowI < this.props.rows;rowI++){
            rowLabels = [];
            for(colI = 0;colI < this.props.cols;colI++){
                rowLabels.push(this.props.getLabel(rowI, colI));
            }

            rows.push(rowLabels.map((label, i) => {
                return <Square value={label} onClick={this.props.onClick}/>
            }));
        }

        board = rows.map((row, i) => <div>{row}</div>);

        return <div>{board}</div>
    }
}

export default Board;