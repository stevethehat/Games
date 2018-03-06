
import React from 'react';
import Square from './square'

class Board extends React.Component {
    render(){
        var rowI, colI, row, rowLabels, rows, board, rowSquares;
        //const board = 
        rows = []
        for(rowI = 0;rowI <= 2;rowI++){
            rowLabels = [];
            for(colI = 1;colI <= 3;colI++){
                rowLabels.push((rowI * 3) + colI);
            }

            rows.push(rowLabels.map((label, i) => {
                return <Square key={i} value={label}/>
            }));
        }

        board = rows.map((row, i) => {
                return(
                    <div key={i}>
                        {row}
                    </div>
                )
            }
        )

        return (
            <div>
                <h2>This is the board</h2>
                <div>
                    <div>
                        <Square onClick={this.props.onClick}/>
                        <Square onClick={this.props.onClick}/>
                        <Square onClick={this.props.onClick}/>
                    </div>
                </div>
                <hr/>
                {board}
            </div>
        )
    }
}

export default Board;