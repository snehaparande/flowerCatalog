const logRequestHandler = (request, response, next) => {
  console.log(request.method, request.uri.pathname);
  next();
  return;
};

module.exports = { logRequestHandler };
