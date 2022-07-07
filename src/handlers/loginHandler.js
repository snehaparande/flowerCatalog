const createCheckLogin = (sessions) => {
  return (req, res) => {
    if (req.cookie) {
      const id = req.cookie.id;
      const session = sessions[id];

      if (session) {
        req.session = session;
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
