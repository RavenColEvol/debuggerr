const inspector = require('inspector');

const { debuggerUtils, getLocationKey } = require('./utils');
const { connect } = require('./requests');
// Initialize Inspector
const session = new inspector.Session();
const { setConsole } = debuggerUtils(session);

const files   = new Map();
const scripts = new Map();

session.connect();

//* REGISTERING FILES URL => SCRIPT_ID
session.on('Debugger.scriptParsed', (data) => {
  files.set(data['params']['url'], data);
})

//* ENABLE DEBUGGER
session.post("Debugger.enable", (err) => {
  if (err) return console.error('Unable to start debugger', err);
});

session.on('Debugger.paused', (event) => {
  const callframe = event.params.callFrames[0];
  const { callFrameId, location } = callframe;

  session.post('Debugger.evaluateOnCallFrame', {
    expression: scripts.get(getLocationKey(location)),
    callFrameId: callFrameId
  });

  session.post('Debugger.resume');
});

const debuggerr = {
  init({ api_key }) {
    connect({ api_key, session })
  }
}

module.exports = debuggerr