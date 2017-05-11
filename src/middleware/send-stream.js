const a = require('awaiting')

module.exports = (req, res, next) => {
  res.sendStream = async iterable => {
    let ready
    let connected = true
    while (connected) {
      await a.delay(Math.random() * 100 | 0) // simulated delay
      req.connection.removeAllListeners('close')
      let { value, done } = iterable.next()
      if (done === true) {
        return true
      }
      ready = res.write(value)
      if (ready === false) {
        await Promise.race([
          a.event(res, 'drain'),
          a.event(req.connection, 'close').then(() => (connected = false))
        ])
      }
    }
  }
  next()
}
