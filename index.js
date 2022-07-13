const { app } = require("./src/app.js");
const { startServer } = require("./src/server/startServer.js");

const config = {
  root: './public',
  logger: console.log,
  guestBookPath: './data/comments.json'
};

const sessions = {};

startServer(8888, app(config, sessions));
