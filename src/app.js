const fs = require('fs');
const express = require('express');
const { createRequestLogger } = require('./handlers/logRequestHandler.js');
const { parseCookie } = require('./handlers/cookieParsers.js');
const { createSessionHandler } = require('./handlers/sessionHandler.js');
const { createCheckLogin } = require('./handlers/loginHandler.js');
const { createLogoutHandler } = require('./handlers/logoutHandler.js');
const { createShowGuestBook, createAddCommentHandler } =
  require('./handlers/guestBookHandler.js');

const createApp = (config, sessions, logger, fs) => {
  const app = express();

  app.use(createRequestLogger(logger));
  app.use(express.static(config.root));
  app.use(express.urlencoded({ extended: true }));
  app.use(parseCookie);
  app.post('/login', createSessionHandler(sessions));
  app.get('/logout', createLogoutHandler(sessions));

  const router = express.Router();
  router.use(createCheckLogin(sessions));
  router.get('/', createShowGuestBook(config.guestBookPath, fs));
  router.post('/', createAddCommentHandler(config.guestBookPath, fs));
  app.use('/guestbook', router);

  return app;
};

module.exports = { createApp };
