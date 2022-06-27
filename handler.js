const pageNotFound = ({ uri }, response) => {
  response.statusCode = 404;
  response.addHeader('Content-Type', 'text/plain');
  response.send('Page Not Found');
  return true;
};

const invalidCommentHandler = (request, response) => {
  response.statusCode = 301;
  response.addHeader('Location', '/guestbook.html')
  response.send('');
  return true;
};

const isValidComment = ({ name, comment }) => {
  if (name && comment) {
    return true;
  }
  return false;
};

const addComment = ({ name, comment }) => {
  const userComment = {
    tiemStamp: new Date,
    name,
    comment
  }
  console.log(userComment);
};

const commentHandler = (request, response) => {
  const { uri, params } = request;
  if (uri === '/comment') {

    if (isValidComment(params)) {
      addComment(params);
      response.send('Comment is succesfull!');
      return true;
    }

    invalidCommentHandler(request, response)
    return true;
  }
  return false
};

const createHandler = (handlers) => {
  return (request, response, serverPath) => {
    for (const handler of handlers) {
      if (handler(request, response, serverPath)) {
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