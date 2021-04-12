// define classes, classes actions / behaviours as rules, ...
// test class C: it always pass it's a to nearby Bs
class Kl {
  constructor(p, wpn) {
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