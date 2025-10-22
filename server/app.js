const express = require('express');
const app = express();
const PORT = 3000;
const cors = require("cors")

const { createServer } = require('http');
const { Server } = require('socket.io');
const { GoogleGenAI } = require('@google/genai');


const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Tic Tac Toe Server is running');
});

app.post('/ai-move', async (req, res) => {
    try {
        const { board } = req.body;

        if (!board || !Array.isArray(board) || board.length !== 9) {
            return res.status(400).json({ error: "Board harus array 9 elemen" });
        }

        const ai = new GoogleGenAI({
            apiKey: 'AIzaSyBrHa1rAX16O5rQ6aqS0cYuLcqOz76UGGc',
        });

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `
You are a Tic Tac Toe AI that plays as 'O'.
The board is an array of 9 cells (indexes 0-8), where each cell can be 'X', 'O', or null.
Respond ONLY with a number (0-8) representing your move.
Board: ${JSON.stringify(board)}
            `,
        });

        console.log("AI candidates content:", JSON.stringify(response.candidates[0].content, null, 2));

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
        res.status(500).json({ message: 'Internal server error' });
    }
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
