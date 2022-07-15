const createCheckLogin = (sessions) => {
  return (req, res, next) => {
    if (req.cookie) {
      const id = req.cookie.id;
      const session = sessions[id];

      if (session) {
        req.session = session;
        next();
        return;
      }
    }
    res.status(302);
    res.redirect('/login.html');
    res.end();
    return;
  };
};

module.exports = { createCheckLogin };
