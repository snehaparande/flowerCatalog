const fs = require('fs');
const request = require('supertest');
const { app } = require('../src/app');

describe('GET /login', () => {
  it('Should create a session for user and redirect to guestbook', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }

    request(app(config, {}, () => { }, fs))
      .post('/login')
      .send('username=name1')

      .expect('content-length', '0')
      .expect('set-cookie', 'id=name1; Max-Age=30')
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

    request(app(config, {}, () => { }, fs))
      .get('/logout')
      .set('Cookie', 'id=name1; Max-Age=30')
      .expect('content-length', '0')
      .expect('location', '/home.html')
      .expect(302, done)
  });
});
