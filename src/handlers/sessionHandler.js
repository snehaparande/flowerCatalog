const createSessionHandler = (sessions) => {
  return (req, res, next) => {
    if (req.session) {
      next();
      return;
    }

    const time = new Date();
    const sessionId = time.valueOf();
    sessions[sessionId] = {
      time,
      sessionId,
      username: req.body.username,
      maxAge: 30
    };

    res.cookie('id', sessionId, { expires: new Date(Date.now() + 30000) });

    res.status(302);
    res.redirect('/guestbook');
    res.end();
    return;
  }
};

module.exports = { createSessionHandler };
