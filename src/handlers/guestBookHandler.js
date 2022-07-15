const { createTable, toHtml } = require('../htmlGenerator.js');

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

    const searchParams = request.body;

    if (!isValidComment(searchParams)) {
      invalidCommentHandler(request, response);
      return;
    }

    const commentsHistory = readComments(guestBookPath, fs);
    const allComments = addComment(searchParams, commentsHistory);
    writeComments(allComments, guestBookPath, fs);
    response.status(302);
    response.redirect('/guestbook');
    response.end();
    return true;

  };
};

const createShowGuestBook = (guestBookPath, fs) => {
  return (request, response, next) => {
    console.log('inside show guest book');
    const templateFile = './src/templates/guestbook.txt';
    const template = fs.readFileSync(templateFile, 'utf8');
    const commentsHistory = readComments(guestBookPath, fs);
    const htmlComments = commentsToHtml(commentsHistory);

    const content = template.replace(/__COMMENTS_HISTORY__/, htmlComments);
    response.set('content-type', 'text/html');
    response.send(content);
    response.end();

    return;
  };
};

module.exports = { createShowGuestBook, createAddCommentHandler };
