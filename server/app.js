const express = require('express');
const app = express();
const PORT = 4000;

const { createServer } = require('http');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const games = {};

app.get('/', (req, res) => {
    res.send('Tic Tac Toe Server is running');
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('pingServer', () => {
        console.log('Received ping from client:', socket.id);
        socket.emit('pongClient');
    });

    socket.on("createGame", (username) => {
        const gameId = Math.random().toString(36).substring(2, 5).toUpperCase();
        games[gameId] = {
            players: [{ id: socket.id, name: username }]
        };
        socket.join(gameId);
        socket.emit("gameCreated", gameId);
        console.log(`Game created: ${gameId} by ${username}`);

    })

    socket.on('joinGame', ({ gameId, username }) => {
        const game = games[gameId]
        if (game && game.players.length < 2) {
            game.players.push({ id: socket.id, name: username });
            socket.join(gameId);


            io.to(gameId).emit('startGame', {
                gameId,
                players: game.players.map(player => player.name)
            });
            console.log("Games:", games);
            console.log("Games:", JSON.stringify(games, null, 2));


            console.log(`${username} joined game ${gameId}`)
        } else {
            socket.emit("errorMsg", "Game full or not found!");

        }
    }
    );

    socket.on('makeMove', (data) => {
        const { gameId, move } = data;
        console.log(`User ${socket.id} made move in game ${gameId}:`, move);
        socket.to(gameId).emit("opponentMove", move);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
