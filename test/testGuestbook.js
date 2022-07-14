const request = require('supertest');
const { app } = require('../src/app');
const fs = require('fs');

describe('GET /guestbook', () => {
  it('Should respond with status code 200', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }
    const sessions = {
      name1: {
        sessionId: 'name1',
        time: new Date(),
        maxAge: 30
      }
    };

    request(app(config, sessions, () => { }, fs))
      .get('/guestbook')
      .set('Cookie', 'id=name1')

      .expect('content-type', 'text/html')
      .expect(200, done)
  });
});

describe('POST /guestbook', () => {
  it('Should respond with status code 200', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }
    const sessions = {
      name1: {
        sessionId: 'name1',
        time: new Date(),
        maxAge: 30
      }
    };

    request(app(config, sessions, () => { }, fs))
      .post('/guestbook')
      .set('Cookie', 'id=name1')
      .send('name=name1&comment=hello')

      .expect('content-length', '0')
      .expect('location', '/guestbook')
      .expect(302, done)
  });
});
