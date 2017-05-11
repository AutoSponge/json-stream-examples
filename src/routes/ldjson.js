module.exports = ({ process }) => (req, res, next) => {
  const { limit } = req.query
  res.set('Content-Type', 'application/x-ndjson')
  res.sendStream(process(limit)).then(finished => res.end()).catch(next)
}
