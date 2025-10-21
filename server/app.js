const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.post('/ai-move', async (req, res) => {
    try {
        const { board } = req.body;

        const ai = new GoogleGenAI({ apiKey: 'AIzaSyBrHa1rAX16O5rQ6aqS0cYuLcqOz76UGGc' });

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: `
You are a Tic Tac Toe AI that plays as 'O'.
The board is an array of 9 cells (indexes 0-8), where each cell can be 'X', 'O', or null.
Respond ONLY with a number (0-8) representing your move.
Board: ${JSON.stringify(board)}
      `,
        });

        const moveText = response.text.trim();
        const move = parseInt(moveText, 10);

        if (isNaN(move) || move < 0 || move > 8) {
            console.log('Invalid AI response:', moveText);
            return res.status(400).json({ error: 'Invalid AI response', moveText });
        }

        res.status(200).json({ move });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`AI server listening on port ${port}`);
});