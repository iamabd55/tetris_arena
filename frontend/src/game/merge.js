import { COLORS } from './constants';

export function merge(board, piece) {
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
          board[boardY][boardX] = COLORS[piece.type]; // Store the color!
        }
      }
    });
  });
}