const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('games routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should GET list of bikes', async () => {
    const res = await request(app).get('/bikes');
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "brand": "Giant",
          "model": "Revolt",
          "style": "gravel",
        },
        Object {
            "id": "2",
            "brand": "All City",
          "model": "Space Horse",
          "style": "touring",
        },
        Object {
            "id": "3",
            "brand": "Cannondale",
            "model": "Super Six Evo",
            "style": "racing",
        },
        Object {
            "id": "4",
            "brand": "Salsa",
            "model": "Beargrease",
            "style": "tat",
        },
      ]
    `);
  });