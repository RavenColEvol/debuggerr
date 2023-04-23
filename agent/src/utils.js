function getLocationKey(location) {
  return Object.values(location).join(':');
}

function debuggerUtils(session) {
  function setConsole(filename, lineNumber, script = '') {
    const scriptID = files.get(filename)['params']['scriptId'];
    const params = {
      location: {
        scriptId: scriptID,
        lineNumber: lineNumber - 1
      }
    }
    session.post(
      "Debugger.setBreakpoint",
      params,
      (err, res) => {
        if (err) return console.error('Error while setting breakpoint', JSON.stringify(err));
        scripts.set(getLocationKey(res['actualLocation']), script);
      }
    );
  }

  return {
    setConsole
  }
}


module.exports = {
  debuggerUtils,
  getLocationKey
}