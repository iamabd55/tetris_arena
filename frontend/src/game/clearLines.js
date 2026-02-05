export const clearLines = (board) => {
  let linesCleared = 0;

  const newBoard = board.filter(row => {
    if (row.every(cell => cell !== 0)) {
      linesCleared++;
      return false;
    }
    return true;
  });

  while (newBoard.length < board.length) {
    newBoard.unshift(Array(board[0].length).fill(0));
  }

  return { newBoard, linesCleared };
};
