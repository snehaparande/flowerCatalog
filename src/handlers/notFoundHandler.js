const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Page Not Found');
  return true;
};

module.exports = { notFoundHandler };
