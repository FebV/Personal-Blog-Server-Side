const net = require('net');

let counter = 0;
let msgStr = null;
let intv = setInterval(async () => {
    if(msgStr === null)
        return;
    const msgArr = msgStr.split('\r\n');
    if(msgArr.length < 2)
        return;
    msgStr = msgArr[msgArr.length-1];
    for(let i = 0; i < msgArr.length - 1; i++) {
        // console.log(msgArr[i]);
        const db = require('./dbConnect');
        const log = await db('log');
        log.insert({content: msgArr[i]});
        console.log(`handling ${i}th of msgArr`);
    }
}, 1000);
const server = net.createServer((c) => {
  console.log('client connected');


  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', data => {
      if(msgStr === null)
        msgStr = data.toString();
      else
        msgStr += data.toString();
      console.log(msgStr);
  });

});


server.on('error', (err) => {
  throw err;
});
server.listen(8888, () => {
  console.log('server bound');
});