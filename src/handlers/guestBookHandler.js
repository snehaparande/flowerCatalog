const fs = require('fs');
const { createTable, toHtml } = require('../htmlGenerator.js');
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

const addCommentHandler = (request, response) => {
  if (!(request.method === 'POST')) {
    return false;
  }
  const searchParams = request.bodyParams;

  if (!isValidComment(searchParams)) {
    invalidCommentHandler(request, response);
    return true;
  }

  const commentsHistory = readComments('./data/comments.json');
  const allComments = addComment(searchParams, commentsHistory);
  writeComments(allComments, './data/comments.json');
  response.statusCode = 302;
  response.setHeader('Location', '/guestbook');
  response.end('');
  return true;

};

const showGuestBook = (request, response) => {
  if (!(request.method === 'GET')) {
    return false;
  }
  const templateFile = './src/templates/guestbook.txt';
  const template = fs.readFileSync(templateFile, 'utf8');
  const commentsHistory = readComments('./data/comments.json');
  const htmlComments = commentsToHtml(commentsHistory);

  const content = template.replace(/__COMMENTS_HISTORY__/, htmlComments);
  response.setHeader('content-type', 'text/html');
  response.end(content);

  return true;
};


const createGuestbookRouter = (sessions) => {
  return (req, res, next) => {
    if (!req.uri.pathname.match('/guestbook')) {
      next();
      return;
    }
    const checkLogin = createCheckLogin(sessions);

    if (checkLogin(req, res)) {
      return;
    }

    if (showGuestBook(req, res)) {
      return;
    }

    if (addCommentHandler(req, res)) {
      return;
    }
    next();
  };
};

module.exports = { createGuestbookRouter };
