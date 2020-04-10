import http = require('http');
import socketIO = require('socket.io');
import express = require('express');
import path = require('path');
export default class Server{
  public readonly app: express.Express = express();
  public readonly server: http.Server = http.createServer(this.app);; 
  public readonly io: socketIO.Server = socketIO.listen(this.server);
  constructor(private port: number = 80, publicDirectory: string) {
    this.app.use(express.static(path.join(__dirname, publicDirectory)));
    this.server.listen(this.port, () => {
      console.log(`Server started at http://localhost:${port}`);
    })
  }
}