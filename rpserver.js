const WebSocket = require('ws');
const fs = require('fs');

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server running on ws://<RaspberryPi-IP>:8080');

// Log declined logins
function logDeclinedLogin(userId) {
  const logEntry = `Declined login for user: ${userId} at ${new Date().toISOString()}\n`;
  fs.appendFileSync('declined_logins.txt', logEntry);
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Simulate sending user authentication data
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'auth') {
      console.log(`Received authentication request for user: ${data.userId}`);

      // Simulate sending user data to the application
      ws.send(JSON.stringify({ type: 'auth', userId: data.userId }));
    } else if (data.type === 'response') {
      // Handle approval/denial response
      if (data.status === 'declined') {
        console.log(`Login declined for user: ${data.userId}`);
        logDeclinedLogin(data.userId);
      } else {
        console.log(`Login approved for user: ${data.userId}`);
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});