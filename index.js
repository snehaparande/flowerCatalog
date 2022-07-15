const { createApp } = require("./src/app.js");
const fs = require('fs');

const main = (logger, readFile, writeFile) => {
  const config = {
    root: './public',
    guestBookPath: './data/comments.json',
    guestBookTemplate: './src/templates/guestbook.html'
  };
  const sessions = {};

  const app = createApp(config, sessions, logger, readFile, writeFile);
  app.listen(8888, () => console.log('Listening at 8888'));
};

main(console.log, fs.readFileSync, fs.writeFileSync);
