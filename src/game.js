
import React, { Component } from 'react';
import Board from './board'

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'a': 'b'
        }
    }
    handleClick(){
        alert('handle click');
    }
    render(){
        return (
            <div>
                <h1>Hello im a game</h1>
                <Board onClick={this.handleClick}/>
            </div>
        )
    }
}

export default Game;