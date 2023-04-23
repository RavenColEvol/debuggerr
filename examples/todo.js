const router = require('express').Router();

router.get('/', (req, res) => {
  const body = 'working';
  res.send(body)
})

module.exports = router;