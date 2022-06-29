const { notFoundHandler } = require('../app/notFoundHandler.js');
const { createServeFile } = require('../app/serveFileContent.js');
const { commentHandler } = require('../app/commentHandler.js');
const { createHandler } = require('../app/createHandler.js');

const app = (config) => {
  const handlers = [
    createServeFile(config.root),
    // parseQueryParams,
    commentHandler,
    notFoundHandler
  ];

  return createHandler(handlers);
};

module.exports = { app };
