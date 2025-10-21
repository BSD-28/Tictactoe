const express = require('express');
const app = express();
const PORT = 3000;

const { createServer } = require('http');
const { Server } = require('socket.io');

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});

app.get('/', (req, res) => {
    res.send('Tic Tac Toe Server is running');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        console.log(`User ${socket.id} joined game ${gameId}`);
    }
    );

    socket.on('makeMove', (data) => {
        const { gameId, move } = data;
        console.log(`User ${socket.id} made move in game ${gameId}:`, move);
        io.to(gameId).emit('moveMade', move);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
