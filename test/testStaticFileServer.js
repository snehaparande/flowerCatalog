const request = require('supertest');
const { app } = require('../src/app.js');
const assert = require('assert');

describe('GET /', () => {
  it('Should serve the home page for /', (done) => {
    const config = {
      root: './public',
      logger: () => { }
    }
    request(app(config, {}))
      .get('/')
      .expect((res) => {
        assert.ok(res.text.includes('<title>Flower Catalog</title>'));
      })
      .expect('content-type', 'text/html')
      .expect('content-length', '853')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });
});

describe('GET /home.html', () => {
  it('Should serve the home page', (done) => {
    const config = {
      root: './public',
      logger: () => { }
    }
    request(app(config, {}))
      .get('/home.html')
      .expect((res) => {
        assert.ok(res.text.includes('<title>Flower Catalog</title>'));
      })
      .expect('content-type', 'text/html')
      .expect('content-length', '853')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });
});

describe('GET /abeliophyllum.html', () => {
  it('Should serve the Abeliophyllum page', (done) => {
    const config = {
      root: './public',
      logger: () => { }
    }
    request(app(config, {}))
      .get('/abeliophyllum.html')
      .expect((res) => {
        assert.ok(res.text.includes('<title>Abeliophyllum</title>'));
      })
      .expect('content-type', 'text/html')
      .expect('content-length', '1565')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });
});

describe('GET /ageratum.html', () => {
  it('Should serve the Ageratum page', (done) => {
    const config = {
      root: './public',
      logger: () => { }
    }
    request(app(config, {}))
      .get('/ageratum.html')
      .expect((res) => {
        assert.ok(res.text.includes('<title>Ageratum</title>'));
      })
      .expect('content-type', 'text/html')
      .expect('content-length', '1216')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });
});

describe('GET /login.html', () => {
  it('Should serve the login page', (done) => {
    const config = {
      root: './public',
      logger: () => { }
    }
    request(app(config, {}))
      .get('/login.html')
      .expect((res) => {
        assert.ok(res.text.includes('<title>Login</title>'));
      })
      .expect('content-type', 'text/html')
      .expect('content-length', '273')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });
});
