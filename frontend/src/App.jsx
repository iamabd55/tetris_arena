import { useState, useEffect, useCallback } from "react";
import { createBoard } from "./game/board";
import { spawnPiece } from "./game/piece";
import { checkCollision } from "./game/checkCollision";
import { merge } from "./game/merge";
import { rotate } from "./game/rotation";
import { clearLines } from "./game/clearLines";
import Tetris from "./components/Tetris";

function App() {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState(spawnPiece());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false); 

  // ✅ MOVE uses latest state safely
  const move = useCallback((dx, dy) => {
    setPiece(prev => {
      if (!checkCollision(board, prev, dx, dy)) {
        return { ...prev, x: prev.x + dx, y: prev.y + dy };
      }
      return prev;
    });
  }, [board]);

  // ✅ ROTATION uses latest piece safely
  const rotatePiece = useCallback(() => {
    setPiece(prev => {
      const rotated = rotate(prev.shape);
      if (!checkCollision(board, { ...prev, shape: rotated }, 0, 0)) {
        return { ...prev, shape: rotated };
      }
      return prev;
    });
  }, [board]);

  // ✅ KEYBOARD (NO STALE STATE)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowUp") rotatePiece();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move, rotatePiece]);

  // ✅ GRAVITY (single interval, stable)
  useEffect(() => {
  if (gameOver) return;

  const interval = setInterval(() => {
    if (!checkCollision(board, piece, 0, 1)) {
      setPiece(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      let newBoard = board.map(row => [...row]);
      merge(newBoard, piece);

      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      setBoard(clearedBoard);

      // scoring
      if (linesCleared > 0) {
        const points = [0, 100, 300, 500, 800];
        setScore(prev => prev + points[linesCleared]);
      } else {
        setScore(prev => prev + 10);
      }

      const newPiece = spawnPiece();

      // 🔥 GAME OVER CHECK
      if (checkCollision(clearedBoard, newPiece, 0, 0)) {
        setGameOver(true);
        return;
      }

      setPiece(newPiece);
    }
  }, 500);

  return () => clearInterval(interval);
}, [board, piece, gameOver]);


  return <Tetris board={board} piece={piece} score={score} gameOver={gameOver}/>;
}

export default App;
