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
  it('it should /POST a new camera to the list', async () => {
    const newCamera = {
      brand: 'Canon',
      megapixels: '24',
      model: 'R6',
    };
    const res = await request(app).post('/cameras').send(newCamera);
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "brand": "Canon",
        "id": "5",
        "megapixels": 24,
        "model": "R6",
      }
    `);
  });
  it('should PUT new data into cameras with id #1', async () => {
    const res = await request(app).put('/cameras/1').send({ model: 'A1II' });
    expect(res.status).toBe(200);
    expect(res.body.model).toBe('A1II');
  });
  it('GET /cameras/abc should return 404', async () => {
    const res = await request(app).get('/cameras/123');
    expect(res.status).toBe(404);
  });
  it('DELETE /cameras/1 should delete #1', async () => {
    const res = await request(app).delete('/cameras/1');
    expect(res.status).toBe(200);
    const getRes = await request(app).get('/cameras/1');
    expect(getRes.status).toBe(404);
  });
});
