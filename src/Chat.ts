import Server from './RealtimeHttpServer';
import {Socket} from 'socket.io';
import * as ss from 'socket.io-stream';
import * as fs from 'fs';
import * as path from 'path';
const logger = console.log;

export default class ChatClient {
  public static readonly CHAT_MESSAGE = 'chat message';
  public static create(socket: Socket) {
    console.log('new socket conn');
    return new ChatClient(socket);
  }
  public constructor(readonly socket: Socket) {
    ss(socket).on('file', this.onSocketFileReceiving);
    socket.on(ChatClient.CHAT_MESSAGE, this.onChatMessage);
    socket.on(Server.DISCONECT, this.onClientDisconnect);
    socket.on(Server.FINISH, this.onClientDisconnect);
  }
  private onClientDisconnect() {
    console.log('user disconnected');
  }
  private onChatMessage = (message: String) => {
    this.socket.server.emit(ChatClient.CHAT_MESSAGE, message);
  };
  private onSocketFileReceiving(stream: fs.ReadStream, data: {name:string}) {
    const filename = path.basename('profile.jpg');
    stream.pipe(fs.createWriteStream(filename));
  }
}