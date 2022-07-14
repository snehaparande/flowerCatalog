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

const readComments = (commentsFile, fs) => {
  const commentsAsString = fs.readFileSync(commentsFile, 'utf8');
  const allComments = JSON.parse(commentsAsString);
  return allComments;
};

const writeComments = (comments, commentsFile, fs) => {
  const stringComments = JSON.stringify(comments);
  fs.writeFileSync(commentsFile, stringComments, 'utf8');
};

const commentsToHtml = (comments) => {
  const tableHeaders = ['Date', 'Name', 'Comment'];
  const table = createTable(tableHeaders, comments);
  const content = toHtml(table);
  return content;
};

const createAddCommentHandler = (guestBookPath, fs) => {
  return (request, response, next) => {
    if (request.method !== 'POST') {
      next();
      return;
    }
    const searchParams = request.bodyParams;

    if (!isValidComment(searchParams)) {
      invalidCommentHandler(request, response);
      return;
    }

    const commentsHistory = readComments(guestBookPath, fs);
    const allComments = addComment(searchParams, commentsHistory);
    writeComments(allComments, guestBookPath, fs);
    response.statusCode = 302;
    response.setHeader('Location', '/guestbook');
    response.end('');
    return true;

  };
};

const createShowGuestBook = (guestBookPath, fs) => {
  return (request, response, next) => {
    if (request.method !== 'GET') {
      next();
      return;
    }
    const templateFile = './src/templates/guestbook.txt';
    const template = fs.readFileSync(templateFile, 'utf8');
    const commentsHistory = readComments(guestBookPath, fs);
    const htmlComments = commentsToHtml(commentsHistory);

    const content = template.replace(/__COMMENTS_HISTORY__/, htmlComments);
    response.setHeader('content-type', 'text/html');
    response.end(content);

    return;
  };
};



const createGuestbookRouter = (guestBookPath, sessions, fs) => {
  return (req, res, next) => {
    if (!req.uri.pathname.match('/guestbook')) {
      next();
      return;
    }

    const guestBookHandlers = [
      createCheckLogin(sessions),
      createShowGuestBook(guestBookPath, fs),
      createAddCommentHandler(guestBookPath, fs),
      next
    ];

    const guestbookRouter = createRouter(guestBookHandlers);
    return guestbookRouter(req, res, next);
  };
};

module.exports = { createGuestbookRouter };
