import http = require('http');
import socketIO = require('socket.io');
import express = require('express');
import path = require('path');
class Server{
  constructor(private port : number = 80){
    const app = express();
    app.use(express.static(path.join(__dirname, 'frontend')));
    const server = http.createServer(app);
    const io = socketIO.listen(server);
    io.on('connection', (socket: socketIO.Socket) => {
      console.log('new socket conn');
      socket.on('chat message', (message: String) => {
        io.emit('chat message', message)
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
        socket.on('finish', () => {
          console.log('user disconnected');
        });
      });
    });
    server.listen(this.port,() => {
      console.log(`Server started at http://localhost:${port}`);
    })
  }
}

const server = new Server(8081);