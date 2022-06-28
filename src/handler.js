const fs = require('fs');

const pageNotFound = ({ uri }, response) => {
  response.statusCode = 404;
  response.addHeader('Content-Type', 'text/plain');
  response.send('Page Not Found');
  return true;
};

const invalidCommentHandler = (request, response) => {
  response.statusCode = 301;
  response.addHeader('Location', '/guestbook.html');
  response.send('');
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
    tiemStamp: new Date().toLocaleString(),
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
  console.log(comments);

  const stringComments = JSON.stringify(comments);
  fs.writeFileSync(commentsFile, stringComments, 'utf8');
};

const commentHandler = (request, response) => {
  const { uri, params } = request;
  if (!uri === '/comment') {
    return false;
  }

  if (!isValidComment(params)) {
    invalidCommentHandler(request, response);
    return true;
  }

  const commentsHistory = readComments('./data/comments.json');
  const allComments = addComment(params, commentsHistory);
  writeComments(allComments, './data/comments.json');
  response.send('Comment is succesfull!');
  return true;
}

const createHandler = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

module.exports = {
  pageNotFound,
  commentHandler,
  createHandler
}