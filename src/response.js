const EOF = '\r\n';

class Response {
  #socket
  #status
  #headers
  constructor(socket) {
    this.#socket = socket;
    this.#status = 200;
    this.#headers = {};
  }

  set statusCode(responseStatus) {
    this.#status = responseStatus;
  }

  addHeader(fieldName, fieldValue) {
    this.#headers[fieldName] = fieldValue;
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(([fieldName, fieldValue]) => {
      this.#socket.write(`${fieldName}: ${fieldValue}${EOF}`);
    });
  }

  #writeStatusLine() {
    this.#socket.write(`HTTP/1.1 ${this.#status} OK${EOF}`);
  }

  send(body) {
    this.addHeader('connection', 'close')
    this.addHeader('Content-Length', body.length);
    this.#writeStatusLine();
    this.#writeHeaders();
    this.#socket.write(EOF);
    this.#socket.write(body);
    this.#socket.end();
  }
}

module.exports = { Response };
