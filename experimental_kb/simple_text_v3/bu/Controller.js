const Diff = require('diff');
// var mu = require.main.require('./myUtil');
var mu = require('../../myUtil');

const argRegex = /\$[\w\d]+/g;
const searchFormReplacement = '.+'

class Controller{
  constructor() {
    // this.argRegex = new RegExp('\$[\w\d]+', 'g');
    // this.argRegex = /\$[\w\d]+/;
    // this.searchFormReplacement = '.+'
  }

  // if all forward sub instantiated rule instances are only instantiated if they are T, in inference(), can directly add instances rhs to availFacts
  // unless argSubMap is placed in instance obj, argSubMap is only accessible here, then lhsNOTs needs to be handled here
  forwardSub(gRule, availFacts) {
    // aFacts: availableFacts
    let finishedSubResList = []
    let initialSubRes = {
      argSubMap: {},
      gRule: gRule,
      remainingGFacts: mu.deepClone(gRule.lhs),
    }
    // beware of potential async
    this._forwardSubRecursive(initialSubRes, availFacts, finishedSubResList);
    console.log("Controller -> forwardSub -> finishedSubResList", finishedSubResList)
    
    let instances = finishedSubResList.map(subRes => {
      return this.subGRule(subRes.gRule, subRes.argSubMap)
    })
    console.log("Controller -> forwardSub -> instances", instances)

    // need all gFacts in lhsNOTs to pass notCheck in order to pass check NOTs
    let instancesPassingCheckNOTs = []
    instances.forEach(rule => {
      let passAllCheckNOTs = true;
      rule.gRule.lhsNot.forEach(ngFact => {
        let passCheckNOT = this._checkNots(ngFact, availFacts, rule.argSubMap, rule.gRule)
        if (!passCheckNOT) {
          passAllCheckNOTs = false
        }
      })
      if (passAllCheckNOTs) {
        instancesPassingCheckNOTs.push(rule)
      }
    })

    console.log("Controller -> forwardSub -> instancesPassingCheckNOTs", instancesPassingCheckNOTs)
    return instancesPassingCheckNOTs
  }

  _isArg(val) {
    // check if val is of format '$xxx'
    // return this.argRegex.test(val)
    return /\$.+/.test(val)
  }

  _getArgName(searchFormArgName) {
    return searchFormArgName.replace('$','');
  }

  _checkNots(ngFact, aFacts, argSubMap, gRule) {
    // ngFact: gFact in NOTs, aFacts: availFacts
    // some parts of ngFact
    ngFact = this._subGFact(ngFact, argSubMap)
    console.log("Controller -> _checkNots -> argSubMap", argSubMap)
    console.log("Controller -> _checkNots -> ngFact", ngFact)
    let atLeast1Match = false
    aFacts.forEach(aFact => {
      // clone argSubMap to avoid over-subbed by prev iterations
      let argSubMap2 = mu.deepClone(argSubMap)
      let canMatch = this._matchByDiff(ngFact, aFact, argSubMap2)
      // the sub need to pass arg checks too. check with most subbed argSubMap
      let passArgCheck = this._argCheck(gRule, argSubMap2)
      if (canMatch && passArgCheck) {
        atLeast1Match = true
      }
      // debug
      if (canMatch && !passArgCheck) {
        console.log("_checkNots cannot pass arg checks")
        console.log("Controller -> _checkNots -> argSubMap2", argSubMap2)
      }
    })
    // if there is at least 1 match, it fails to pass [check NOTs]
    return !atLeast1Match
  }

  _subGFact(gFact, argSubMap) {
    Object.keys(argSubMap).forEach(k => {
      gFact = gFact.replace('$' + k, argSubMap[k])
    })
    return gFact
  }

  _fixArgVal(argVal) {
    // remove trailing space
    if (argVal[argVal.length - 1] == ' ') {
      argVal = argVal.substring(0, argVal.length - 1)
    }
    // handle numbers
    if (!isNaN(argVal)) {
      argVal = Number(argVal)
    }
    return argVal
  }

  _argCheck(gRule, argSubMap) {
    let argCheckPass = true
    gRule.argChecks.forEach(argCheck => {
      if (!argCheck(argSubMap)) {
        argCheckPass = false
      }
    })
    return argCheckPass
  }

