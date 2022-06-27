const { createServer } = require('net');
const { parseRequest } = require('./src/requestParser.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { Response } = require('./src/response.js');

const onRequest = (socket, rawRequest, handle, serverPath) => {
  const response = new Response(socket);
  const request = parseRequest(rawRequest);
  console.log(request.verb, request.uri);
  handle(request, response, serverPath);
};


const startServer = (port, handler, serverPath) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      onRequest(socket, chunk.toString(), handler, serverPath);
    })
  });

  server.listen(port);
  console.log(`Listening at ${port}`);
};

startServer(80, serveFileContent, './public');