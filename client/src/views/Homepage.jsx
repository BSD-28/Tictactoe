import { useNavigate } from "react-router";
import { useState } from "react";
import { socket } from "../socket/socket"
import { useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Homepage() {
  const username = localStorage.getItem("username");
  const [selectedMode, setSelectedMode] = useState("online");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleGame = () => {
    navigate("/game");
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to the socket server");
    });

    socket.emit("pingServer");
    socket.on("pongClient", () => {
      console.log("Received pong from server");
    });

    socket.emit("joinGame", { gameId: "room1", username });

    

    if (!username) {
      Toastify({
        text: "⚠️ Username belum diatur! Pastikan login dulu.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    }

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-white/10 backdrop-blur-lg border-b border-white/20 p-2 px-6">
          <a className="btn btn-ghost text-xl text-white">⭕❌ TicTacToe</a>

          <button
            type="button"
            className="w-20 bg-red-600 p-2 text-white hover:bg-red-700  cursor-pointer rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>

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
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col gap-5 p-3 rounded-xl ">
            <h2 className="card-title text-white text-2xl">Choose Game Mode</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Online Mode */}
              <div
                onClick={() => setSelectedMode("online")}
                className={`card cursor-pointer transition-all ${selectedMode === "online"
                  ? "bg-white/30 border-4 border-yellow-300"
                  : "bg-white/10 border-2 border-white/30"
                  } hover:bg-white/20`}
              >
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-2">🌐</div>
                  <h3 className="card-title text-white">Online Multiplayer</h3>
                  <p className="text-white/70">Play with friends online</p>
                </div>
              </div>

              {/* AI Mode */}
              <div
                onClick={() => setSelectedMode("ai")}
                className={`card cursor-pointer transition-all ${selectedMode === "ai"
                  ? "bg-white/30 border-4 border-yellow-300"
                  : "bg-white/10 border-2 border-white/30"
                  } hover:bg-white/20`}
              >
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-2">🤖</div>
                  <h3 className="card-title text-white">vs AI</h3>
                  <p className="text-white/70">Challenge the computer</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white p-2 text-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer rounded-md"
              onClick={handleGame}
            >
              Start Playing 🎮
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
