'use strict';

const utils = require('./utils.js');
const key = utils.getTLSKeySomehow();
const cert = utils.getTLSCertSomehow();

const { createQuicSocket } = require('net');

const socket = createQuicSocket({ endpoint: { port: 1234 } });

socket.on('session', async (session) => {
    console.log("New server side session has been created!");

    session.on('secure', () => {
      console.log("The QuicServerSession can now be used for application data");
    });

    // The peer opened a new stream!
    session.on('stream', (stream) => {
      // Let's say hello
      stream.write('Hello World');
  
      // Let's see what the peer has to say...
      stream.setEncoding('utf8');
      stream.on('data', console.log);
      stream.on('end', () => console.log('stream ended'));
    });
  
    const uni = await session.openStream({ halfOpen: true });
    uni.write('hi ');
    uni.end('from the server!');
  });
  
  // Tell the socket to operate as a server using the given
  // key and certificate to secure new connections, using
  // the fictional 'hello' application protocol.
  (async function() {
    await socket.listen({ key, cert, alpn: 'hello' });
    console.log('The socket is listening for sessions!');
  })();
  