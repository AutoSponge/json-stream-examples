module.exports = fn =>
  function*(iterable) {
    for (const value of iterable) {
      yield fn(value)
    }
  }
