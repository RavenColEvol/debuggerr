const express = require('express');
const app = express();

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

app.post('/set/breakpoint', (res, req) => {
  const location = res['body'];
  res.send('success')
})

app.listen(8000, () => console.log('server started'));