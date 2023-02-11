import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import { resetGameStorage, saveGameToStorage } from "./logic/storage";


const App = () => {
  const [board, setBoard] = useState(() => {
    //
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage()
  };

  const updateBoard = (index) => {
    // no actualiza posicion si ya hay algo
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  return (
    <main className="bg-slate-800 h-screen">
      <div className="w-fit pt-10 mx-auto text-center text-3xl text-white h-full">
        <h1 className="mb-10">Tic tac toe</h1>
        <button
          onClick={resetGame}
          className="bg-slate-500 py-2 px-4 rounded-lg text-xl hover:bg-slate-700 mb-10"
        >
          Empezar de nuevo
        </button>
        <div className="flex flex-col gap-12 items-center">
          <section className="grid grid-cols-3 gap-6 ">
            {board.map((square, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {square}
                </Square>
              );
            })}
          </section>
          <section className="flex gap-10">
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
          </section>

          <WinnerModal winner={winner} resetGame={resetGame} />
        </div>
      </div>
    </main>
  );
};

export default App;
