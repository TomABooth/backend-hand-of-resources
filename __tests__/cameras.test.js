const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cameras routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should GET list of cameras', async () => {
    const res = await request(app).get('/cameras');
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "brand": "Sony",
          "id": "1",
          "megapixels": 50,
          "model": "A1",
        },
        Object {
          "brand": "Sony",
          "id": "2",
          "megapixels": 61,
          "model": "A7RIV",
        },
        Object {
          "brand": "Canon",
          "id": "3",
          "megapixels": 45,
          "model": "R5",
        },
        Object {
          "brand": "Canon",
          "id": "4",
          "megapixels": 24,
          "model": "R3",
        },
      ]
    `);
  });
  it('should GET cameras/1', async () => {
    const res = await request(app).get('/cameras/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      brand: 'Sony',
      id: '1',
      megapixels: 50,
      model: 'A1',
    });
  });
  afterAll(() => {
    pool.end();
  });
});
