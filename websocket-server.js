// server.js
const WebSocket = require('ws');
const PORT = 3001;

const wss = new WebSocket.Server({ port: PORT });

console.log(`[SERVER] WebSocket server listening on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
    console.log('[SERVER] New client connected.');

    ws.on('open', () => {
        console.log('[TEST CLIENT] Connected');
        ws.send('Hello from test client');
    });

    ws.on('message', (message) => {
        console.log(`[SERVER] Received: ${message}`);

        // Optional: Broadcast to all clients (useful for multiple viewers)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("==========================================================================");
                client.send(`[FIX-LOG] ${message}`);
            }
        });

        // Optional: Echo back to sender
        ws.send(`[WebSocket-server-LOG] sent: ${message}`);
    });

    ws.on('close', () => {
        console.log('[SERVER] Client disconnected.');
    });

    ws.on('error', (err) => {
        console.error('[SERVER] WebSocket error:', err);
    });
});
