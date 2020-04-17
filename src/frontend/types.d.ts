///<reference path="../../node_modules/@types/socket.io-client/index.d.ts"/>
declare namespace SocketIOClient{
  // Maybe It will be needed to reimplement ConnectOpts that is omiting parser
  // export interface ConnectOpts {
  //   parser?: any
  // }
}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}