const factoryMap = require('./factoryMap')

class Case {
  constructor(persistedCaseData) {
    if (persistedCaseData) {
      this.init(persistedCaseData.instances)
    }
  }

  init(initialInstancesJSON) {
    this.instances = {}
    for (const [key, value] of Object.entries(initialInstancesJSON)) {
      console.log("Case -> init -> key", key)
      // key: classname, value: instances data
      // create the instance by the corresponding factory
      // TODO: develop factoryMap
      var createFunc = factoryMap[key]
      console.log("Case -> init -> createFunc", createFunc)
      this.instances[key] = []
      value.forEach(item => {
        let instance = createFunc(item)
        this.instances[key].push(instance)
      })
    }
  }

  serialize() {
    var persistData = {
      instances: {}
    }
    for (const [type, instances] of Object.entries(this.instances)) {
      persistData.instances[type] = []
      instances.forEach(item => {
        persistData.instances[type].push(item.data)
        // or push item.persist()? but will need to implement persist() for every class
      })
    }
    return persistData
  }

  update() {
    // TODO: handle exec priority, conflicts
    for (const [type, instances] of Object.entries(this.instances)) {
      instances.forEach(item => {
        item.update()
      })
    }
  }
}

module.exports = Case