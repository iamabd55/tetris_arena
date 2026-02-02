import { useRef, useEffect } from "react";

const BLOCK_SIZE = 30;

const Tetris = ({ board, piece }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 300, 600);

    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      });
    });

    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillRect(
            (piece.x + x) * BLOCK_SIZE,
            (piece.y + y) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      });
    });
  }, [board, piece]);

  return <canvas ref={canvasRef} width={300} height={600} />;
};

export default Tetris;
