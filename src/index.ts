import Server from './Server';
import {Socket} from 'socket.io';
export const server = new Server(8081, 'frontend');
server.io.on('connection', (socket: Socket) => {
  console.log('new socket conn');
  socket.on('chat message', (message: String) => {
    server.io.emit('chat message', message);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('finish', () => {
      console.log('user disconnected');
    });
  });
});