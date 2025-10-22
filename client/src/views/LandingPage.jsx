import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";

function LandingPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("username");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      localStorage.setItem("username", username);
      navigate("/home");
      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    } catch (err) {
      console.error(err);
      Toastify({
        text: "need username",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #ffafbd, #ffc3a0)",
      }).showToast();
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="text-center space-y-8 max-w-4xl">
            {/* Logo/Icon */}
            <div className="inline-block">
              <div className="text-6xl animate-pulse">⭕❌</div>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              Tic Tac Toe
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg">
              Challenge your friends in the classic game! 🎮
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Easy to Play
                </h3>
                <p className="text-white/80 text-sm">
                  Simple rules, endless fun!
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <div className="text-4xl mb-2">👥</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Multiplayer
                </h3>
                <p className="text-white/80 text-sm">
                  Play with friends online!
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Leaderboard
                </h3>
                <p className="text-white/80 text-sm">
                  Compete for the top spot!
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <label className="label justify-center">
                    <span className="text-white font-semibold text-lg">
                      Username
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="w-full input input-bordered input-accent bg-white p-2 rounded-md placeholder:text-neutral-400"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-white p-2 text-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer rounded-md"
                  >
                    Start Playing 🎮
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
