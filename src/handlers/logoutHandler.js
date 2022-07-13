const createLogoutHandler = (sessions) => {
  return (req, res, next) => {
    if ((req.uri.pathname !== '/logout') || (req.method !== 'GET')) {
      next();
      return;
    }

    if (req.cookie) {
      const cookieId = req.cookie.id;
      delete sessions[cookieId];
      res.setHeader('set-cookie', `id=${cookieId}; Max-Age=0`);
    }

    res.statusCode = 302;
    res.setHeader('Location', '/home.html');
    res.end('');
    return true;
  }
};

module.exports = { createLogoutHandler };
