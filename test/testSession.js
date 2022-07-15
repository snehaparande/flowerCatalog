const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app');

describe('POST /login', () => {
  const config = {
    root: './public',
    guestBookPath: './test/dummy.json',
  }
  it('Should create a session for user and redirect to guestbook', (done) => {

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .post('/login')
      .send('username=name1')

      .expect('set-cookie', /id=/)
      .expect('location', '/guestbook')
      .expect(302, done)
  });

  it('Should redirect to login page if username is empty', (done) => {

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .post('/login')
      .send('username=')

      .expect('location', '/login.html')
      .expect(302, done)
  });
});

describe('GET /logout', () => {
  it('Should create a session for user and redirect to guestbook', (done) => {
    const config = {
      root: './public',
      guestBookPath: './test/dummy.json',
    }

    request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
      .get('/logout')
      .set('Cookie', /id=/)
      .expect('content-length', '33')
      .expect('location', '/index.html')
      .expect(302, done)
  });
});
