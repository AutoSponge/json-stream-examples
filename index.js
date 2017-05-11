const http = require('http')
const app = require('express')()
const compression = require('compression')
const ecstatic = require('ecstatic')
const namespace = require('./src/utils/namespace')
const MIDDLEWARE = namespace(__dirname, 'src', 'middleware')
const UTILS = namespace(__dirname, 'src', 'utils')
const ROUTES = namespace(__dirname, 'src', 'routes')
const SERVICES = namespace(__dirname, 'src', 'services')

app.get('/api/ldjson', MIDDLEWARE.sendStream, ROUTES.ldjson({
  process: UTILS.pipe(
    UTILS.take(SERVICES.names.hello),
    UTILS.map(UTILS.ldjson.stringify(SERVICES.names.schema.out)),
    UTILS.ldjson.stream
  )
}))

app.use(ecstatic({root: `${__dirname}/public`}))
app.use(compression())
app.use(MIDDLEWARE.handleErrors)
app.listen(4000)