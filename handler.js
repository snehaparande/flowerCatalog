const pageNotFound = ({ uri }, response) => {
  response.statusCode = 404;
  response.addHeader('Content-Type', 'text/plain');
  response.send('Page Not Found');
  return true;
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
  createHandler
}