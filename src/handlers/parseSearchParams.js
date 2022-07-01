const parseSearchParams = (request, response, next) => {
  const params = {};
  const entries = request.uri.searchParams.entries()
  for (const [name, comment] of entries) {
    params[name] = comment;
  }
  request.searchParams = params;
  next()
  return;
};

module.exports = { parseSearchParams };
