const { createServer } = require('net');
const { pageNotFound, commentHandler, createHandler } = require('./src/handler.js');
const { parseRequest } = require('./src/requestParser.js');
const { Response } = require('./src/response.js');
const { createServeFile } = require('./src/serveFileContent.js');

const onRequest = (socket, rawRequest, handle) => {
  const response = new Response(socket);
  const request = parseRequest(rawRequest);
  console.log(request.verb, request.uri);
  handle(request, response);
};

const startServer = (port, handler) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      onRequest(socket, chunk.toString(), handler);
    })
  });

  server.listen(port);
  console.log(`Listening at ${port}`);
};

const main = (serverPath) => {
  const handlers = [
    createServeFile(serverPath),
    commentHandler,
    pageNotFound
  ];
  const handler = createHandler(handlers);
  startServer(80, handler);
};

main('./public');
