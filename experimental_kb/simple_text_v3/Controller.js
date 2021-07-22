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