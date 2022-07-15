const { createTable, toHtml } = require('../htmlGenerator.js');

const invalidCommentHandler = (request, response) => {
  response.statusCode = 301;
  response.setHeader('Location', '/guestbook');
  response.end('');
  return true;
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
  return (req, res, next) => {

    const { comment } = req.body;

    if (!comment) {
      invalidCommentHandler(req, res);
      return;
    }

    const commentsHistory = readComments(guestBookPath, fs);
    const allComments = addComment({ name: req.session.username, comment }, commentsHistory);
    writeComments(allComments, guestBookPath, fs);
    res.status(302);
    res.redirect('/guestbook');
    res.end();
    return true;

  };
};

const createShowGuestBook = (guestBookPath, fs) => {
  return (req, res, next) => {
    const templateFile = './src/templates/guestbook.html';
    const template = fs.readFileSync(templateFile, 'utf8');
    const commentsHistory = readComments(guestBookPath, fs);
    const htmlComments = commentsToHtml(commentsHistory);

    let content = template.replace(/__COMMENTS_HISTORY__/, htmlComments);
    content = content.replace(/__USERNAME__/, req.session.username);
    res.set('content-type', 'text/html');
    res.send(content);
    res.end();

    return;
  };
};

module.exports = { createShowGuestBook, createAddCommentHandler };
