const parseSearchParams = (request, response) => {
  const params = {};
  const entries = request.uri.searchParams.entries()
  for (const [name, comment] of entries) {
    params[name] = comment;
  }
  request.searchParams = params;
  return false;
};

module.exports = { parseSearchParams };
