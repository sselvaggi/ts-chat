// <reference path="types.d.ts"/>
// <reference path="../../node_modules/socket.io-client/dist/socket.io.js"/>
// import { ss, HTMLInputEvent } from "./types.d";
// import * as io from 'socket.io-client'
// import * as ss from 'socket.io-stream';
// import Chat from '../Chat';

//const ss: SocketIOStream = new SocketIOStream();
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const socket = io();

//@ts-ignore
document.querySelector('#file').addEventListener('change', (event: HTMLInputEvent) => {
  console.log('file')
  //@ts-ignore
  const file = event.target.files[0];
  //@ts-ignore
  const stream = ss.createStream();
  // ss(socket).emit('file', stream, {size: file.size});
  // ss.createBlobReadStream(file).pipe(stream);
});
//@ts-ignore
const m:HTMLInputElement = document.querySelector('#m');
//@ts-ignore
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  console.log('CHAT_MESSAGE')
  socket.emit('CHAT_MESSAGE', m.value);
  return false;
});
socket.on('CHAT_MESSAGE', (message:string) => {
  const li = document.createElement('li');
  li.textContent = message;
  //@ts-ignore
  document.querySelector('#messages')
  .appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});