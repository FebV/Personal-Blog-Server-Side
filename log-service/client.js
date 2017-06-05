const net = require('net');
const client = net.createConnection({port: 8124}, () => {
  //'connect' listener
  console.log('connected to server!');
  for(let i = 0; i < 200; i++)
    client.write('world!\r\n');
  setTimeout(() => {
      client.end();
  })
});
// client.on('data', (data) => {
//     console.log(data.length);
//   console.log(data.toString());
// });
client.on('end', () => {
  console.log('disconnected from server');
});