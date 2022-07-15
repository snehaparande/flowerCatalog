const { createApp } = require("./src/app.js");
const fs = require('fs');

const main = (logger, fs) => {
  const config = {
    root: './public',
    guestBookPath: './data/comments.json'
  };
  const sessions = {};

  const app = createApp(config, sessions, logger, fs);
  app.listen(8888, () => console.log('Listening at 8888'));
};

main(console.log, fs);
