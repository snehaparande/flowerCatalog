const request = require('supertest');
const { createApp } = require('../src/app');
const fs = require('fs');

describe('GET /guestbook', () => {
  const config = {
    root: './public',
    guestBookPath: './test/dummy.json',
    guestBookTemplate: './src/templates/guestbook.html'
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

  it('Should show the guestbook page and respond with status code 200',
    (done) => {

      request(createApp(config, sessions, () => { }, fs.readFileSync, fs.writeFileSync))
        .get('/guestbook')
        .set('Cookie', `id=${sessionId}`)

        .expect('content-type', /text\/html/)
        .expect(200, done)
    });

  it('Should redirect to the login.html page if no cookie is present',
    (done) => {

      request(createApp(config, {}, () => { }, fs.readFileSync, fs.writeFileSync))
        .get('/guestbook')

        .expect('location', '/login.html')
        .expect(302, done)
    });
});

describe('POST /guestbook', () => {
  const config = {
    root: './public',
    guestBookPath: './test/dummy.json',
    guestBookTemplate: './src/templates/guestbook.html'
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

  it('Should add the comment and redirect to /guestbook', (done) => {
    request(createApp(config, sessions, () => { }, fs.readFileSync, fs.writeFileSync))
      .post('/guestbook')
      .set('Cookie', `id=${sessionId}`)
      .send('comment=hello')

      .expect('location', '/guestbook')
      .expect(302, done)
  });

  it('Should redirect to /guestbook for invalid comment', (done) => {
    request(createApp(config, sessions, () => { }, fs.readFileSync, fs.writeFileSync))
      .post('/guestbook')
      .set('Cookie', `id=${sessionId}`)
      .send('comment=')

      .expect('location', '/guestbook')
      .expect(302, done)
  });
});
