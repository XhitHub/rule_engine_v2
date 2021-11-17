const TestEntity = require('./entity/TestEntity')
const Char = require('./entity/Char')

const factoryMap = {
  TestEntity: data => new TestEntity(data),
  Char: data => new Char(data),
}

module.exports = factoryMap