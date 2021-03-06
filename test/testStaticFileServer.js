const request = require('supertest');
const { createApp } = require('../src/app.js');
const fs = require('fs');
const assert = require('assert');

describe('GET /', () => {
  it('Should serve the index page for /', (done) => {
    const config = {
      root: './public',
      guestBookPath: './test/dummy.json',
      guestBookTemplate: './src/templates/guestbook.html'
    }

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .get('/')
      .expect(/<title>Flower Catalog<\/title>/)
      .expect('content-type', /text\/html/)
      .expect('content-length', '854')
      .expect(200, done)
  });
});

describe('GET /index.html', () => {
  it('Should serve the index page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './test/dummy.json',
      guestBookTemplate: './src/templates/guestbook.html'
    }

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .get('/index.html')
      .expect(/<title>Flower Catalog<\/title>/)
      .expect('content-type', /text\/html/)
      .expect('content-length', '854')
      .expect(200, done)
  });
});

describe('GET /abeliophyllum.html', () => {
  it('Should serve the Abeliophyllum page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './test/dummy.json',
      guestBookTemplate: './src/templates/guestbook.html'
    }

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .get('/abeliophyllum.html')
      .expect(/<title>Abeliophyllum<\/title>/)
      .expect('content-type', /text\/html/)
      .expect('content-length', '1566')
      .expect(200, done)
  });
});

describe('GET /ageratum.html', () => {
  it('Should serve the Ageratum page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './test/dummy.json',
      guestBookTemplate: './src/templates/guestbook.html'
    }

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .get('/ageratum.html')
      .expect(/<title>Ageratum<\/title>/)
      .expect('content-type', /text\/html/)
      .expect('content-length', '1217')
      .expect(200, done)
  });
});

describe('GET /login.html', () => {
  it('Should serve the login page', (done) => {
    const config = {
      root: './public',
      guestBookPath: './test/dummy.json',
      guestBookTemplate: './src/templates/guestbook.html'
    }

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .get('/login.html')
      .expect(/<title>Login<\/title>/)
      .expect('content-type', /text\/html/)
      .expect('content-length', '273')
      .expect(200, done)
  });
});
