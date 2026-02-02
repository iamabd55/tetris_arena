import { useState, useEffect } from "react";
import { createBoard } from "./game/board";
import { spawnPiece } from "./game/piece";
import { checkCollision } from "./game/checkCollision";
import { merge } from "./game/merge";
import Tetris from "./components/Tetris";

function App() {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState(spawnPiece());

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkCollision(board, piece, 0, 1)) {
        setPiece(prev => ({ ...prev, y: prev.y + 1 }));
      } else {
        const newBoard = board.map(row => [...row]);
        merge(newBoard, piece);
        setBoard(newBoard);
        setPiece(spawnPiece());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [board, piece]);

  return <Tetris board={board} piece={piece} />;
}

export default App;
