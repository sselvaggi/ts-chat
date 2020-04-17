import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import RealtimeHttpServer from './RealtimeHttpServer';
import Chat from './Chat';
const server = new RealtimeHttpServer(8081);
server.io.on(RealtimeHttpServer.CONNECTION, Chat.create);
server.app.use(express.static(path.join(__dirname, 'public')));
server.app.get('/', (req:express.Request, res:express.Response) => {
  res.setHeader("content-type", "text/html");
  fs.createReadStream(path.join(__dirname, 'frontend', 'index.html')).pipe(res);
});
export default server;