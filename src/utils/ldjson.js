const stringify = require('fast-json-stringify')

module.exports = {
  *stream (g) {
    for (const value of g) {
      yield `${value}\n`
    }
  },
  stringify
}
