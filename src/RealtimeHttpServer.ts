///<reference path="types.d.ts"/>
import http = require('http');
import socketIO from 'socket.io';
import express from 'express';
import customParser from 'socket.io-msgpack-parser';
export default class RealtimeHttpServer {
  public static readonly DISCONECT = 'disconnect';
  public static readonly FINISH = 'finish';
  public static readonly CONNECTION = 'connection';
  public readonly app: express.Express = express();
  public readonly server: http.Server = http.createServer(this.app);
  //@ts-ignore // parser property was ommited in SocketIO.ServerOptions
  public readonly io: socketIO.Server = socketIO.listen(this.server, {
    parser: customParser
  });
  constructor(private port: number = 80) {
    this.server.listen(this.port, () => {
      console.log(`Server started at http://localhost:${port}`);
    })
  }
  public close() {
    this.server.close()
  }
}