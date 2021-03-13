import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function Square (props) {
      return (
        <button className="square" 
        onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return <Square 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)} />;
    }
  
    render() {
      return (
        <div className="game-board">
        <div className="row">
          <div className="board-row col">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          </div>
          <div className="row">
          <div className="board-row col">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          </div>
          <div className="row">
          <div className="board-row col">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
          squares: Array(9).fill(null),
        }
      ],
        stepNumber: 0,
        xIsNext: true,
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, 
        this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history : history.concat([{
          squares: squares,
        }
      ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
    });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button type="button" className="game-button btn btn-primary" onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' +winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext 
          ? 'X' : 'O')
      }
      return (
        <div>
        <div className="row">
  <div class="col text-center">
     <h3 >This is my app builded with React</h3> <br></br>
     <h6 className="grey-text">I have used the introcution to React tutorial, to build an interactive tic-tac-toe game with React. 
     <br></br> Which I have styled with boostrap.</h6>
     <p>Link to the guide: <a href="https://reactjs.org/tutorial/tutorial.html">Intro to React</a></p>
     

</div>
        <div class="game-conatiner container-fluid d-flex justify-content-center">
          
          <div className="game-board">
          <div>{status}</div>
            <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
        </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }