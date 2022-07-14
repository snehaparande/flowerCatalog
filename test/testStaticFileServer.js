const request = require('supertest');
const { app } = require('../src/app.js');
const fs = require('fs');
const assert = require('assert');

describe('GET /', () => {
  it('Should serve the home page for /', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(app(config, {}, () => { }, fs))
      .get('/')
      .expect(/<title>Flower Catalog<\/title>/)
      .expect('content-type', 'text/html')
      .expect('content-length', '853')
      .expect(200, done)
  });
});

describe('GET /home.html', () => {
  it('Should serve the home page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(app(config, {}, () => { }, fs))
      .get('/home.html')
      .expect(/<title>Flower Catalog<\/title>/)
      .expect('content-type', 'text/html')
      .expect('content-length', '853')
      .expect(200, done)
  });
});

describe('GET /abeliophyllum.html', () => {
  it('Should serve the Abeliophyllum page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(app(config, {}, () => { }, fs))
      .get('/abeliophyllum.html')
      .expect(/<title>Abeliophyllum<\/title>/)
      .expect('content-type', 'text/html')
      .expect('content-length', '1565')
      .expect(200, done)
  });
});

describe('GET /ageratum.html', () => {
  it('Should serve the Ageratum page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(app(config, {}, () => { }, fs))
      .get('/ageratum.html')
      .expect(/<title>Ageratum<\/title>/)
      .expect('content-type', 'text/html')
      .expect('content-length', '1216')
      .expect(200, done)
  });
});

describe('GET /login.html', () => {
  it('Should serve the login page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(app(config, {}, () => { }, fs))
      .get('/login.html')
      .expect(/<title>Login<\/title>/)
      .expect('content-type', 'text/html')
      .expect('content-length', '273')
      .expect(200, done)
  });
});
