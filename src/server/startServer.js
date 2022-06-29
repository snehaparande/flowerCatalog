const http = require('http');

const printPort = (port) => console.log(`Listening at ${port}`);

const getUri = (url) => {
  const requestUrl = `http://localhost${url}`;
  return new URL(requestUrl);
};

const toObject = (searchParams) => {
  const params = {};
  const entries = searchParams.entries()
  for (const [name, comment] of entries) {
    params[name] = comment;
  }
  return params;
};

const startServer = (port, app) => {
  const server = http.createServer((req, res) => {
    req.uri = getUri(req.url);
    req.queryPrams = toObject(req.uri.searchParams);
    app(req, res);
  });

  server.listen(port, printPort(port));
};

module.exports = { startServer };
