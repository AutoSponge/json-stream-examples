const callsite = require('callsite-record')

process.on('unhandledRejection', err => {
  console.log(
    callsite({ forError: err }).renderSync({
      stackfilter (frame) {
        return !frame.getFileName().includes('node_modules')
      }
    })
  )
})

module.exports = (err, req, res, next) => {
  console.log(err)
}
