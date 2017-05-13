const a = require('awaiting')

module.exports = (req, res, next) => {
  res.sendStream = async iterable => {
    let ready
    let connected = true
    while (connected) {
      let { value, done } = await iterable.next()
      if (done === true) {
        return true
      }
      ready = res.write(value)
      if (ready === false) {
        await Promise.race([
          a.event(res, 'drain'),
          a.event(req.connection, 'close').then(() => (connected = false))
        ])
        req.connection.removeAllListeners('close')
      }
    }
  }
  next()
}
