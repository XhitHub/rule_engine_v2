const Diff = require('diff');
// var mu = require.main.require('./myUtil');
var mu = require('../../myUtil');

const argRegex = /\$[\w\d]+/;
const searchFormReplacement = '.+'

class Controller{
  constructor() {
    // this.argRegex = new RegExp('\$[\w\d]+', 'g');
    // this.argRegex = /\$[\w\d]+/;
    // this.searchFormReplacement = '.+'
  }

  forwardSub(gRule, aFacts) {
    // aFacts: availableFacts

  }

  _isArg(val) {
    // check if val is of format '$xxx'
    // return this.argRegex.test(val)
    return /\$.+/.test(val)
  }

  _getArgName(searchFormArgName) {
    return searchFormArgName.replace('$','');
  }

  _matchByDiff(gFact, aFact) {
    var diff = Diff.diffWords(gFact, aFact);
    let currArg = null;
    let currArgVal = null;
    let isFindingSub = false;
    let argSubMap = {}
    // diff.forEach(d => {
    for (var i=0; i<diff.length; i++) {
      let d = diff[i]
      if (d.removed) {
        if (this._isArg(d.value)) {
          // is handling new arg
          // save last arg to argSubMap if there is last Arg
          if (currArg != null) {
            argSubMap[currArg] = currArgVal
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
              // add to currArgVal
              currArgVal += d.value
            }
          }
        }
      }
    }
    // handle last arg
    if (currArg != null) {
      argSubMap[currArg] = currArgVal
    }
    console.log("Controller -> _matchByDiff -> argSubMap", argSubMap)
  }

  // fact of simple text v3
  _tryMatchFact(gFact, aFact, subRes) {
    // sub gFact with settled args first
    Object.keys(subRes.argSubMap).forEach(k => {
      gFact = gFact.replace(k, argSubMap[k])
    })
    // obtain gFact search form for remaining args
    let sGFact = gFact.replace(argRegex, searchFormReplacement)
    let sGFactRegex = new RegExp(sGFact, 'g');
    let possToMatch = sGFactRegex.test(aFact)
    if (possToMatch) {
      // "$c1 st $c2 at $t1" '.+ st .+ at .+'
      /*
      for each arg
        find surrounding: '$c1 st '
        sSurr: '.+ st '
        find in aFact:
          'char1 st '
        replace non arg parts by ''
          'char1'
        the arg = 'char1'
      problems:
        if there are connected args, e.g. "$c1 $c2 $c3 are in group $g1", won't be able to determine which pt is which arg.
        the search mechanism is not robust enough.
      */
      // let args = gFact.
    } else {
      // impossible to match, end
      return null
    }
  }

  _forwardSubRecursive(subRes, availFacts, finishedSubResList) {
    // other than subbing with the 1st matched aFact, also need to go through remaining aFacts for other valid subbings
    // extract parts that are diff between fact obj form and fact text form
    
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
    if (subRes2List.length > 0) {
      // recursively move on process
      subRes2List.forEach(sr2 => {
        // move on to process the next lhs gFact
        this._forwardSubRecursive(sr2, availFacts, finishedSubResList)
      })
    } else {
      // this gRule has gFact (the gFact being processed in curr step) in xhs that cannot match any avail facts, thus should stop any further subbing on this gRule
      return;
    }
  }
}

module.exports = Controller;