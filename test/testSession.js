const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app');

describe('GET /login', () => {
  it('Should create a session for user and redirect to guestbook', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(createApp(config, {}, () => { }, fs))
      .post('/login')
      .send('username=name1')

      .expect('content-length', '32')
      .expect('set-cookie', /id=/)
      .expect('location', '/guestbook')
      .expect(302, done)
  });
});

describe('GET /logout', () => {
  it('Should create a session for user and redirect to guestbook', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(createApp(config, {}, () => { }, fs))
      .get('/logout')
      .set('Cookie', /id=name1/)
      .expect('content-length', '33')
      .expect('location', '/index.html')
      .expect(302, done)
  });
});
