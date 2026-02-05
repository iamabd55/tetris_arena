import { useRef, useEffect } from "react";
import { BLOCK_SIZE, COLORS } from "../game/constants";

const Tetris = ({ board, piece, score, gameOver }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board with colors
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = cell;
          ctx.fillRect(
            x * BLOCK_SIZE,
            y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
          
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(
            x * BLOCK_SIZE,
            y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      });
    });

    // Draw current piece with its color
    const pieceColor = COLORS[piece.type];
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = pieceColor;
          ctx.fillRect(
            (piece.x + x) * BLOCK_SIZE,
            (piece.y + y) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
          
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(
            (piece.x + x) * BLOCK_SIZE,
            (piece.y + y) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      });
    });
  }, [board, piece]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-wider drop-shadow-lg">
          TETRIS
        </h1>
        
        {/* Score & Button Row */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
            Score: {score}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Restart
          </button>
        </div>
        
        {/* Game Over Modal */}
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border-4 border-red-600 rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full">
              <h2 className="text-5xl font-bold text-red-500 mb-4">
                GAME OVER
              </h2>
              <p className="text-2xl text-white mb-6">
                Final Score: <span className="text-yellow-400 font-bold">{score}</span>
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg cursor-pointer transition-all transform hover:scale-105 shadow-lg"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {/* Canvas - SMALLER SIZE */}
        <div className="inline-block">
          <canvas 
            ref={canvasRef} 
            width={250}
            height={500}
            className="border-4 border-gray-700 rounded-lg shadow-2xl"
          />
        </div>

        {/* Controls hint */}
        <div className="mt-3 text-gray-300 text-sm">
          <p>← → Move | ↑ Rotate | ↓ Soft Drop</p>
        </div>
      </div>
    </div>
  );
};

export default Tetris;