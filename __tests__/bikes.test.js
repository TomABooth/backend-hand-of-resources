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
  it('should GET bikes/1', async () => {
    const res = await request(app).get('/bikes/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      brand: 'Giant',
      id: '1',
      model: 'Revolt',
      style: 'gravel',
    });
  });
  afterAll(() => {
    pool.end();
  });
  it('it should /POST a new game to the list', async () => {
    const newGame = {
      brand: 'Surly',
      model: 'Straggler',
      style: 'gravel',
    };
    const res = await request(app).post('/games').send(newBike);
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "brand": "Surly",
        "id": "5",
        "model": "Straggler",
        "style": "gravel",
      }
    `);
  });
});
