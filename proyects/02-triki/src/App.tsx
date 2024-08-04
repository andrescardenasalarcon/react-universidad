/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNOS } from "./constants";
import { checkEndGame, checkWinnerFrom } from "./board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorages, saveGameStorge } from "./storage";

function App() {
  type typeNullBoolean = null | boolean;

  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage) //Si tengo algo en el storage lo cargo
      : Array(9).fill(null); //Si no, lo inicializo con nulls
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem("turn"); //No hay necesidad de parsearlo

    return turnFromStorage ?? TURNOS.X;
  });
  const [winner, setWinner] = useState<typeNullBoolean>(null); //null no hay ganador, false que hay un empate, true hay un ganador

  const updateBoard = (index: number) => {
    // no actualizamos esta psicion
    // si ya tiene algo o un ganador paramos
    if (board[index] || winner) return;

    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(newTurn);
    //guardar aqui partida
    saveGameStorge({
      board:newBoard,
      turn:newTurn
    });
    //revisar si hay gandor
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner); //actualiza el estado --> esto es asincrono
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNOS.X);
    setWinner(null);
    resetGameStorages;
  };

  useEffect(() => {
    console.log("useEffect");
  },[winner]);

  return (
    <main className="board">
      <h1>Triki</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square: any, index: number) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNOS.X}>{TURNOS.X}</Square>
        <Square isSelected={turn === TURNOS.O}>{TURNOS.O}</Square>
      </section>

      <section>
        <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
      </section>
    </main>
  );
}

export default App;
