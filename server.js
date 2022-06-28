const { createServer } = require('net');
const { pageNotFound, commentHandler, createHandler } = require('./handler.js');
const { parseRequest } = require('./src/requestParser.js');
const { Response } = require('./src/response.js');
const { serveFileContent } = require('./src/serveFileContent.js');

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

const main = (serverPath) => {
  const handlers = [
    serveFileContent,
    commentHandler,
    pageNotFound
  ];
  const handler = createHandler(handlers);
  startServer(80, handler, serverPath);
};

main('./public');
