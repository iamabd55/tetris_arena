import {ROWS, COLS} from './board';

export function checkCollision(board, piece, moveX, moveY) {
    return piece.shape.some((row, y) => {
        return row.some((cell, x) => {
            if(!cell) return false;
            // Calculate new position
            const newX = piece.x + x + moveX; 
            const newY = piece.y + y + moveY;

            return (
                newX < 0 || // Check left boundary
                newX >= COLS || // Check right boundary
                newY >= ROWS || // Check bottom boundary
                (newY >= 0 && board[newY][newX] !== 0) // Check for collision with existing blocks
            )
        });
    });
}