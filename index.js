const { app } = require("./src/app.js");
const { startServer } = require("./src/server/startServer.js");
const fs = require('fs');

const config = {
  root: './public',
  guestBookPath: './data/comments.json'
};

const sessions = {};

startServer(8888, app(config, sessions, console.log, fs));
