const { createQuicSocket } = require('net');

// Create a QuicSocket associated with localhost and port 1234
const socket = createQuicSocket({ endpoint: { port: 5678 } });


// socket.on('session', async (client) => {
//   client.on('secure', () => {
//     console.log("The QuicClientSession can now be used for application data");
//   });
// })
(async function() {
  const client = await socket.connect({
    address: '127.0.0.1',
    port: 1234,
    alpn: 'hello'
  });
  client.on('secure', (session) => {
    console.log("The QuicClientSession can now be used for application data");
  });

  // The peer opened a new stream!
  client.on('stream', (stream) => {
    // Let's see what the peer has to say...
    stream.setEncoding('utf8');
    stream.on('data', console.log);
    stream.on('end', () => console.log('stream ended'));
  });

  const biStream = await client.openStream({ halfOpen: false });
  biStream.write('hi ');
  biStream.end('from the client!');

})();