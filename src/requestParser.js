const parseLine = (line) => {
  const words = line.split('+')
  return words.join(' ');
};

const parseText = (text) => {
  const lines = text.split('%0D%0A');
  const parsedLines = lines.map(parseLine);
  return parsedLines.join('\r\n');
};

const parseUri = (queryString) => {
  const params = {};
  const [uri, rawParams] = queryString.split('?');
  if (rawParams) {
    rawParams.split('&').forEach(param => {
      const [name, value] = param.split('=');
      params[name] = parseText(value);
    });
  }
  return { uri, params };
};

const parseRequestLine = (line) => {
  const [verb, uri, httpVersion] = line.split(' ');
  return { verb, ...parseUri(uri), httpVersion };
};

const parseHeader = (line) => {
  const indexOfSeperator = line.indexOf(':');
  const key = line.slice(0, indexOfSeperator).trim().toLowerCase();
  const value = line.slice(indexOfSeperator + 1).trim();
  return [key, value];
};

const parseHeaders = (lines) => {
  let index = 0;
  const headers = {};
  while (index < lines.length && lines[index].length > 0) {
    const [key, value] = parseHeader(lines[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = {
  parseRequest
};
