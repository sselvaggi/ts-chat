import * as express from 'express';
import * as path from 'path';
import RealtimeHttpServer from './RealtimeHttpServer';
import Chat from './Chat';
const server = new RealtimeHttpServer(8081);
server.io.on(RealtimeHttpServer.CONNECTION, Chat.create);
server.app.use(express.static(path.join(__dirname, 'public')));
server.app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'frontend', 'index.html'))
});
export default server;