/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveGameStorge = ({board, turn}:any) => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("turn", JSON.stringify(turn));
}

export const resetGameStorages = () => {
    localStorage.removeItem("board");
    localStorage.removeItem("turn");
}