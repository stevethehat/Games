import React, { Component } from 'react';
import TicTacToe from './tictactoe';
import Sudoku from './sudoku';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React.. it should be fun!!!</h1>
        </header>
        {/*}
        <TicTacToe/>
        {*/}
        <Sudoku/>
      </div>
    );
  }
}

export default App;
