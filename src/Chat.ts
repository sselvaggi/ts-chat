import Server from './RealtimeHttpServer';
import {Socket} from 'socket.io';
const ss = require('socket.io-stream');
import * as fs from 'fs';
import * as path from 'path';
const logger = console.log;


export default class Chat {
  public static readonly CHAT_MESSAGE = 'CHAT_MESSAGE';
  public static readonly UPLOADS_DIR = path.resolve(`${__dirname}/../uploads`);
  public static create(socket: Socket) {
    logger('new socket conn');
    return new Chat(socket);
  }
  public constructor(readonly socket: Socket) {
    ss(socket).on('file', this.onSocketFileReceiving);
    socket.on(Chat.CHAT_MESSAGE, this.onChatMessage);
    socket.on(Server.DISCONECT, this.onClientDisconnect);
    socket.on(Server.FINISH, this.onClientDisconnect);
  }
  private onClientDisconnect() {
    logger('user disconnected');
  }
  private onChatMessage = (message: String) => {
    this.socket.server.emit(Chat.CHAT_MESSAGE, message);
  };
  private onSocketFileReceiving(stream: fs.ReadStream, data: {name:string}) {
    const filename = `${Chat.UPLOADS_DIR}/profile.jpg`;
    stream.pipe(fs.createWriteStream(filename));
  }
}