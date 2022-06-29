const fs = require('fs');

const getMimeType = (fileName) => {
  const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'txt': 'text/plain',
    'png': 'image/png',
    'gif': 'image/gif',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'pdf': 'application/pdf',
  }
  const extention = fileName.slice(fileName.lastIndexOf('.') + 1);
  return mimeTypes[extention];
};

const createServeFile = (root) => {
  return (request, response) => {
    let pathname = request.uri.pathname;
    console.log(pathname);
    if (pathname === '/') {
      pathname += 'home.html'
    }

    const fileName = root + pathname;
    if (!fs.existsSync(fileName)) {
      return false;
    }

    const body = fs.readFileSync(fileName);
    response.setHeader('Content-Type', getMimeType(fileName));
    response.end(body);
    return true;
  };
};

module.exports = { createServeFile };
