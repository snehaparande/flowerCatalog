const request = require('supertest');
const { createApp } = require('../src/app');
const fs = require('fs');

describe('GET /guestbook', () => {
  it('Should respond with status code 200', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }
    const time = new Date();
    const sessionId = time.valueOf();
    const sessions = {};
    sessions[sessionId] = {
      sessionId,
      time,
      maxAge: 30,
      username: 'name1'
    }

    request(createApp(config, sessions, () => { }, fs))
      .get('/guestbook')
      .set('Cookie', `id=${sessionId}`)

      .expect('content-type', /text\/html/)
      .expect(200, done)
  });
});

describe('POST /guestbook', () => {
  it('Should respond with status code 200', (done) => {
    const config = {
      root: './public',
      guestBookPath: './data/comments.json',
    }
    const time = new Date();
    const sessionId = time.valueOf();
    const sessions = {};
    sessions[sessionId] = {
      sessionId,
      time,
      maxAge: 30,
      username: 'name1'
    }

    request(createApp(config, sessions, () => { }, fs))
      .post('/guestbook')
      .set('Cookie', `id=${sessionId}`)
      .send('comment=hello')

      .expect('location', '/guestbook')
      .expect(302, done)
  });
});
