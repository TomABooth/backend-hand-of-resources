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
});
