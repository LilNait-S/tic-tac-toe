import React from "react";
import { Square } from "./Square";

const WinnerModal = ( {winner, resetGame}) => {
  if (winner == null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganó'
  return (
    <section className=" absolute w-screen h-screen top-0 left-0 grid place-items-center bg-slate-900/[0.9] ">
      <div className="bg-zinc-900 h-80 w-80 rounded-xl p-4 border flex flex-col justify-center items-center gap-5">
        <h2>{winnerText}</h2>
        <header className=" my-0 mx-auto w-fit flex ">
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button
            onClick={resetGame}
            className="bg-slate-500 py-2 px-4 rounded-lg text-xl hover:bg-slate-700"
          >
            Empezar de nuevo
          </button>
        </footer>
      </div>
    </section>
  );
};

export default WinnerModal;
