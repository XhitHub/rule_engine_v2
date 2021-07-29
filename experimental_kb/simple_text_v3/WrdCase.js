const mu = require('../../myUtil');
const Controller = require('./Controller')

class WrdCase {
  constructor(wrd, facts) {
    this.wrd = wrd;
    this.facts = facts
    this.rules = []
    // separate instantiated rules?
    this.rulesInstantiated = []
    this.forwardInferenceResults = []
    this.controller = new Controller();
    // sort gRules
    this.wrd.gRules = this.controller.sortGRules(this.wrd.gRules)
  }

  // should not double instantiate. can by duplicate clearing
  // should not have double firing. sol: add fired = true flag to fired rules?
  forward() {
    let fRes = this.controller.getForwardInferenceRes(mu.deepClone(this.facts))
    // instantiate gRules for the curr avail facts, add instances to rules
    this.wrd.gRules.forEach(gRule => {
      let grInstances = this.controller.forwardSubLogged(gRule, this.facts, fRes);
      this.rulesInstantiated = mu.concatNoRepeatByStringify(this.rulesInstantiated, grInstances)
    })
    // inference with this.rules
    this.rulesInstantiated.forEach(rule => {
      // the rules are already been checked to be passing lhsNot in forwardSub
      // let newFacts = this.controller.forward(rule, this.facts)
      // this.facts = mu.concatNoRepeat(this.facts, rule.rhs)
      this.addFacts(rule.rhs)
    })

    fRes.factsAfterInference = mu.deepClone(this.facts)
    this.forwardInferenceResults.push(fRes)
  }

  forwardUntilNoChanges(maxIterations) {
    let keepGoing = true
    let count = 0
    while(keepGoing) {
      let factsCount1 = this.facts.length
      this.forward()
      let factsCount2 = this.facts.length
      keepGoing = !(factsCount1 == factsCount2)
      count += 1
    }
  }

  addFacts(facts) {
    this.facts = mu.concatNoRepeat(this.facts, facts)
  }
}

module.exports = WrdCase