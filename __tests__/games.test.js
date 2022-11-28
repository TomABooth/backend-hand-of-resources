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
          "console": "Nintendo 64",
          "genre": "RPG",
          "id": "1",
          "name": "Ocarina of Time",
        },
        Object {
          "console": "Switch",
          "genre": "Open-World",
          "id": "2",
          "name": "Breath of the Wild",
        },
        Object {
          "console": "PS4",
          "genre": "Action",
          "id": "3",
          "name": "God of War 4",
        },
        Object {
          "console": "PS5",
          "genre": "Action",
          "id": "4",
          "name": "God of War: Ragnarok",
        },
      ]
    `);
  });
  it('should GET games/1', async () => {
    const res = await request(app).get('/games/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      console: 'Nintendo 64',
      genre: 'RPG',
      id: '1',
      name: 'Ocarina of Time',
    });
  });
  afterAll(() => {
    pool.end();
  });
});
