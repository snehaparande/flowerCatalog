const createLogoutHandler = (sessions) => {
  return (req, res, next) => {
    if (req.cookie) {
      const cookieId = req.cookie.id;
      delete sessions[cookieId];
      res.clearCookie('id');
    }

    res.status(302);
    res.redirect('/index.html');
    res.end();
    return;
  }
};

module.exports = { createLogoutHandler };
