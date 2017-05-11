module.exports = generator =>
  function*(n = Infinity) {
    let iterable = generator()
    let stop = Number(n)
    let i = 0
    for (const value of iterable) {
      if (i === stop) {
        break
      }
      yield value
      i++
    }
  }
