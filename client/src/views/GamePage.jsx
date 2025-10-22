import { useEffect, useState } from "react";
import { Link, Scripts } from "react-router";
import { socket } from "../socket/socket"
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";


function GamePage() {
  const username = localStorage.getItem("username") || "Player";
  const [gameId, setGameId] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [opponentName, setOpponentName] = useState("");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ])
  const [turn, setTurn] = useState("X");

  const [winner, setWinner] = useState(null);

  // ✅ fungsi untuk cek pemenang
  const checkWinner = (b) => {
    const lines = [
      // baris
      [b[0][0], b[0][1], b[0][2]],
      [b[1][0], b[1][1], b[1][2]],
      [b[2][0], b[2][1], b[2][2]],
      // kolom
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      // diagonal
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]],
    ];

    for (let line of lines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) {
        return line[0]; // "X" atau "O"
      }
    }
    // cek draw
    const isDraw = b.flat().every((cell) => cell !== "");
    if (isDraw) return "Draw";
    return null;
  };

  useEffect(() => {
    socket.on("gameCreated", (newGameId) => {
      setGameId(newGameId);
      setIsInRoom(true);
      Toastify({
        text: `✅ Game created! ID: ${newGameId}`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    });

    socket.on("startGame", (data) => {
      const opponent = data.players.find((p) => p !== username);
      setOpponentName(opponent);
      setBoard(data.board);
      setTurn(data.turn);
      setIsInRoom(true)
      Toastify({
        text: `🎮 Game started! Your opponent: ${opponent}`,
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #2193b0, #6dd5ed)",
      }).showToast();
    });


    socket.on("gameState", (data) => {
      setBoard(data.board);
      setTurn(data.turn);

      const result = checkWinner(data.board);
      if (result && !winner) {
        setWinner(result);

        if (result === "Draw") {
          Toastify({
            text: `🤝 It's a draw!`,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ffafbd, #ffc3a0)",
          }).showToast();
        } else {
          // Tentukan simbol user berdasarkan urutan
          // Misal pemain pertama selalu "X", lawan "O"
          const mySymbol = data.players?.[0] === username ? "X" : "O";
          const isWinner = result === mySymbol;

          Toastify({
            text: isWinner ? "🏆 You Win!" : "💀 You Lose!",
            duration: 4000,
            gravity: "top",
            position: "center",
            backgroundColor: isWinner
              ? "linear-gradient(to right, #00b09b, #96c93d)"
              : "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
        }
      }
    });


    socket.on("playerJoined", (data) => {
      console.log("New player joined:", data);
    });

    socket.on("gameEnded", (data) => {
      Toastify({
        text: data.message || "Game has ended.",
        duration: 4000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();

      // Bersihkan state game
      setIsInRoom(false);
      setBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
      setGameId("");
      setOpponentName("");
      setWinner(null);
    });

    socket.on("errorMsg", (msg) => {
      Toastify({
        text: `⚠️ ${msg}`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    });

    socket.on("playerLeft", (data) => {
      Toastify({
        text: `❌ Player ${data.username} has left the game.`,
        duration: 4000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
      }).showToast();
    });

    return () => {
      socket.off("gameCreated");
      socket.off("startGame");
      socket.off("gameState");
      socket.off("playerJoined");
      socket.off("errorMsg");
      socket.off("pongClient");
      socket.off("playerLeft");
      socket.off("gameEnded");
    };
  }, []);


  const handleCreate = () => {
    socket.connect();
    socket.emit("createGame", username);
  }

  const handleJoin = () => {
    socket.connect();
    socket.emit("joinGame", { gameId, username });

  }

  const handleClickCell = (row, col) => {
    // emit move to server
    if (winner) return;

    socket.emit("makeMove", { gameId, row, col, username });
  }




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

      {/* Game Info */}
      <div className="text-center mt-6 text-white">
        {isInRoom && (
          <p className="text-lg">
            Game ID:{" "}
            <span className="font-mono bg-white/20 px-2 py-1 rounded">
              {gameId}
            </span>
          </p>
        )}
      </div>
      {/* Main Content */}
      {!isInRoom ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-white space-y-6">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">
            🎮 Multiplayer Lobby
          </h1>
          <p className="text-white/80 max-w-md">
            Create a new game room or join your friend's match using the game
            ID.
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-md space-y-6">
            <button
              onClick={handleCreate}
              className="w-full py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform"
            >
              ➕ Create Game
            </button>

            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Enter Game ID"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="flex-1 bg-white/10 text-white placeholder-white/60 rounded-xl px-4 py-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              />
              <button
                onClick={handleJoin}
                className="px-5 py-3 bg-linear-to-r from-purple-500 to-pink-400 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-md"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
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

                  {/* CENTER BOARD */}
                  <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                    <div className="card-body p-6 flex justify-center items-center">
                      <div className="grid grid-cols-3 gap-3 p-6 bg-white/5 rounded-xl">
                        {board.map((row, rIndex) =>
                          row.map((cell, cIndex) => (
                            <button
                              key={`${rIndex}-${cIndex}`}
                              onClick={() => handleClickCell(rIndex, cIndex)}
                              disabled={!!cell}
                              className={`w-24 h-24 text-5xl font-bold rounded-xl border-2 border-white/20 shadow-lg transition-all ${cell === "X"
                                ? "bg-blue-500 text-white"
                                : cell === "O"
                                  ? "bg-red-500 text-white"
                                  : "bg-white/10 hover:bg-white/20 text-white/30 hover:scale-105"
                                }`}
                            >
                              {cell}
                            </button>
                          ))
                        )}
                      </div>
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
                      {opponentName || "waiting..."}
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
      )}
    </>
  );
}

export default GamePage;
