const getUri = (url) => {
  const requestUrl = `http://localhost${url}`;
  return new URL(requestUrl);
};

const parseUri = (req, res, next) => {
  req.uri = getUri(req.url);
  next();
  return;
};

module.exports = { parseUri };
