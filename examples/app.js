const debuggerr = require('debuggerr');

debuggerr.init({
  api_key: ''
})

const app = require('express')()

app.use(require('./todo'))

app.listen(3000, () => console.log('server started'));