const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('games routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should GET list of games', async () => {
    const res = await request(app).get('/games');
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "name": "Ocarina of Time",
          "console": "Nintendo 64",
          "genre": "RPG",
        },
        Object {
            "id": "2",
            "name": "Breath of the Wild",
            "console": "Switch",
            "genre": "Open-World",
        },
        Object {
            "id": "3",
            "name": "God of War 4",
            "console": "PS4",
            "genre": "Action",
        },
        Object {
            "id": "4",
            "name": "God of War: Ragnarok",
            "console": "PS5",
            "genre": "Action",
        },
      ]
    `);
  });