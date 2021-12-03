/*
  Start the server with `node node-http-errors.js`
  A list of endpoints will be displayed that results in the relevant http errors
*/
const paths = ['/ECONRESET'];

const pathMap = (port) => paths.map(m => `http://localhost:${port}${m}`).join('\n');

const server = require('http')
  .createServer((req, res) => {

    switch (req.url) {
      case '/ECONRESET':
        console.log('Incomming request... Closing socket.');
        req.socket.destroy();
        break;
      case '/no-connect':
        console.log('Incomming request... Not responding.');
        setTimeout(() => { req.end(); }, 180000);
        break;
      case '/no-end':
        res.write('Hello');
        console.log('Incomming request... Not ending.');
        setTimeout(() => { req.end(); }, 180000);
        break;
      default:
        res.write(`try the following: \n ${pathMap(serverAddress.port)}`); //write a response to the client
        res.end(); //end the response
    }

  })
  .listen(1338);
const serverAddress = server.address();

console.log(`running server on http://localhost:${serverAddress.port}`);
console.log(`Try one of the following paths:

${pathMap(serverAddress.port)}

`);
