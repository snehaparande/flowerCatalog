const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { createServeFile } = require('./handlers/serveFileContent.js');
const { parseSearchParams } = require('./handlers/parseSearchParams.js');
const { createRequestLogger } = require('./handlers/logRequestHandler.js');
const { createRouter } = require('./handlers/createRouter.js');
const { parseUri } = require('./handlers/parseUri.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { parseCookie } = require('./handlers/cookieParsers.js');
const { createSessionHandler } = require('./handlers/sessionHandler.js');
const { createGuestbookRouter } = require('./handlers/guestBookHandler.js');
const { createLogoutHandler } = require('./handlers/logoutHandler.js');
const { connected } = require('process');

const app = (config, sessions, logger, fs) => {
  const handlers = [
    parseUri,
    createRequestLogger(logger),
    createServeFile(config.root),
    parseCookie,
    parseSearchParams,
    parseBodyParams,
    createSessionHandler(sessions),
    createLogoutHandler(sessions),
    createGuestbookRouter(config.guestBookPath, sessions, fs),
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
