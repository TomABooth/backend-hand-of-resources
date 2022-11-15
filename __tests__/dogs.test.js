const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dogs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should GET list of dogs', async () => {
    const res = await request(app).get('/dogs');
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 4,
          "breed": "Mutt",
          "id": "1",
          "name": "Marvin",
        },
        Object {
          "age": 14,
          "breed": "Lab",
          "id": "2",
          "name": "Max",
        },
        Object {
          "age": 16,
          "breed": "Schnauzer",
          "id": "3",
          "name": "Ruby",
        },
        Object {
          "age": 7,
          "breed": "Kelpie",
          "id": "4",
          "name": "Bently",
        },
      ]
    `);
  });
  it('should GET dogs/1', async () => {
    const res = await request(app).get('/dogs/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      age: 4,
      breed: 'Mutt',
      id: '1',
      name: 'Marvin',
    });
  });
  afterAll(() => {
    pool.end();
  });
  it('should /POST a new dog to the list', async () => {
    const newDog = {
      name: 'Spike',
      age: 5,
      breed: 'Mutt',
    };
    const res = await request(app).post('/dogs').send(newDog);
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "age": 5,
        "breed": "Mutt",
        "id": "5",
        "name": "Spike",
      }
    `);
  });
  it('should PUT new data into dog with id #1', async () => {
    const res = await request(app).put('/dogs/1').send({ name: 'Murphy' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Murphy');
  });
});
