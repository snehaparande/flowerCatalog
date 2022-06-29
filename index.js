const { app } = require("./src/server/app.js");
const { startServer } = require("./src/server/startServer.js");

const config = {
  root: './public',
  guestBookPath: './data/comments.json'
};

startServer(80, app(config));
