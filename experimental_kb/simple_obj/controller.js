var mu = require.main.require('./myUtil');

class Controller{
  constructor() {

  }

  // a gFact can only match a currFact and cannot match across N currFacts
  // there may be N diff valid matchings, each match with diff currFact. especially in earlier steps of the subbings
  // return N subRes which are the N diff valid matchings subbing results
  tryMatchFacts(gFact, availFacts, subRes) {
    let subResList = []
    availFacts.forEach(fact => {
      // TODO: impl the below
      // clone argSubMap for the new subRes entry
      // try to match the fact by gFact with the partly filled argSubMap
      // if match success, add the new subRes to subResList
    })
    return subResList
  }

  // return all subRes?
  forwardSub(gRule, availFacts) {
    let finishedSubResList = []
    let initialSubRes = {
      argSubMap: {

      },
      gRule: gRule,
      remainingGFacts: mu.deepClone(gRule.searchForm.lhs),
    }
    forwardSubRecursive(initialSubRes, availFacts, finishedSubResList);
    // beware of potential async
    return finishedSubResList;
  }

  forwardSubRecursive(subRes, availFacts, finishedSubResList) {
    // if there is no more remaining gFacts left, the recursion is finished
    if (subRes.remainingGFacts.length == 0) {
      // this is a finished subRes where all gFacts in lhs is subbed successfully. add this to final res list and end recursion
      finishedSubResList.push(subRes);
      return;
    }
    // pop a remaining gFact to process in this recursive step
    let gFact = subRes.remainingGFacts.pop()
    // try to match this gFact with availFacts, with already decided arg subbings. will update argSubMap
    let subResList = tryMatchFacts(gFact, availFacts, subRes.argSubMap)
    if (subResList.length > 0) {
      // recursively go on process
      subResList.forEach(subRes2 => {
        forwardSubRecursive(subRes2, availFacts, finishedSubResList)
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