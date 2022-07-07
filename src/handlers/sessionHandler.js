const createSessionHandler = (sessions) => {
  return (req, res, next) => {
    if (req.session) {
      next();
      return;
    }

    if (!(req.method === 'POST')) {
      next();
      return;
    }

    const pathname = req.uri.pathname;
    if (!(pathname === '/login')) {
      next();
      return;
    }

    const username = req.bodyParams.username;
    sessions[username] = {
      sessionId: username,
      time: new Date(),
      maxAge: 30
    };

    res.setHeader('set-cookie', `id=${username}; Max-Age=30`);

    res.statusCode = 302;
    res.setHeader('Location', '/guestbook');
    res.end('');
    return;
  }
};

module.exports = { createSessionHandler };
