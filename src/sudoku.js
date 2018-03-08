
import React from 'react';
import {SudokuUtil, checkGoResult} from './sudokuutil';
import Board from './board';
import Numbers from './numbers';
import Button from './button';

class Sudoku extends React.Component {
    constructor(props){
        super(props);

        //this.game="400508100200009005075060900000800091109007500730000400820604310013702050900003070";
        this.game = "390700000065821903204053760502000630000080074040605800800200400000004280400000009";
        this.state = {
            'loaded': false,
            'gameNumber': Math.floor(Math.random() * 20),
            'currentNum': 1,
            'mode': 'play',
            'lastClick': {'row': 0, 'col': 0, 'result': checkGoResult.none}
        }
    }

    componentDidMount(){
        fetch('data/easy.json')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        'loaded': true,
                        'grid': SudokuUtil.getInitialGrid(result.games[9])
                    });
                    /*
                    this.setState({
                    'loaded': true,
                    'grid': SudokuUtil.getInitialGrid(result.games[this.state.gameNumber])
                    });
                    */
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    debugger;
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )        
    }
    
    cellClick(row, col){
        var     legalNums,
                grid = this.state.grid.slice();

        const   util = new SudokuUtil(grid),
                checkResult = util.checkGo(row, col, this.state.currentNum),
                lastClick = {'row': row, 'col': col, 'result': checkResult};

        if(this.state.currentNum !== 'none'){
            if(checkResult.indexOf(checkGoResult.ok) !== -1){
                grid[row][col] = this.state.currentNum;                
            }
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
            label = this.state.grid[row][col],
            lastClick = this.state.lastClick;

        var cssClass = 'cell-light';

        switch(util.getSectorId(row, col)){
            case 0: case 2: case 4: case 6: case 8:
                cssClass = 'cell-dark';
                break;
            default:
                cssClass = 'cell-light';
                break;
        }

        if(lastClick.result !== checkGoResult.ok && lastClick.result !== checkGoResult.none){
            if(lastClick.result.indexOf(checkGoResult.rowError) !== -1 && lastClick.row === row){
                console.log(`row error ${row} x ${col}`);
                cssClass = 'cell-error';
            }            
            if(lastClick.result.indexOf(checkGoResult.colError) !== -1 && lastClick.col === col){
                console.log(`col error ${row} x ${col}`);
                cssClass = 'cell-error';
            }            
            if(lastClick.result.indexOf(checkGoResult.sectorError) !== -1){
                if(util.getSectorId(row, col) === util.getSectorId(lastClick.row, lastClick.col)){
                    console.log('sector error');
                    cssClass = 'cell-error';    
                }
            }            
        }
        return {
            'label': (label === 0) ? "" : label,
            'class': cssClass
        }
    }
    solve(){
        const util = new SudokuUtil(this.state.grid);
        this.setState(
            {
                'currentNum': this.state.currentNum,
                'mode': this.state.mode,
                'lastClick': this.state.lastClick,
                'grid': util.solve()
            }
        );            

        alert('solve');
    }

    renderLoading(){
        return(
            <div>Loading...</div>
        )
    }
    renderGame(){
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
                <h1>Sudoku - Game {this.state.gameNumber +1}</h1>
                <br/>
                <Board rows="9" cols="9" getCellInfo={(row, col) => this.getCellInfo(row, col)} onClick={(row, col) => this.cellClick(row, col)}/>
                <div className="current-number">
                    <b>Current number: {currentNum}</b>
                </div>
                <div className="hint">
                    <b>{hint}</b>
                </div>
                <Numbers from="1" to="9" noneButton="Hint" onClick={num => this.numberClick(num)}/>
                <br/>
                <Button value="Solve" onClick={() => this.solve()}/>
            </div>
        )
    }

    render(){
        if(this.state.loaded){
            return this.renderGame()
        } else {
            return this.renderLoading()
        }
    }
}

export default Sudoku;