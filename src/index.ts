import RealtimeHttpServer from './RealtimeHttpServer';
import Chat from './Chat';
import * as express from 'express';
import * as path from 'path';
const server = new RealtimeHttpServer(8081);
server.io.on(RealtimeHttpServer.CONNECTION, Chat.create);
server.app.use(express.static(path.join(__dirname, 'frontend')));
export default server;