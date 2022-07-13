const createRequestLogger = (logger) => {
  return (request, response, next) => {
    logger(request.method, request.uri.pathname);
    next();
    return;
  };
};

module.exports = { createRequestLogger };
