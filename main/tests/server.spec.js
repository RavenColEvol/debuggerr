const app = require('../server');
const request = require('supertest');

describe('Debuggerr server', () => {
  const api_key = 'test_api_key';
  const location = {
    fileName: 'test.js',
    line: 3,
    column: 4
  };

  it('should register a client with api_key', async () => {
    const res = await request(app).post('/register').send({
      api_key
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      msg: 'client registered successfully'
    })
  })

  it('should provide empty state when no breakpoints are registered', async () => {
    const res = await request(app).post('/state').send({
      api_key
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.queue).toEqual([]);
  })

  it('should able to set a breakpoint', async () => {
    let res = await request(app).post('/set/breakpoint').send({
      api_key,
      location
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual('breakpoint set successfully');


    res = await request(app).post('/state').send({
      api_key
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.queue).toEqual([location]);
  })

  it('should get a clear a breakpoint', async () => {
    let res = await request(app).post('/clear/breakpoint').send({
      api_key,
      location
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual('breakpoint cleared successfully');

    res = await request(app).post('/state').send({
      api_key
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.queue).toEqual([]);
  })
})