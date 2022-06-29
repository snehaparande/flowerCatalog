const fs = require('fs');
const { createTable, toHtml } = require('./htmlGenerator.js');

const invalidCommentHandler = (request, response) => {
  response.statusCode = 301;
  response.setHeader('Location', '/guestbook.html');
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
  allComments.push(userComment);
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

const showComments = (comments, res) => {
  const tableHeaders = ['Date', 'Name', 'Comment'];
  const table = createTable(tableHeaders, comments);
  const content = toHtml(table);
  res.end(content);
};

const commentHandler = (request, response) => {
  const pathname = request.uri.pathname;
  const searchParams = request.searchParams;

  if (!(pathname === '/comment')) {
    return false;
  }

  if (!isValidComment(searchParams)) {
    invalidCommentHandler(request, response);
    return true;
  }

  const commentsHistory = readComments('./data/comments.json');
  const allComments = addComment(searchParams, commentsHistory);
  writeComments(allComments, './data/comments.json');
  showComments(allComments, response);
  return true;
}

module.exports = { commentHandler };
