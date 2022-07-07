const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { createServeFile } = require('./handlers/serveFileContent.js');
const { parseSearchParams } = require('./handlers/parseSearchParams.js');
const { logRequestHandler } = require('./handlers/logRequestHandler.js');
const { createRouter } = require('./handlers/createRouter.js');
const { parseUri } = require('./handlers/parseUri.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { parseCookie } = require('./handlers/cookieParsers.js');
const { createSessionHandler } = require('./handlers/sessionHandler.js');
const { createGuestbookRouter } = require('./handlers/guestBookHandler.js');

const asyncApp = (config) => {
  const sessions = {};

  const handlers = [
    parseUri,
    logRequestHandler,
    createServeFile(config.root),
    parseCookie,
    parseSearchParams,
    parseBodyParams,
    createSessionHandler(sessions),
    createLogoutHandler(sessions),
    createGuestbookRouter(sessions),
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { asyncApp };
