const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { createServeFile } = require('./handlers/serveFileContent.js');
const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { parseSearchParams } = require('./handlers/parseSearchParams.js');
const { logRequestHandler } = require('./handlers/logRequestHandler.js');
const { createRouter } = require('./handlers/createRouter.js');
const { timeOutHandler } = require('./handlers/timeOutHandler.js');
const { parseUri } = require('./handlers/parseUri.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');

const asyncApp = (config) => {
  const handlers = [
    parseUri,
    logRequestHandler,
    createServeFile(config.root),
    parseSearchParams,
    parseBodyParams,
    guestBookHandler,
    timeOutHandler,
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { asyncApp };
