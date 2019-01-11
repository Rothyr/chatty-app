// Server.js

const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;
const webSocket = require('ws');
const uuidv4 = require('uuid/v4');

//Express Server
const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets Server
const wss = new SocketServer({ server });

//Count Number of Users Connected
let userCount = 0;

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === webSocket.OPEN) {
      client.send(data);
    }
  });
}


wss.on('connection', (ws) => {
  userCount ++;
  wss.broadcast(userCount);
  console.log('Client connected. Number of users logged-in: ' + userCount);

  ws.on('message', function incoming(data) {
    const parsed = JSON.parse(data);
    switch(parsed.type) {
      case 'postMessage':
        const incoming = {
          type: 'incomingMessage',
          id: uuidv4(),
          username: parsed.username,
          content: parsed.content
        };
        wss.broadcast(JSON.stringify(incoming));

        break;

      case 'postNotification':
        const notification = {
          type: 'incomingNotification',
          id: uuidv4(),
          content: parsed.content
        };
        wss.broadcast(JSON.stringify(notification));

        break;
    }
  })

  ws.on('close', () => {
    userCount --;
    wss.broadcast(userCount);
    console.log('Client disconnected. Number of users logged-in: ' + userCount);
  });
});
