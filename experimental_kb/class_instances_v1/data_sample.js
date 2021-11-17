// case data to be persisted into table/JSON file for cases/matches
var persistedCaseData = {
  id: 123,
  instances: {
    // 1 list for each class
    Test: [
      // these are the data attr's obj of the Test class
      {
        count: 111,
        rate: 3,
      }
    ],
    Char: [
      // ...
    ],
  }
}

// active in processing data
var activeCase = {
  instances: {
    // 1 list for each class
    Test: [
      instance1,
      instance2,
    ],
  }

  // init() {

  // }

  // update() {
  //   // foreach instances, call update()
  // }

  // serialize() {

  // }
}