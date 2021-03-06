const fs = require('fs');
const { GuestBook } = require('./guestBook.js');
const express = require('express');
const { createRequestLogger } = require('./handlers/logRequestHandler.js');
const { parseCookie } = require('./handlers/cookieParsers.js');
const { createSessionHandler } = require('./handlers/sessionHandler.js');
const { createCheckLogin } = require('./handlers/loginHandler.js');
const { createLogoutHandler } = require('./handlers/logoutHandler.js');
const { createShowGuestBook, createAddCommentHandler, invalidCommentHandler } =
  require('./handlers/guestBookHandler.js');

const readComments = (path, readFile) => {
  return readFile(path, 'utf8');
}

const persist = (path, writeFile, comments) => {
  const stringComments = JSON.stringify(comments);
  writeFile(path, stringComments, 'utf8');
};

const createApp = (config, sessions, logger, readFile, writeFile) => {
  const app = express();

  app.use(createRequestLogger(logger));
  app.use(express.static(config.root));
  app.use(express.urlencoded({ extended: true }));
  app.use(parseCookie);
  app.post('/login', createSessionHandler(sessions));
  app.get('/logout', createLogoutHandler(sessions));

  const persistToFile = persist.bind(null, config.guestBookPath, writeFile);
  const comments = JSON.parse(readComments(config.guestBookPath, readFile));
  const guestBook = new GuestBook(comments);
  const template = readComments(config.guestBookTemplate, readFile);


  const router = express.Router();
  router.use(createCheckLogin(sessions));
  router.get('/', createShowGuestBook(guestBook, template));
  router.post('/',
    createAddCommentHandler(guestBook, persistToFile),
    invalidCommentHandler
  );
  app.use('/guestbook', router);

  return app;
};

module.exports = { createApp };
