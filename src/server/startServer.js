const http = require('http');

const printPort = (port) => console.log(`Listening at ${port}`);


const startServer = (port, router) => {
  const server = http.createServer((req, res) => {
    router(req, res);
  });

  server.listen(port, printPort(port));
};

module.exports = { startServer };
