import React, { Component } from "react";
import Board from "./Board";
import { changeStep, toggleXIsNext, sortMoves, clickSquare, setMode, setHistory } from '../actions'
import Chat from "./Chat";
import { connect } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
class Game_online extends Component {
    constructor(props) {
      super(props);
      //Khởi tạo state,
      this.state = {
        user: null,
        me: null,
        your: null
      }

  };
  
  componentWillMount() {
    this.props.p_socket.on('id', (res) => { console.log("USERb " + res.res), this.state.user = res.res})
    this.props.p_socket.on('nextPlayer', (response) => {this.state.your = response.name, this.handleClick(response.i,response.j)}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
   
  }
  setHist = () =>{
    this.props.p_setHistory();
   }

  handleClick = (i, j) => {
    console.log(this.props.auth.user)
    console.log("set mod" + this.props.p_setMode);
    const history = this.props.p_history.slice(0, this.props.p_step + 1);
    const current = history[this.props.p_step];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    });
    
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
      squares[i][j] = this.props.p_xIsNext ? "X" : "O";

      this.props.p_clickSquare(
        history.concat([
          {
            squares: squares,
            location: { x: i, y: j }
          }
        ]) 
      );
        this.props.p_socket.emit("nextPlayer", {name:this.props.auth.user.name, user:this.state.user, i:i, j:j});   
    };
  render(){
    
  console.log("history" +  this.props.p_history);
    const history =  this.props.p_history;
    const current = history[ this.props.p_step];
    const winner = calculateWinner(current.squares);
  
    let status;
    if (winner) {
      status = "Winner: " + winner.val;
    } else {
      status = "Next player: " + ( this.props.p_xIsNext ? this.props.auth.user.name : this.state.your);
    }
  
    return (
      <div className="game">
        <div className="game-board">
          <div className="header">CARO GAME</div>
          <div className="nobr">
            <div className="status">{status}</div>
            <button
              type="submit"
              className="re-play"
              onClick={()=>{this.setHist()}}
            >
              PLAY AGAIN
            </button>
          </div>
          <Board
            squares={current.squares}
            onClick={(i, j) => { this.handleClick(i, j)}}
            winner={winner}
          />
        </div>  
          <div className = "chat_form">
            <Chat />
          </div>
        </div>
    );
  }
}

var nSquareToWin = 5;
function calculateWinner(squares) {
  let win;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToRight" };
      }
      if (i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false;
          }
        }
        if (win) return { val: squares[i][j], x: j, y: i, direction: "ToDown" };
      }
      if (
        j <= squares[i].length - nSquareToWin &&
        i <= squares.length - nSquareToWin
      ) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToRightDown" };
      }
      if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToLeftDown" };
      }
    }
  }
  return null;
}
const mapStateToProps = (state) => ({
  p_width: state.gameSetting.width,
  p_height: state.gameSetting.height,
  p_history: state.history,
  p_step: state.step,
  p_xIsNext: state.xIsNext,
  p_setMode:state.setMode,
  p_socket: state.socket,
  p_isDescending: state.isDescending,
  auth: state.auth
})

const mapDispatchToProps = {
  p_changeStep: changeStep,
  p_toggleXIsNext: toggleXIsNext,
  p_clickSquare: clickSquare,
  p_sortMoves: sortMoves,
  p_setHistory: setHistory
}
export default connect(mapStateToProps,mapDispatchToProps)(Game_online);
