const createRequestLogger = (logger) => {
  return (req, res, next) => {
    logger(req.method, req.path);
    next();
  };
};

module.exports = { createRequestLogger };
