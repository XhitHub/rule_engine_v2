// define classes, classes actions / behaviours as rules, ...
// test class C: it always pass it's a to nearby Bs
class Connection {
  constructor(name) {
  }
}

class Place {
  constructor(name) {
    this.name = name
    this.connections = []
  }
  addConnection(connection) {
    this.connections.push(connection)
  }
}

class Chara {
  constructor(initialPosition) {
    this.health = {
      injs: {

      }
    },
    this.position = initialPosition
    this.wpn = Fist()
    this.inventory = []
  }
  getAvailableActions() {
    availableActions = []
    // actions in curr place
    
  }
  move(newPosition) {
    this.position = newPosition
  }
}

class Kl {
  constructor(p, wpn) {
    // compulsory attrs
    this.loading = 0 //can run inference if loading has becomes 0, to implement diff operations having diff time spent?
    // class specific attrs
    this.position = p
    this.targetVt = null
    this.wpn = Fist()
  }
  // compulsory funcs
  inference() {
    if (!this.targetVt) {
      this.findTarget()
    }
    if (this.targetVt) {
      this.atk()
    }
  }
  // class specific funcs
  atk() {
    this.wpn.atk(this.targetVt)
  }
  findTarget() {

  }
}

class Position {
  constructor() {
    charas = []
  }
}

// define facts / place instances
var kl1 = new Kl()
var facts = {
  kl1: kl1
}
var allInferencable = [kl1]

// operate
const inference = function() {
  allInferencable.forEach(inf => {
    inf.inference()
  })
}