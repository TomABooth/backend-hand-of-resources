const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('bikes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should GET list of bikes', async () => {
    const res = await request(app).get('/bikes');
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "brand": "Giant",
          "id": "1",
          "model": "Revolt",
          "style": "gravel",
        },
        Object {
          "brand": "All City",
          "id": "2",
          "model": "Space Horse",
          "style": "touring",
        },
        Object {
          "brand": "Cannondale",
          "id": "3",
          "model": "Super Six Evo",
          "style": "racing",
        },
        Object {
          "brand": "Salsa",
          "id": "4",
          "model": "Beargrease",
          "style": "fat",
        },
      ]
    `);
  });
});
