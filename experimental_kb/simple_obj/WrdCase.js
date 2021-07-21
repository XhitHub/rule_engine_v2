const mu = require('../../myUtil');
const Controller = require('./Controller')

class WrdCase {
  constructor(wrd, facts) {
    this.wrd = wrd;
    this.facts = facts
    this.rules = []
    this.controller = new Controller();
  }

  // should not double instantiate. can by duplicate clearing
  // should not have double firing. sol: add fired = true flag to fired rules?
  forwardOneStep() {
    // instantiate gRules for the curr avail facts, add instances to rules
    this.wrd.gRules.forEach(gRule => {
      let grInstances = this.controller.forwardSub(gRule, this.facts);
      this.rules = mu.concatNoRepeatByStringify(this.rules, grInstances)
    })
    // inference with this.rules
    this.rules.forEach(rule => {
      let newFacts = this.controller.forward(rule, this.facts)
      this.facts = mu.concatNoRepeat(this.facts, newFacts)
    })
  }
}

module.exports = WrdCase