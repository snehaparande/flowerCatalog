const request = require('supertest');
const { createApp } = require('../src/app');
const fs = require('fs');

describe('GET /unknown', () => {
  it('Should respond with status code 404 for unknown request url', (done) => {
    const config = {
      root: './public',
      guestBookPath: './test/dummy.json',
      guestBookTemplate: './src/templates/guestbook.html'
    }
    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .get('/unknown')
      .expect('content-length', '146')
      .expect(404, done)
  });
});
