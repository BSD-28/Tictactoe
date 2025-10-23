if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");
const { GoogleGenAI } = require("@google/genai");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://tictactoe-red-delta.vercel.app"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tic Tac Toe Server is running");
});

app.post("/ai-move", async (req, res) => {
  try {
    const { board } = req.body;

    if (!board || !Array.isArray(board) || board.length !== 9) {
      return res.status(400).json({ error: "Board harus array 9 elemen" });
    }

    const ai = new GoogleGenAI({
      apiKey: "AIzaSyBrHa1rAX16O5rQ6aqS0cYuLcqOz76UGGc",
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
You are a Tic Tac Toe AI that plays as 'O'.
The board is an array of 9 cells (indexes 0-8), where each cell can be 'X', 'O', or null.
Respond ONLY with a number (0-8) representing your move.
Board: ${JSON.stringify(board)}
            `,
    });

    console.log(
      "AI candidates content:",
      JSON.stringify(response.candidates[0].content, null, 2)
    );

    const candidateContent = response?.candidates?.[0]?.content?.parts;
    if (!candidateContent || !candidateContent.length) {
      console.error("AI content kosong:", JSON.stringify(response, null, 2));
      return res.status(500).json({ error: "AI response empty" });
    }

    const moveText = candidateContent[0].text.trim();
    const move = parseInt(moveText, 10);

    if (isNaN(move)) {
      console.error("AI move bukan angka:", moveText);
      return res.status(500).json({ error: "AI move invalid" });
    }

    res.status(200).json({ move });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const games = {};
const playerRooms = {};

function makeEmptyBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("pingServer", () => {
    console.log("Received ping from client:", socket.id);
    socket.emit("pongClient");
  });

  socket.on("createGame", (username) => {
    try {
      if (!username) {
        socket.emit("errorMsg", "Username is required");
        return;
      }

      if (typeof username !== "string" || username.trim() === "") {
        socket.emit("errorMsg", "Invalid username");
        return;
      }
      const gameId = Math.random().toString(36).substring(2, 5).toUpperCase();
      games[gameId] = {
        players: [{ id: socket.id, name: username }],
        board: makeEmptyBoard(),
        turn: "X",
      };

      socket.data.username = username;
      socket.data.gameId = gameId;
      socket.join(gameId);
      socket.emit("gameCreated", gameId);
      console.log(`Game created: ${gameId} by ${username}`);
    } catch (error) {
      console.error("Error creating game:", error);
      socket.emit("errorMsg", "Failed to create game");
    }
  });

  socket.on("joinGame", ({ gameId, username }) => {
    try {
      if (!gameId || !username) {
        socket.emit("errorMsg", "Game ID and username are required");
        return;
      }
      const game = games[gameId];
      if (!game) {
        socket.emit("errorMsg", "Game not found!");
        return;
      }
      if (game.players.length >= 2) {
        socket.emit("errorMsg", "Game is already full!");
        return;
      }
      if (game && game.players.length < 2) {
        game.players.push({ id: socket.id, name: username });
        socket.join(gameId);
        socket.data.username = username;
        socket.data.gameId = gameId;
        const payload = {
          game,
          players: game.players.map((player) => player.name),
          board: game.board,
          turn: game.turn,
        };

        io.to(gameId).emit("startGame", payload);

        console.log("Games:", games);
        console.log("Games:", JSON.stringify(games, null, 2));

        console.log(`${username} joined game ${gameId}`);
      } else {
        socket.emit("errorMsg", "Game full or not found!");
      }
    } catch (error) {
      console.error(err);
      socket.emit("errorMsg", "Failed to join game");
    }
  });

  socket.on("makeMove", ({ gameId, row, col, username }) => {
    try {
      const game = games[gameId];
      if (!game) {
        socket.emit("errorMsg", "Game not found");
        return;
      }

      // basic validation
      if (
        typeof row !== "number" ||
        typeof col !== "number" ||
        row < 0 ||
        row > 2 ||
        col < 0 ||
        col > 2
      ) {
        socket.emit("errorMsg", "Invalid move coordinates");
        return;
      }

      const playerIndex = game.players.findIndex((p) => p.id === socket.id);
      if (playerIndex === -1) {
        socket.emit("errorMsg", "You are not part of this game");
        return;
      }
      const mySymbol = playerIndex === 0 ? "X" : "O";

      // check turn
      if (game.turn !== mySymbol) {
        socket.emit("errorMsg", "Not your turn");
        return;
      }

      // check cell empty
      if (game.board[row][col] !== "") {
        socket.emit("errorMsg", "Cell already taken");
        return;
      }

      // apply move
      game.board[row][col] = mySymbol;

      // swap turn
      game.turn = game.turn === "X" ? "O" : "X";

      // broadcast updated game object (client akan gunakan data.board dan data.turn)
      io.to(gameId).emit("gameState", {
        gameId,
        players: game.players.map((p) => p.name),
        board: game.board,
        turn: game.turn,
      });

      console.log(
        `${username} (${mySymbol}) made move in game ${gameId} at (${row}, ${col})`
      );
    } catch (error) {
      console.error(error);
      socket.emit("errorMsg", "Unexpected error making move");
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`⚠️ Socket disconnected: ${socket.id}, reason: ${reason}`);

    const { username, gameId } = socket.data;
    if (!gameId || !username) return;

    const game = games[gameId];
    if (game) {
      // Emit ke semua player di room (termasuk yang masih aktif)
      io.to(gameId).emit("gameEnded", {
        message: `🚪 Player ${username} has left the game. The game has ended.`,
      });

      console.log(`📢 Player ${username} left game ${gameId}`);

      // Kick semua player dari room
      const roomSockets = io.sockets.adapter.rooms.get(gameId);
      if (roomSockets) {
        for (const socketId of roomSockets) {
          const s = io.sockets.sockets.get(socketId);
          if (s) s.leave(gameId);
        }
      }

      // Delete game dari memory
      delete games[gameId];
      console.log(`🗑️ Game ${gameId} deleted and all players removed.`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
