///<reference path="../../node_modules/@types/socket.io-client/index.d.ts"/>
///<reference path="types.d.ts"/>
const CHAT_MESSAGE='CHAT_MESSAGE'
const socket = io();
const fileInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#file')!
fileInput.addEventListener('change', (event: Event) => {
  const inputEvent:HTMLInputEvent = <HTMLInputEvent>event;
  const files: FileList = inputEvent?.target?.files!;
  if (files?.length) {
    const file = files[0];
    //@ts-ignore //ss
    const stream = ss.createStream();
    //@ts-ignore //ss
    ss(socket).emit('file', stream, {size: file.size});
    //@ts-ignore //ss
    ss.createBlobReadStream(file).pipe(stream);
  } else {
    console.log('file not received')
  }
});

const m:HTMLInputElement = <HTMLInputElement>document.querySelector('#m')!
//@ts-ignore
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  socket.emit(CHAT_MESSAGE, m.value);
  return false;
});
socket.on(CHAT_MESSAGE, (message:string) => {
  const li = document.createElement('li');
  li.textContent = message;
  //@ts-ignore
  document.querySelector('#messages')
  .appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});