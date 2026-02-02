export const merge = (board, piece) => {
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        board[piece.y + y][piece.x + x] = 1;
      }
    });
  });
};
