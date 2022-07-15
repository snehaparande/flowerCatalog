const fs = require('fs');
const { createTable, toHtml } = require('../htmlGenerator.js');

const invalidCommentHandler = (request, response, next) => {
  response.redirect('/guestbook');
  response.end();
  return true;
};

const commentsToHtml = (comments) => {
  const tableHeaders = ['Date', 'Name', 'Comment'];
  const table = createTable(tableHeaders, comments);
  const content = toHtml(table);
  return content;
};

const createAddCommentHandler = (guestBook, persistToFile) => {
  return (req, res, next) => {
    const { comment } = req.body;

    if (!comment) {
      next();
      return;
    }

    guestBook.addComment({
      name: req.session.username,
      comment
    });
    persistToFile(guestBook.comments);

    res.redirect('/guestbook');
    res.end();
    return true;
  };
};

const createShowGuestBook = (guestBook) => {
  return (req, res, next) => {
    const templateFile = './src/templates/guestbook.html';
    const template = fs.readFileSync(templateFile, 'utf8');
    const htmlComments = commentsToHtml(guestBook.comments);

    let content = template.replace(/__COMMENTS_HISTORY__/, htmlComments);
    content = content.replace(/__USERNAME__/, req.session.username);

    res.set('content-type', 'text/html');
    res.send(content);
    res.end();
    return;
  };
};

module.exports = {
  createShowGuestBook,
  createAddCommentHandler,
  invalidCommentHandler
};
