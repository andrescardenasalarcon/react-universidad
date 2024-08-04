import { WINNER_COMBOS } from "./constants";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkWinnerFrom = (boardToCheck: any[]) => {
    //revisamos todas las combinaciones ganadoras
    //para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] && // 0 --> X u O
            boardToCheck[a] === boardToCheck[b] && // si la pos 0 y 1 estan iguales X===X Ó O===O
            boardToCheck[a] === boardToCheck[c] // si la pos 0 y 3 estan iguales X===X Ó O===O
        ) {
            return boardToCheck[a]; //Ganador X u O
        }
    }
    // si no hay ganador
    return null;
};

export const checkEndGame = (newBoard: any) => {
    //revisamos si hay un empate
    // si o hay mas espacios vaciós
    //en el tablero
    return newBoard.every((square: any) => square !== null);
  };