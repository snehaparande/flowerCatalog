const timeOutHandler = (req, res, next) => {
  if (req.uri.pathname === '/comment') {
    setTimeout(() => {
      res.end('found');
    }, 5000);
    return;
  }
  next()
  return;
};

module.exports = { timeOutHandler };
