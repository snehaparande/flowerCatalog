const { app, asyncApp } = require("./src/app.js");
const { startServer } = require("./src/server/startServer.js");

const config = {
  root: './public',
  guestBookPath: './data/comments.json'
};

const sessions = {};

startServer(8888, asyncApp(config, sessions));
