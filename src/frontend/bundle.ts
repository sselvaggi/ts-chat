///<reference path="../types.d.ts"/>
import sioc from 'socket.io-client';
import ss from 'socket.io-stream';
import parser from 'socket.io-msgpack-parser';
const CHAT_MESSAGE='CHAT_MESSAGE';
//@ts-ignore
const socket = sioc({parser});
const fileInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#file')!
fileInput.addEventListener('change', (event: Event) => {
  const inputEvent:HTMLInputEvent = <HTMLInputEvent>event;
  const files: FileList = inputEvent?.target?.files!;
  if (files?.length) {
    const file = files[0];
    const stream = ss.createStream();
    ss(socket).emit('file', stream, {size: file.size});
    ss.createBlobReadStream(file).pipe(stream);
  } else {
    console.log('file not received')
  }
});

const m:HTMLInputElement = document.querySelector<HTMLInputElement>('#m')!
document.querySelector('form')
?.addEventListener('submit', event => {
  event.preventDefault();
  socket.emit(CHAT_MESSAGE, m.value);
  return false;
});
socket.on(CHAT_MESSAGE, (message:string) => {
  const li = document.createElement('li');
  li.textContent = message;
  document.querySelector('#messages')
  ?.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});