import Chat from '../src/Chat';
import RealtimeHttpServer from '../src/RealtimeHttpServer';
import socketIO = require('socket.io');
import * as assert from 'assert'; 
import server from '../src';
let s:RealtimeHttpServer | null;
before(() => {  
  s = new RealtimeHttpServer(8080);
})
after(() => {
  s.close();
  s = null;
})
describe('testSample', () => {
  it('should return -1 when the value is not present ', (done) => {
    const io:socketIO.Server = s.io;
    io.on(RealtimeHttpServer.CONNECTION, Chat.create);
    assert.equal([1, 2, 3].indexOf(4), -1);
    done();
  });
});