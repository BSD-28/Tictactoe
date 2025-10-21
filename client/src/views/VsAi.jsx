import { useState, useEffect } from "react";
import axios from "axios";

export default function VsAi() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [aiThinking, setAiThinking] = useState(false);
  const [winner, setWinner] = useState(null);

  // Fungsi cek pemenang
  const checkWinner = (board) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.includes(null) ? null : "Draw";
  };

  const handleClick = (index) => {
    if (board[index] !== null || aiThinking || winner) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
  };

  // AI move otomatis tiap board berubah
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      return; // stop AI kalau sudah ada pemenang
    }

    const emptyCells = board.filter((c) => c === null);
    if (emptyCells.length === 0) return;

    const xCount = board.filter((c) => c === "X").length;
    const oCount = board.filter((c) => c === "O").length;
    if (xCount <= oCount) return;

    const timer = setTimeout(async () => {
      try {
        setAiThinking(true);
        const res = await axios.post("http://localhost:3000/ai-move", { board });
        const move = res.data.move;

        const newBoard = [...board];
        newBoard[move] = "O";
        setBoard(newBoard);
      } catch (err) {
        console.error("Error calling AI:", err);
      } finally {
        setAiThinking(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [board]);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setAiThinking(false);
    setWinner(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Vs AI</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 60px)",
          gap: "5px",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "60px",
              height: "60px",
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              cursor: aiThinking || cell || winner ? "not-allowed" : "pointer",
              backgroundColor: "#f0f0f0",
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      <button onClick={handleReset}>Reset</button>

      {aiThinking && <p>AI turn...</p>}
      {winner && <p>{winner === "Draw" ? "Draw!" : `Winner: ${winner}`}</p>}
    </div>
  );
}
