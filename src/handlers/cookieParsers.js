const parseCookie = (req, res, next) => {
  if (!req.headers.cookie) {
    next();
    return;
  }
  //Todo: Parse multiple cookies
  const [name, value] = req.headers.cookie.split('=');
  req.cookie = {};
  req.cookie[name] = value;
  next();
};

module.exports = { parseCookie };
