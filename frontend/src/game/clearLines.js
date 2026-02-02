export const clearLines = (board) => {
  return board.filter(row => row.some(cell => cell === 0))
              .unshift(...Array(board.length - board.filter(row => row.some(cell => cell === 0)).length)
              .fill(Array(board[0].length).fill(0)));
};
