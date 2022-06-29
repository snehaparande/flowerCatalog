const http = require('http');

const printPort = (port) => console.log(`Listening at ${port}`);

const getUri = (url) => {
  const requestUrl = `http://localhost${url}`;
  return new URL(requestUrl);
};

const startServer = (port, app) => {
  const server = http.createServer((req, res) => {
    req.uri = getUri(req.url);
    app(req, res);
  });

  server.listen(port, printPort(port));
};

module.exports = { startServer };
