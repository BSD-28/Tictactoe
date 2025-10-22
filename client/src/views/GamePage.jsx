import { Link } from "react-router";

function GamePage() {
  const username = localStorage.getItem("username") || "Player";

  // Dummy board state for display
  const board = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["", "", "X"],
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white/10 backdrop-blur-lg border-b border-white/20 p-2 px-6">
        <div className="flex-1">
          <Link to="/home" className="btn btn-ghost text-xl text-white">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Game Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Player 1 Info */}
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {username}
                  </h3>
                  <div className="badge badge-primary mb-4">❌ Player X</div>

                  <div className="w-full space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Wins</span>
                      <span className="text-2xl font-bold text-green-400">
                        15
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Turn Time</span>
                      <span className="text-2xl font-bold text-white">
                        00:12
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Score</span>
                      <span className="text-2xl font-bold text-yellow-400">
                        2100
                      </span>
                    </div>
                  </div>

                  <div className="w-full mt-6">
                    <div className="bg-blue-500/30 rounded-lg p-4 border-2 border-blue-400 animate-pulse">
                      <div className="text-center text-white font-bold">
                        ⏰ YOUR TURN
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Game Board */}
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="card-body p-6">
                {/* Game Status */}
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Round 3
                  </h2>
                  <div className="flex justify-center gap-4">
                    <div className="badge badge-lg bg-blue-500 text-white">
                      You: 1
                    </div>
                    <div className="badge badge-lg bg-white/20 text-white">
                      Draw: 1
                    </div>
                    <div className="badge badge-lg bg-red-500 text-white">
                      Opp: 1
                    </div>
                  </div>
                </div>

                {/* Tic Tac Toe Board */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-3 p-6 bg-white/5 rounded-xl">
                    {board.flat().map((cell, index) => (
                      <button
                        key={index}
                        className={`
                          w-24 h-24 text-5xl font-bold rounded-xl
                          transition-all duration-200
                          ${cell === "X" ? "bg-blue-500 text-white" : ""}
                          ${cell === "O" ? "bg-red-500 text-white" : ""}
                          ${
                            !cell
                              ? "bg-white/10 hover:bg-white/20 text-white/30"
                              : ""
                          }
                          ${
                            !cell
                              ? "hover:scale-105 cursor-pointer"
                              : "cursor-not-allowed"
                          }
                          border-2 border-white/20
                          shadow-lg
                        `}
                      >
                        {cell || ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Game Controls */}
                <div className="flex gap-3 mt-6">
                  <button className="btn btn-outline btn-error flex-1">
                    Resign 🏳️
                  </button>
                  <button className="btn btn-outline btn-warning flex-1">
                    Draw Offer 🤝
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Player 2 Info */}
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col items-center">
                  <div className="avatar placeholder mb-4"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Opponent123
                  </h3>
                  <div className="badge badge-error mb-4">⭕ Player O</div>

                  <div className="w-full space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Wins</span>
                      <span className="text-2xl font-bold text-green-400">
                        12
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Turn Time</span>
                      <span className="text-2xl font-bold text-white/50">
                        --:--
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Score</span>
                      <span className="text-2xl font-bold text-yellow-400">
                        1950
                      </span>
                    </div>
                  </div>

                  <div className="w-full mt-6">
                    <div className="bg-white/10 rounded-lg p-4 border-2 border-white/20">
                      <div className="text-center text-white/50 font-bold">
                        ⏸️ WAITING...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
