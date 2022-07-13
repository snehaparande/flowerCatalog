const createCheckLogin = (sessions) => {
  return (req, res, next) => {
    if (req.cookie) {
      const id = req.cookie.id;
      const session = sessions[id];

      if (session) {
        req.session = session;
        next();
        return false;
      }
    }
    res.statusCode = 302;
    res.setHeader('Location', '/login.html');
    res.end('');
    return true;
  };
};

module.exports = { createCheckLogin };
