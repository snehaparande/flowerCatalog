const createRouter = (handlers) => {
  return (req, res) => {
    const next = createNext(handlers);
    next(req, res);
  }
};

const createNext = (handlers) => {
  let index = -1;
  const next = (req, res) => {
    index++;
    if (handlers[index]) {
      handlers[index](req, res, () => next(req, res));
    }
  }
  return next;
};

module.exports = { createRouter, createNext };
