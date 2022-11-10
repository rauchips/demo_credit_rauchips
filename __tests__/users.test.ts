import request from 'supertest';
import app from '../src/app';

const api = request(app);

describe('Test [POST] signup users /api/user/signup', () => {
  const reqBody = {
      name: "John Doe",
      email: "doe@gmail.com",
      password: "password"
  };

  test('returns status 201 Created', async () => {
    const response = await api
      .post('/api/user/signup')
      .send(reqBody)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');
  })

  test('returns status 400 Bad Request', async () => {
    const response = await api
      .post('/api/user/signup')
      .send(reqBody)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');
  })
})

describe('Test [POST] signin users /api/user/signin', () => {
  const reqBody = {
    email: "doe@gmail.com",
    password: "password"
  };

  test('returns status 200 Succes', async () => {
    const response = await api
      .post('/api/user/signin')
      .send(reqBody)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  })

  test('returns status 400 Bad Request', async () => {
      const response = await api
          .post('/api/user/signin')
          .send(reqBody)
          .expect(400)
          .expect('Content-Type', 'application/json; charset=utf-8');
      })
})

describe('Test [GET] list of all users /api/user/', () => {
  test('returns status 200 Success', async () => {
    const response = await api
      .get('/api/user/')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });
})
