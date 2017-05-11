const faker = require('faker')

module.exports = {
  *hello () {
    while (true) {
      const hello = faker.name.findName()
      yield { hello }
    }
  },
  schema: {
    out: {
      type: 'object',
      properties: {
        hello: {
          type: 'string'
        }
      }
    }
  }
}
