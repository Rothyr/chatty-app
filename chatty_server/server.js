// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;
const webSocket = require('ws');

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === webSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function incoming(data) {
    wss.broadcast(data);
      }
  );

  ws.on('close', () => console.log('Client disconnected'));

  });
