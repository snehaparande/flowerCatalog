const { notFoundHandler } = require('../app/notFoundHandler.js');
const { createServeFile } = require('../app/serveFileContent.js');
const { commentHandler } = require('../app/commentHandler.js');
const { parseSearchParams } = require('../app/parseSearchParams.js');
const { createHandler } = require('../app/createHandler.js');

const app = (config) => {
  const handlers = [
    createServeFile(config.root),
    parseSearchParams,
    commentHandler,
    notFoundHandler
  ];

  return createHandler(handlers);
};

module.exports = { app };
