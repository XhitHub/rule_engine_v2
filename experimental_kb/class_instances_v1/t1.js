const Case = require('./Case')

var showJSON = data => JSON.stringify(data)

var initialInstancesJSON = {
    // 1 list for each class
    TestEntity: [
      // these are the data attr's obj of the Test class
      {
        count: 111,
        rate: 3,
      }
    ],
  }

var c1 = new Case()
c1.init(initialInstancesJSON)

var data = c1.serialize()
console.log(showJSON(data))
c1.update()
var data = c1.serialize()
console.log(showJSON(data))