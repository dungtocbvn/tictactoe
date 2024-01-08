import React, { useState, useEffect } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) {
      alert(`Player ${winner} wins!`);
    }
  }, [winner]);

  const checkWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isPlayerTurn ? 'X' : 'O';
    setBoard(newBoard);

    setIsPlayerTurn(!isPlayerTurn);
  };

  useEffect(() => {
    const winningPlayer = checkWinner(board);
    if (winningPlayer) {
      setWinner(winningPlayer);
    } else if (!board.includes(null)) {
      setWinner('Draw');
    }
  }, [board]);

  const makeMove = (move) => {
    if (winner || board[move]) return;

    const newBoard = [...board];
    newBoard[move] = 'O';
    setBoard(newBoard);

    setIsPlayerTurn(true);
  };

  const getBestMove = () => {
    if (winner || !board.includes(null)) return;

    const availableMoves = board.reduce((acc, val, idx) => {
      if (val === null) {
        acc.push(idx);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    makeMove(availableMoves[randomIndex]);
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      getBestMove();
    }
  }, [isPlayerTurn]);

  return (
    <div className="app">
      <div className="game">
        <div className="game-board">
          <Board squares={board} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
