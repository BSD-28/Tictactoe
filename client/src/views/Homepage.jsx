import { Link } from "react-router";
import { useState } from "react";

function Homepage() {
  const username = localStorage.getItem("username") || "Player";
  const [selectedMode, setSelectedMode] = useState("online");

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500">
      {/* Navbar */}
      <div className="navbar bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">⭕❌ TicTacToe</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                {username[0].toUpperCase()}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome back, <span className="text-yellow-300">{username}</span>!
            👋
          </h1>
          <p className="text-xl text-white/80">Ready to play some games?</p>
        </div>

        {/* Game Mode Selection */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-white text-2xl mb-4">
                Choose Game Mode
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Online Mode */}
                <div
                  onClick={() => setSelectedMode("online")}
                  className={`card cursor-pointer transition-all ${
                    selectedMode === "online"
                      ? "bg-white/30 border-4 border-yellow-300"
                      : "bg-white/10 border-2 border-white/30"
                  } hover:bg-white/20`}
                >
                  <div className="card-body items-center text-center">
                    <div className="text-6xl mb-2">🌐</div>
                    <h3 className="card-title text-white">
                      Online Multiplayer
                    </h3>
                    <p className="text-white/70">Play with friends online</p>
                    <div className="badge badge-success gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      234 Online
                    </div>
                  </div>
                </div>

                {/* AI Mode */}
                <div
                  onClick={() => setSelectedMode("ai")}
                  className={`card cursor-pointer transition-all ${
                    selectedMode === "ai"
                      ? "bg-white/30 border-4 border-yellow-300"
                      : "bg-white/10 border-2 border-white/30"
                  } hover:bg-white/20`}
                >
                  <div className="card-body items-center text-center">
                    <div className="text-6xl mb-2">🤖</div>
                    <h3 className="card-title text-white">vs AI</h3>
                    <p className="text-white/70">Challenge the computer</p>
                    <div className="badge badge-info gap-2 mt-2">
                      Easy • Medium • Hard
                    </div>
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <div className="card-actions justify-center mt-6">
                <Link
                  to="/game"
                  className="btn btn-lg bg-yellow-400 text-purple-900 hover:bg-yellow-300 border-none px-12 shadow-xl"
                >
                  Start Game 🎮
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Leaderboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Your Stats */}
          <div className="card bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="card-body">
              <h2 className="card-title text-white">Your Stats 📊</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Games</span>
                  <span className="text-2xl font-bold text-white">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Wins</span>
                  <span className="text-2xl font-bold text-green-400">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Losses</span>
                  <span className="text-2xl font-bold text-red-400">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Draws</span>
                  <span className="text-2xl font-bold text-yellow-400">10</span>
                </div>
                <div className="divider"></div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Win Rate</span>
                  <span className="text-2xl font-bold text-white">70%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="card-body">
              <h2 className="card-title text-white">Top Players 🏆</h2>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "ProGamer123", score: 2450, emoji: "🥇" },
                  { rank: 2, name: "TicTacMaster", score: 2380, emoji: "🥈" },
                  { rank: 3, name: "Winner99", score: 2310, emoji: "🥉" },
                  { rank: 4, name: username, score: 2100, emoji: "🎯" },
                  { rank: 5, name: "Player456", score: 2050, emoji: "⭐" },
                ].map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === username
                        ? "bg-yellow-400/30 border-2 border-yellow-400"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{player.emoji}</span>
                      <div>
                        <div
                          className={`font-semibold ${
                            player.name === username
                              ? "text-yellow-300"
                              : "text-white"
                          }`}
                        >
                          {player.name}
                          {player.name === username && " (You)"}
                        </div>
                        <div className="text-sm text-white/60">
                          Rank #{player.rank}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{player.score}</div>
                      <div className="text-xs text-white/60">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="card bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="card-body">
              <h2 className="card-title text-white mb-4">Recent Games 🎲</h2>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-white/70">
                      <th>Opponent</th>
                      <th>Result</th>
                      <th>Score</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-white/5">
                      <td className="text-white">
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                              <span className="text-xs">P</span>
                            </div>
                          </div>
                          Player456
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">Win</span>
                      </td>
                      <td className="text-white">3-0</td>
                      <td className="text-white/60">2 hours ago</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="text-white">
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                              <span className="text-xs">A</span>
                            </div>
                          </div>
                          AI (Hard)
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-error">Loss</span>
                      </td>
                      <td className="text-white">1-2</td>
                      <td className="text-white/60">5 hours ago</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="text-white">
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                              <span className="text-xs">T</span>
                            </div>
                          </div>
                          TicTacMaster
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-warning">Draw</span>
                      </td>
                      <td className="text-white">1-1</td>
                      <td className="text-white/60">Yesterday</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
