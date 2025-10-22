import { useNavigate } from "react-router";
import { useState } from "react";
import { socket } from "../socket/socket";
import { useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function HomePage() {
  const username = localStorage.getItem("username") || "Player";
  const navigate = useNavigate();

  const handleGame = () => {
    navigate("/game");
  };

  const handleVsAi = () => {
    navigate("/vs-ai");
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
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col gap-5 p-3 rounded-xl items-center">
          <h2 className="card-title text-white text-2xl">Choose Game Mode</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Online Mode */}
            <div
              onClick={handleGame}
              className={`cursor-pointer bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-purple-400/50`}
            >
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-2">🌐</div>
                <h3 className="card-title text-white">Online Multiplayer</h3>
                <p className="text-white/70">Play with friends online</p>
              </div>
            </div>

            {/* AI Mode */}
            <div
              onClick={handleVsAi}
              className={`cursor-pointer bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-purple-400/50`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-2">🤖</div>
                <h3 className="card-title text-white">vs AI</h3>
                <p className="text-white/70">Challenge the computer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
