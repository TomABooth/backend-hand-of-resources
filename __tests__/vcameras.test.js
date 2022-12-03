const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('video cameras routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should GET list of video cameras', async () => {
    const res = await request(app).get('/vcameras');
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot();
  });
});
