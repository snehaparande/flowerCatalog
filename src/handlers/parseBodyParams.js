const { URLSearchParams } = require("url");

const createObject = (entries) => {
  const params = {};
  for (const [name, comment] of entries) {
    params[name] = comment;
  }
  return params;
};

const parseURLEncoding = (urlEncoding) => {
  console.log(urlEncoding);
  const bodyParams = new URLSearchParams(urlEncoding);
  return createObject(bodyParams.entries());
};

const isURLEncoded = (headers) => {
  return headers['content-type'] === 'application/x-www-form-urlencoded';
}

const parseBodyParams = (req, res, next) => {
  req.rawBody = '';
  req.on('data', (chunk) => {
    req.rawBody += chunk.toString();
  });

  req.on('end', () => {
    if (isURLEncoded(req.headers)) {
      req.bodyParams = parseURLEncoding(req.rawBody);
    }
    next();
  })
};

module.exports = { parseBodyParams };
