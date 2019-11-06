import React from "react";
import Board from "./Board";
import Chat from "./Chat";
import io from 'socket.io-client';

let Game = ({
  p_width,
  p_height,
  p_history,
  p_step,
  p_xIsNext,
  p_isDescending,
  p_changeStep,
  p_toggleXIsNext,
  p_setMode,
  p_socket,
  p_setHistory,
  p_clickSquare,
  p_sortMoves
}) => {
  let jumpTo = step => {
    p_changeStep(step);
  };
//const connect = p_socket
// var tmpArr = Array(20);
// for (let i = 0; i < 20; i++) {
//   tmpArr[i] = Array(20).fill(null);
// }
//   var defaultState = [{
//     squares: tmpArr,
//     location: null,
//   }]
  
  let setHist = () =>{
   p_setHistory();
  }
  let user = null;
 
  let iNew = 0;
  let jNew = 0;
  if(user === null){
    p_socket.on('id', (res) => { console.log("USERb " + res.res), user = res.res})
  }
    p_socket.on('nextPlayer', (response) => {console.log( response)}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
   
  // const setHis = (history)=>{
  //   p_history = history
  // };

  console.log("set mod" + p_setMode);
  let handleClick = (i, j) => {
    console.log("set mod" + p_setMode);
    const history = p_history.slice(0, p_step + 1);
    const current = history[p_step];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    });
    
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    if(p_setMode){
      console.log("PC " + p_setMode);
      squares[i][j] = "X";
        let x,y;
  //    setTimeout(() => {
          do {
            var random = Math.floor(Math.random() * 400);
             x = Math.floor(random / 20);
             y = random % 20;
          } while(squares[x][y] != null);
          squares[x][y] = "O";
          console.log(squares[x][y] + x);
          
          history.concat([
            {
              squares: squares,
              location: { x: x, y: y }
            }
          ])
          console.log(history);
   //     }, 1000);

      p_clickSquare(
        history.concat([
          {
            squares: squares,
            location: { x: i, y: j }
          }
        ]) 
      );
      console.log(history)
    } else{

      squares[i][j] = p_xIsNext ? "X" : "O";

      p_clickSquare(
        history.concat([
          {
            squares: squares,
            location: { x: i, y: j }
          }
        ]) 
      );
      console.log('p_history '+ history.location);
      
      p_socket.emit("nextPlayer", {user:user,i:i, j:j});
    }
    
  };

  let sort = () => {
    p_sortMoves(!p_isDescending);
  };
console.log("history" + p_history);
  const history = p_history;
  const current = history[p_step];
  const winner = calculateWinner(current.squares);
  console.log("winner" + winner);
  let moves = history.map((step, move) => {
    const desc = move
      ? "Go to move #" +
        move +
        " (" +
        step.location.x +
        "," +
        step.location.y +
        ")"
      : "Go to game start";
    return p_step === move ? (
      <li key={move}>
        <button className="btn-chosen" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    ) : (
      <li key={move}>
        <button className="btn-play" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  if (!p_isDescending) {
    moves = moves.reverse();
  }

  let status;
  if (winner) {
    status = "Winner: " + winner.val;
  } else {
    status = "Next player: " + (p_xIsNext ? "X" : "PC");
  }

  let arrow = p_isDescending ? "↓" : "↑";
  
  return (
    <div className="game">
      <div className="game-board">
        <div className="header">CARO GAME</div>
        <div className="nobr">
          <div className="status">{status}</div>
          <button
            type="submit"
            className="re-play"
            onClick={()=>{setHist()}}
          >
            PLAY AGAIN
          </button>
        </div>
        <Board
          squares={current.squares}
          //onchange = {(iNew,jNew) => handleClick(iNew,jNew)}
          onClick={(i, j) => {handleClick(i, j)}}
          winner={winner}
        />
      </div>
      <div className="game-info">
        <div >
          <div>
            <button className="revese" onClick={sort}>
              Thứ tự bước {arrow}
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
};

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

export default Game;
