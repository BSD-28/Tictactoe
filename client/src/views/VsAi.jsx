import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

export default function VsAi() {
  const username = localStorage.getItem("username") || "Player";

  const [board, setBoard] = useState(Array(9).fill(null));
  const [aiThinking, setAiThinking] = useState(false);
  const [winner, setWinner] = useState(null);

  // Cek pemenang
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return board[a];
    }
    return board.includes(null) ? null : "Draw";
  };

  // Klik player
  const handleClick = (index) => {
    if (board[index] !== null || aiThinking || winner) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
  };

  // AI jalan otomatis
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      return;
    }

    const emptyCells = board.filter((c) => c === null);
    if (emptyCells.length === 0) return;

    const xCount = board.filter((c) => c === "X").length;
    const oCount = board.filter((c) => c === "O").length;
    if (xCount <= oCount) return;

    const timer = setTimeout(async () => {
      try {
        setAiThinking(true);
        const res = await axios.post("http://localhost:3000/ai-move", {
          board,
        });
        const move = res.data.move;

        const newBoard = [...board];
        newBoard[move] = "O";
        setBoard(newBoard);
      } catch (err) {
        console.error("AI Error:", err);
      } finally {
        setAiThinking(false);
      }
    }, 1200); // biar keliatan AI mikir dikit

    return () => clearTimeout(timer);
  }, [board]);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setAiThinking(false);
  };

  return (
    <>
      {/* Main Game */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Player Sidebar */}
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {username}
                </h3>
                <div className="badge badge-primary mb-4">❌ Player X</div>
                <div className="bg-blue-500/30 rounded-lg p-4 border-2 border-blue-400 mt-4 animate-pulse">
                  <div className="text-center text-white font-bold">
                    {aiThinking
                      ? "🤖 AI Thinking..."
                      : winner
                      ? "✅ Game Over"
                      : "⏰ YOUR TURN"}
                  </div>
                </div>
              </div>
            </div>

            {/* Board */}
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="card-body p-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Tic Tac Toe vs AI
                </h2>

                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-3 p-6 bg-white/5 rounded-xl">
                    {board.map((cell, index) => (
                      <button
                        key={index}
                        onClick={() => handleClick(index)}
                        disabled={!!cell || aiThinking || winner}
                        className={`w-24 h-24 text-5xl font-bold rounded-xl border-2 border-white/20 shadow-lg transition-all duration-200
                          ${
                            cell === "X"
                              ? "bg-blue-500 text-white"
                              : cell === "O"
                              ? "bg-red-500 text-white"
                              : "bg-white/10 hover:bg-white/20 text-white/30 hover:scale-105"
                          }
                          ${
                            winner || aiThinking
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }
                        `}
                      >
                        {cell || ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mt-6 text-white text-xl font-semibold">
                  {winner
                    ? winner === "Draw"
                      ? "🤝 It's a Draw!"
                      : winner === "X"
                      ? "🎉 You Win!"
                      : "🤖 AI Wins!"
                    : ""}
                </div>

                {/* Controls */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white 
                    bg-linear-to-r from-yellow-400 to-orange-500 
                    rounded-xl border border-yellow-300 shadow-lg
                    transition-all duration-300 ease-out 
                    hover:scale-110 hover:shadow-[0_0_15px_rgba(255,200,0,0.7)] 
                    active:scale-95 cursor-pointer"
                  >
                    🔁 Reset Game
                  </button>
                </div>
              </div>
            </div>

            {/* AI Sidebar */}
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  AI Opponent
                </h3>
                <div className="badge badge-error mb-4">⭕ Player O</div>
                <div className="bg-white/10 rounded-lg p-4 border-2 border-white/20">
                  <div className="text-center text-white/50 font-bold">
                    {aiThinking
                      ? "🧠 THINKING..."
                      : winner
                      ? "⏸️ WAITING..."
                      : "⚡ READY"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
