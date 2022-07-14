const request = require('supertest');
const { app } = require('../src/app');
const fs = require('fs');

describe('GET /unknown', () => {
  it('Should respond with status code 404 for unknown request url', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }
    request(app(config, {}, () => { }, fs))
      .get('/unknown')
      .expect('content-length', '14')
      .expect(404, done)
  });
});
