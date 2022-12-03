const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('vcameras routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.only('should GET list of vcameras', async () => {
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
});
