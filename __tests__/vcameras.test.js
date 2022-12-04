const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('vcameras routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should GET list of vcameras', async () => {
    const res = await request(app).get('/vcameras');
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "brand": "Sony",
          "id": "1",
          "model": "FX3",
          "resolution": "4K",
        },
        Object {
          "brand": "Sony",
          "id": "2",
          "model": "FX6",
          "resolution": "6K",
        },
        Object {
          "brand": "RED",
          "id": "3",
          "model": "KOMODO",
          "resolution": "6K",
        },
        Object {
          "brand": "Canon",
          "id": "4",
          "model": "R5C",
          "resolution": "8K",
        },
      ]
    `);
  });
  it('should GET vcameras/1', async () => {
    const res = await request(app).get('/vcameras/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      brand: 'Sony',
      id: '1',
      resolution: '4K',
      model: 'FX3',
    });
  });
  afterAll(() => {
    pool.end();
  });
  it('it should /POST a new vcamera to the list', async () => {
    const newVcamera = {
      brand: 'Canon',
      resolution: '8K',
      model: 'C70',
    };
    const res = await request(app).post('/vcameras').send(newVcamera);
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "brand": "Canon",
        "id": "5",
        "model": "C70",
        "resolution": "8K",
      }
    `);
  });
});
