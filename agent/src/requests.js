const fetch = require('node-fetch');
const { v4 } = require('uuid');

const SERVER_URL = 'http://localhost:8000'

let poller;

async function pollCommands({ api_key, session }) {
  const res = await fetch(`${SERVER_URL}/state`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      api_key
    })
  });
  const json = await res.json();
}

async function connect({ api_key, session }) {
  const res = await fetch(`${SERVER_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      uuid: v4(),
      api_key
    })
  })
  const json = res.json();

  poller = setInterval(() => pollCommands({ api_key, session}), 5000);
  return json;
}

process.on('beforeExit', () => {
  clearInterval(poller)
})

module.exports = {
  connect
}