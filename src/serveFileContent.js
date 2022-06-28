const fs = require('fs');

const getContentType = (fileName) => {
  const contentTypes = {
    'html': 'text/html',
    'txt': 'text/plain',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'pdf': 'application/pdf',
  }
  const extention = fileName.slice(fileName.lastIndexOf('.') + 1);
  return contentTypes[extention];
};

const createServeFile = (root) => {
  return ({ uri }, response) => {
    if (uri === '/') {
      uri += 'home.html'
    }

    const fileName = root + uri;
    if (!fs.existsSync(fileName)) {
      return false;
    }

    const body = fs.readFileSync(fileName);
    response.addHeader('Content-Type', getContentType(fileName));
    response.send(body);
    return true;
  };
};

module.exports = { createServeFile };
