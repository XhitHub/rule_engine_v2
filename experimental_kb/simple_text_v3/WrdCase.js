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
    // group gRules by priority
    this.gRulePriorityGroups = this.controller.groupGRulesByPriority(this.wrd.gRules)
  }

  forward() {
    this.forwardWithWorkingGRules(this.wrd.gRules)
  }

  // should not double instantiate. can by duplicate clearing
  // should not have double firing. sol: add fired = true flag to fired rules?
  forwardWithWorkingGRules(workingGRules) {
    let fRes = this.controller.getForwardInferenceRes(mu.deepClone(this.facts))
    // instantiate gRules for the curr avail facts, add instances to rules
    workingGRules.forEach(gRule => {
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

  forwardUntilNoChangesWithWorkingGRules(maxIterations, workingGRules) {
    let keepGoing = true
    let count = 0
    while(keepGoing && (maxIterations == undefined || count <= maxIterations)) {
      let factsCount1 = this.facts.length
      this.forwardWithWorkingGRules(workingGRules)
      let factsCount2 = this.facts.length
      keepGoing = !(factsCount1 == factsCount2)
      count += 1
    }
    /*
    problems
      some rules like continuing rules should not be forward until no changes even if grouped
      sols
        add stopping conditions for such continuing rules as facts?
    */
  }

  forwardUntilNoChangesPriorityGroups(maxIterations) {
    // within each priority group: forward until no changes
    this.gRulePriorityGroups.priorities.forEach(priority => {
      this.forwardUntilNoChangesWithWorkingGRules(maxIterations, this.gRulePriorityGroups.groups[priority])
    })
  }

  addFacts(facts) {
    this.facts = mu.concatNoRepeat(this.facts, facts)
  }

  // a func for workarounds?
  removeFacts(factsToRemove) {
    this.facts = this.facts.filter(item => {
      if (factsToRemove.indexOf(item) != -1) {
        // item is included in factsToRemove
        return false
      } else {
        return true
      }
    })
  }
}

module.exports = WrdCase