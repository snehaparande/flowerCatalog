const request = require('supertest');
const { app } = require('../src/app');

describe('GET /missing', () => {
  it('Should respond with status code 404', (done) => {
    const config = {
      root: './public',
      logger: () => { }
    }
    request(app(config, {}))
      .get('/missing')
      .expect('content-length', '14')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });
});
