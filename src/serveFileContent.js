const fs = require('fs');

const getContentType = (fileName) => {
  const contentTypes = {
    'html': 'text/html',
    'txt': 'text/plain',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
  }
  const extention = fileName.slice(fileName.lastIndexOf('.') + 1);
  return contentTypes[extention];
};

const serveFileContent = ({ uri }, response, serverPath) => {
  if (uri === '/') {
    uri += 'home.html'
  }
  const fileName = serverPath + uri;
  if (!fs.existsSync(fileName)) {
    return false;
  }
  response.addHeader('Content-Type', getContentType(fileName));
  fs.readFile(fileName, (err, body) => {
    response.send(body);
  });
  return true;
};

module.exports = { serveFileContent };
