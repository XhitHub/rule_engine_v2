const SIDES = ['lhs', 'rhs'];

class Controller {
  constructor(funcsMap, reversedFuncsMap) {
    this.funcsMap = funcsMap
    this.reversedFuncsMap = reversedFuncsMap
  }

  _findPotentiallyFittingFacts(gRule, facts, xhs) {
    // xhs: gRule's which xhs to be searched in facts, e.g. 'lhs', 'rhs'
    let possFittingFacts = []
    facts.forEach(fact => {
      gRule.searchForm[xhs].forEach(sFact => {
        let sFactRegex = new RegExp(sFact, 'g');
        let isFit = sFactRegex.test(fact)
      })
    })
  }

  // populate searchForms of the gRule in-place
  addSearchForm(gRule) {
    let searchForm = {}
    SIDES.forEach(xhs => {
      let resXhs = gRule[xhs].map(gFact => {
        let factSearchForm = gFact.replace(/\${.+?}\$/gi, ".+?")
        return factSearchForm
      })
      searchForm[xhs] = resXhs
    })
    gRule['searchForm'] = searchForm
  }


}

module.exports = Controller