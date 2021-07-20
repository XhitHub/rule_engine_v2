// var mu = require.main.require('./myUtil');
var mu = require('../../myUtil');

class Controller{
  constructor() {
    this.argRegex = new RegExp('\$.+', 'g');
  }

  isArg(val) {
    // check if val is of format '$xxx'
    // return this.argRegex.test(val)
    return /\$.+/.test(val)
  }

  getArgName(searchFormArgName) {
    return searchFormArgName.replace('$','');
  }

  // a gFact can only match a currFact and cannot match across N currFacts
  // there may be N diff valid matchings, each match with diff currFact. especially in earlier steps of the subbings
  // return N subRes which are the N diff valid matchings subbing results
  tryMatchFacts(gFact, availFacts, subRes) {
    console.log("Controller -> tryMatchFacts -> subRes", subRes)
    let subResList = []
    availFacts.forEach(fact => {
      // TODO: impl the below
      // clone argSubMap for the new subRes entry
      // try to match the fact by gFact with the partly filled argSubMap
      // if match success, add the new subRes to subResList
      let canMatch = true;
      let argSubMap2 = mu.deepClone(subRes.argSubMap)
      Object.keys(gFact).forEach(k => {
        console.log("Controller -> tryMatchFacts -> argSubMap2", argSubMap2)
        console.log("Controller -> tryMatchFacts -> k", k)
        console.log("Controller -> tryMatchFacts -> fact[k]", fact[k])
        console.log("Controller -> tryMatchFacts -> gFact[k]", gFact[k])
        if (gFact[k] != fact[k]) {
          console.log("Controller -> tryMatchFacts -> this.isArg(gFact[k])", this.isArg(gFact[k]))
          if (!this.isArg(gFact[k])) {
            // the field is not arg but not match
            canMatch = false;
          } else {
            let argName = this.getArgName(gFact[k]);
            if (argSubMap2[argName] != undefined) {
              if (argSubMap2[argName] != fact[k]) {
                // hv argSubMap entry and it doesnt match
                canMatch = false;
              } else {
                // won't ban this canMatch
              }
            } else {
                // dont have argSubMap entry. add entry now
                argSubMap2[argName] = fact[k]
                // check argConstraints. if cannot pass constraints, it is an invalid subbing, thus is cannot match
                let passArgConstraintsCheck = subRes.gRule.argConstraints(argSubMap2)
                console.log("Controller -> tryMatchFacts -> passArgConstraintsCheck", passArgConstraintsCheck)
                if (!passArgConstraintsCheck) {
                  canMatch = false;
                }
            }
          }
        } else {
          // won't ban this canMatch
        }
      })
      if (canMatch) {
        // add the new subRes to subResList
        let subRes2 = {
          argSubMap: argSubMap2,
          gRule: subRes.gRule,
          remainingGFacts: mu.deepClone(subRes.remainingGFacts),
        }
        subResList.push(subRes2);
      }
    })
    return subResList
  }
  
  instantiateGRule(gRule, argMap) {
    return gRule.generator(argMap)
  }

  // fact is true if all of it match partial of at least 1 of availFacts
  // but how about NOT statements? can add 1 more check: check if all of the fact match partial of at least 1 of the NOT ge availFacts 
  isFactTrue(fact, availFacts) {
    let match = false;
    availFacts.forEach(aFact => {
      let matchAll = true;
      Object.keys(fact).forEach(k => {
        if (fact[k] != aFact[k]) {
          // this k is not found in the aFact
          matchAll = false;
        }
      })
      if (matchAll = true) {
        // fact is true if all of it match partial of at least 1 of availFacts
        match = true
      }
    })
    return match
  }

  // return new facts. more consistent with gRule instantiation
  forward(rule, availFacts) {
    let canFire = true;
    rule.lhs.forEach(fact => {
      if (!this.isFactTrue(fact, availFacts)) {
        // at least 1 fact in xhs is false, cannot fire
        canFire = false;
      }
    })
    if (canFire) {
      // potentially have redundant facts in availFacts. can have [clear redundant fact] regularly to resolve the issue?
      return rule.rhs;
    } else {
      return []
    }
    // return canFire
  }

  // return availFacts with redundant facts removed
  clearRedundantFact(availFacts) {
    let afsSet = new Set(availFacts)
    let availFacts2 = Array.from(afsSet)
    return availFacts2
  }

  // return all subbed instances?
  forwardSub(gRule, availFacts) {
    let finishedSubResList = []
    let initialSubRes = {
      argSubMap: {},
      gRule: gRule,
      remainingGFacts: mu.deepClone(gRule.searchForm.lhs),
    }
    // beware of potential async
    this.forwardSubRecursive(initialSubRes, availFacts, finishedSubResList);
    console.log("Controller -> forwardSub -> finishedSubResList", finishedSubResList)
    // instantiate GRules using the finishedSubResList
    let gRuleInstances = finishedSubResList.map(subRes => this.instantiateGRule(subRes.gRule, subRes.argSubMap));
    return gRuleInstances;
  }

  forwardSubRecursive(subRes, availFacts, finishedSubResList) {
    console.log("Controller -> forwardSubRecursive -> subRes", subRes)
    // if there is no more remaining gFacts left, the recursion is finished
    if (subRes.remainingGFacts.length == 0) {
      // this is a finished subRes where all gFacts in lhs is subbed successfully. add this to final res list and end recursion
      finishedSubResList.push(subRes);
      return;
    }
    // pop a remaining gFact to process in this recursive step
    let gFact = subRes.remainingGFacts.pop()
    // try to match this gFact with availFacts, with already decided arg subbings. will update argSubMap
    console.log("Controller -> forwardSubRecursive -> availFacts", availFacts)
    let subResList = this.tryMatchFacts(gFact, availFacts, subRes)
    console.log("Controller -> forwardSubRecursive -> subResList", subResList)
    if (subResList.length > 0) {
      // recursively go on process
      subResList.forEach(subRes2 => {
        this.forwardSubRecursive(subRes2, availFacts, finishedSubResList)
      })
    } else {
      // this gRule has gFact (the gFact being processed in curr step) in xhs that cannot match any avail facts, thus should stop any further subbing on this gRule
      return;
    }
  }


  /*
  obtain and store list of poss matchable curr fact for each gFact
  */
}

module.exports = Controller;