  // sub and modify argSubMap in-place, return bool of [can match or not]
  _matchByDiff(gFact, aFact, argSubMap) {
    var diff = Diff.diffWords(gFact, aFact);
    let currArg = null;
    let currArgVal = null;
    let isFindingSub = false;
    // let argSubMap = argSubMap
    // diff.forEach(d => {
    for (var i=0; i<diff.length; i++) {
      let d = diff[i]
      if (d.removed) {
        if (this._isArg(d.value)) {
          // is handling new arg
          // save last arg to argSubMap if there is last Arg
          if (currArg != null) {
            argSubMap[currArg] = this._fixArgVal(currArgVal)
          }
          currArg = this._getArgName(d.value)
          // refresh currArgVal
          currArgVal = ''
          isFindingSub = true
        }
      } else {
        if (d.added) {
          // add to currArgVal
          currArgVal += d.value
        } else {
          // whether add or not depends on whether next d is arg or not.
          if (i+1 < diff.length) {
            let d2 = diff[i+1]
            // add if d2 is not arg
            if (!(d2.removed && this._isArg(d2.value))) {
              console.log("Controller -> _matchByDiff -> d2", d2)
              // add to currArgVal
              currArgVal += d.value
            }
          }
        }
      }
    }
    // handle last arg
    if (currArg != null) {
      argSubMap[currArg] = this._fixArgVal(currArgVal)
    }
    // check if all subbed and is correct sub
    let gFact2 = this._subGFact(gFact, argSubMap)
    console.log("Controller -> _matchByDiff -> aFact", aFact)
    console.log("Controller -> _matchByDiff -> gFact2", gFact2)
    console.log("Controller -> _matchByDiff -> gFact2 == aFact", gFact2 == aFact)
    return (gFact2 == aFact)
  }

  // fact of simple text v3. return subRes2 if can match
  // TODO: handle lhsNot
  _tryMatchFact(gFact, aFact, subRes) {
    // sub gFact with settled args first
    gFact = this._subGFact(gFact, subRes.argSubMap)
    // obtain gFact search form for remaining args
    let sGFact = gFact.replace(argRegex, searchFormReplacement)
    let sGFactRegex = new RegExp(sGFact, 'g');
    let possToMatch = sGFactRegex.test(aFact)
    console.log("Controller -> _tryMatchFact -> sGFact", sGFact)
    console.log("Controller -> _tryMatchFact -> aFact", aFact)
    console.log("Controller -> _tryMatchFact -> possToMatch", possToMatch)
    if (possToMatch) {
      let argSubMap2 = mu.deepClone(subRes.argSubMap)
      let subRes2 = {
        argSubMap: argSubMap2,
        gRule: subRes.gRule,
        remainingGFacts: mu.deepClone(subRes.remainingGFacts),
      }
      let canMatch = this._matchByDiff(gFact, aFact, subRes2.argSubMap)
      if (canMatch) {
        // still need to check if arg constraints are fullfilled
        let argCheckPass = this._argCheck(subRes2.gRule, subRes2.argSubMap)
        if (argCheckPass) {
          // all pass, can proceed
          return subRes2
        } else {
          return null
        }
      } else {
        // cannot match
        return null
      }
    } else {
      // impossible to match, end
      return null
    }
  }

  _forwardSubRecursive(subRes, availFacts, finishedSubResList) {
    // other than subbing with the 1st matched aFact, also need to go through remaining aFacts for other valid subbings
    // extract parts that are diff between fact obj form and fact text form
    
    console.log("Controller -> _forwardSubRecursive -> subRes.remainingGFacts", subRes.remainingGFacts)
    // if there is no more remaining gFacts left, the recursion is finished
    if (subRes.remainingGFacts.length == 0) {
      // this is a finished subRes where all gFacts in lhs is subbed successfully. add this to final res list and end recursion
      finishedSubResList.push(subRes);
      return;
    }
    // next gFact to process
    let gFact = subRes.remainingGFacts.pop()
    // try sub and match this gFact with all aFacts
    let subRes2List = []
    availFacts.forEach(aFact => {
      // return subRes2 if can sub to match the aFact. this subRes2 is a subbing with 1 more lhs gFact (the one poped out) subbed.
      let subRes2 = this._tryMatchFact(gFact, aFact, subRes)
      if (subRes2 != null) {
        subRes2List.push(subRes2)
      }
    })
    console.log("Controller -> _forwardSubRecursive -> subRes2List", subRes2List)
    if (subRes2List.length > 0) {
      // recursively move on process
      subRes2List.forEach(sr2 => {
        console.log("Controller -> _forwardSubRecursive -> sr2", sr2)
        // move on to process the next lhs gFact
        this._forwardSubRecursive(sr2, availFacts, finishedSubResList)
      })
    } else {
      // this gRule has gFact (the gFact being processed in curr step) in xhs that cannot match any avail facts, thus should stop any further subbing on this gRule
      return;
    }
  }

  subGRule(gRule, argSubMap) {
    // let {gRule, argSubMap} = subRes
    // determ undetermined args
    Object.keys(gRule.argDeterm).forEach(k => {
      if (argSubMap[k] == undefined) {
        // is undetermined arg to be subbed
        argSubMap[k] = gRule.argDeterm[k](argSubMap)
      }
    })
    let lhs = gRule.lhs.map(gF => this._subGFact(gF, argSubMap))
    let rhs = gRule.rhs.map(gF => this._subGFact(gF, argSubMap))
    let res = {
      lhs,
      rhs,
      // include subbing info?
      gRule,
      argSubMap,
    }
    return res
  }

  visualizeGRule(gRule) {
    let tempGRule = {
      id: gRule.id,
      lhs: gRule.lhs,
      lhsNot: gRule.lhsNot,
      rhs: gRule.rhs,
    }
    let vGRule = JSON.stringify(tempGRule, ' ', 2)
    return vGRule
  }
}

module.exports = Controller;