import http = require('http');
import socketIO = require('socket.io');
import express = require('express');

export default class RealtimeHttpServer {
  public static readonly DISCONECT = 'disconnect';
  public static readonly FINISH = 'finish';
  public static readonly CONNECTION = 'connection';
  public readonly app: express.Express = express();
  public readonly server: http.Server = http.createServer(this.app);
  public readonly io: socketIO.Server = socketIO.listen(this.server);
  constructor(private port: number = 80) {
    this.server.listen(this.port, () => {
      console.log(`Server started at http://localhost:${port}`);
    })
  }
}