const SIDES = ['lhs', 'rhs'];
const SEARCH_FORM_KEY = 'searchForm'

class Controller {
  constructor(funcsMap, reversedFuncsMap) {
    this.funcsMap = funcsMap
    this.reversedFuncsMap = reversedFuncsMap
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
    gRule[SEARCH_FORM_KEY] = searchForm
  }

  // try forward (inference) with a certain gRule
  // no sense forward with only subset of facts available
  // facts can be current gFacts which includes all lhs, rhs of gRules in gRules chaining, not necessary just facts
  forward(facts, gRule) {
    // 1 argSubMap for 1 gRule
    let argSubMap = {}

  }

  // check if the gRule's xhs is possible to fit the fact
  // forward possFit should have all lhs able to possFit some fact in all avail facts
  _isPossFitForward(facts, gRule) {
    let fitAll = true
    gRule[SEARCH_FORM_KEY]['lhs'].forEach(sFact => {
      let sFactRegex = new RegExp(sFact, 'g');
      // check if the sFact at least fit 1 fact in avail facts
      let fitSome = false
      facts.forEach(fact => {
        let isFit = sFactRegex.test(fact)
        if (isFit) {
          fitSome = true
        }
      })
      // if the sFact cannot fit any fact in avail facts, 
      if (!fitSome) {
        fitAll = false
      }
    })
    return fitAll
  }

  _isPossFitBackward(fact, gRule) {
    let fitSome = false
    gRule[SEARCH_FORM_KEY]['rhs'].forEach(sFact => {
      let sFactRegex = new RegExp(sFact, 'g');
      let isFit = sFactRegex.test(fact)
      if (isFit) {
        fitSome = true
      }
    })
    return fitSome
  }
}

module.exports = Controller