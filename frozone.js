
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');
const socketIOClient = require('socket.io-client');
const socketIORedis = require('socket.io-redis');

const app = express();
const uuidv4 = require('uuid/v4');
const moment = require('moment');

app.use(express.static(path.join(__dirname, '/build/Frozone')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/build/Frozone/index.html'))
// });

const port = process.env.PORT || '5050';
app.set('port', port);

const server = http.createServer(app);
const io = socketIO(server);

/* Use REDIS as a messaging agateway to tie services together using common transport */
io.adapter(socketIORedis({
  host: 'localhost',
  port: 6379
}));

/* Listen for Events */
io.on('connection', (socket) => {

    // Acknowledge the connection in server logging
    console.log('user connected');
    // Broadcast that user has connected
    io.emit('log', 'User with Session ID: ' + socket.id + ' has connected.');

    // Handler for disconnection events
    socket.on('disconnect', function () {
        // Broadcast that this user has disconnected
      io.emit('log', 'User (' + socket.id + ') has disconnected');
    });

    // Listen for specific event from this client
    socket.on('task', (t) => {

        // Do stuff
        // result =
        // Send results to this specific client
        socket.emit('task-result', result);
    });
});

/* Listen for Traffic */
server.listen(port, () => {
  console.log('Frozone Server running on', port);
});
