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
    expect(res.body).toMatchInlineSnapshot();
  });
});
