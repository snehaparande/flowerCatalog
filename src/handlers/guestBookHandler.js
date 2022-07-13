const fs = require('fs');
const { createTable, toHtml } = require('../htmlGenerator.js');
const { createRouter } = require('./createRouter.js');
const { createCheckLogin } = require('./loginHandler.js');

const invalidCommentHandler = (request, response) => {
  response.statusCode = 301;
  response.setHeader('Location', '/guestbook');
  response.end('');
  return true;
};

const isValidComment = ({ name, comment }) => {
  if (name && comment) {
    return true;
  }
  return false;
};

const addComment = ({ name, comment }, allComments) => {
  const userComment = {
    date: new Date().toLocaleString(),
    name,
    comment
  }
  allComments.unshift(userComment);
  return allComments;
};

const readComments = (commentsFile) => {
  const commentsAsString = fs.readFileSync(commentsFile, 'utf8');
  const allComments = JSON.parse(commentsAsString);
  return allComments;
};

const writeComments = (comments, commentsFile) => {
  const stringComments = JSON.stringify(comments);
  fs.writeFileSync(commentsFile, stringComments, 'utf8');
};

const commentsToHtml = (comments) => {
  const tableHeaders = ['Date', 'Name', 'Comment'];
  const table = createTable(tableHeaders, comments);
  const content = toHtml(table);
  return content;
};

const addCommentHandler = (request, response, next) => {
  if (request.method !== 'POST') {
    next();
    return;
  }
  const searchParams = request.bodyParams;

  if (!isValidComment(searchParams)) {
    invalidCommentHandler(request, response);
    return;
  }

  const commentsHistory = readComments('./data/comments.json');
  const allComments = addComment(searchParams, commentsHistory);
  writeComments(allComments, './data/comments.json');
  response.statusCode = 302;
  response.setHeader('Location', '/guestbook');
  response.end('');
  return true;

};

const showGuestBook = (request, response, next) => {
  if (request.method !== 'GET') {
    next();
    return;
  }
  const templateFile = './src/templates/guestbook.txt';
  const template = fs.readFileSync(templateFile, 'utf8');
  const commentsHistory = readComments('./data/comments.json');
  const htmlComments = commentsToHtml(commentsHistory);

  const content = template.replace(/__COMMENTS_HISTORY__/, htmlComments);
  response.setHeader('content-type', 'text/html');
  response.end(content);

  return;
};


const createGuestbookRouter = (sessions) => {
  return (req, res, next) => {
    if (!req.uri.pathname.match('/guestbook')) {
      next();
      return;
    }

    const guestBookHandlers = [
      createCheckLogin(sessions),
      showGuestBook,
      addCommentHandler,
      next
    ];

    const guestbookRouter = createRouter(guestBookHandlers);
    return guestbookRouter(req, res, next);
  };
};

module.exports = { createGuestbookRouter };
