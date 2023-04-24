const express = require('express');
const app = express();

const IS_TEST_ENV = process.env.NODE_ENV === 'test';
const memQueue = new Map();

app.use(express.json())

app.post('/register', (req, res) => {
  const { api_key } = req.body;
  memQueue.set(api_key, []);
  res.json({
    msg: 'client registered successfully'
  });
})

app.post('/state', (req, res) => {
  const { api_key } = req.body;
  res.json({
    queue: memQueue.get(api_key)
  })
})

app.post('/set/breakpoint', (req, res) => {
  const { location, api_key } = req['body'];
  memQueue.get(api_key).push(location);
  res.json({
    msg: 'breakpoint set successfully'
  })
})

app.post('/clear/breakpoint', (req, res) => {
  const { location, api_key } = req['body'];
  let queue = memQueue.get(api_key);
  queue = queue.filter(loc => JSON.stringify(loc) !== JSON.stringify(location));
  memQueue.set(api_key, queue);
  res.json({
    msg: 'breakpoint cleared successfully'
  })
})

if (!IS_TEST_ENV)
app.listen(8000, () => console.log('server started'));

module.exports = app;