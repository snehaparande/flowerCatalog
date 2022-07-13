const request = require('supertest');
const { app } = require('../src/app');

describe('GET /unknown', () => {
  it('Should respond with status code 404 for unknown request url', (done) => {
    const config = {
      root: './public',
      logger: () => { }
    }
    request(app(config, {}))
      .get('/unknown')
      .expect('content-length', '14')
      .expect(404, done)
  });
});
