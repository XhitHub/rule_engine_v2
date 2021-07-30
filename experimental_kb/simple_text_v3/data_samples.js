// var mu = require.main.require('./myUtil');
var mu = require('../../myUtil');
/* 
all facts are:
  simple single layer key val map
  no nested field allowed
each entry is about some certain facts
some facts may need N fact objs to represent it
such obj should be able to represent most of wt lang can represent?
advantages of this form comparing to text form:
  allows extra fields
    hv more/less details still works
  no restrictions on order
  better placing of args, funcs
  easier arg operations
    arg finding poss subs
but text forms are supposed to be able to handle alt forms by translators, translating rules?
advantages of text form comparing to obj form:
  wont have vague meanings
  don't have to carefully think about how to represent a fact by fact obj, as only need to follow language?
  easier to make translating rules?
  will have large amount of data of text articles available for testing?
using gRules
  forward inference
    need to
      find gRules that can be applied on some of the current facts, instantiate and fire the rules to inference facts
        find poss gRules that can be subbed to have all lhs matched some curr facts
          find gRules that can be subbed so that all lhs gFacts can be matched with some curr facts
            where
              fact-a can be matched with fact-b:
                  all key val pairs in fact-a is also found in fact-b
          for each gRule
            new argSubMap
            for each lhs gFact
              try to match a curr fact
                filter a list of poss matchable curr fact?
                  obtain with search form of gRule
                  not all can be subbed to match. Some may be found to be unmatchable when doing the real subbing
                for each poss matchable curr fact
                  sub the gFact to match the curr fact
                    if arg is set in argSubMap
                      use the set val
                    else
                      pick val to satisfy matching of curr fact and also obey relationship between the args
            there may be N poss subbings:
              a gFact can sub and match with curr fact-b instead of curr fact-a, where both curr facts are in list of poss matchable curr facts
                the arg vals picked will be diff
              to obtain all possibilities:
                each possibility:
                  sub with 1 curr fact x
                all possibilties should be subbed and fired, as they are all valid usage of the gRule
  curr facts oriented instead?:
  recursive
    with some gFacts already subbed and argSubMap partly filled, sub remaining gFacts in xhs
    next step is sub 1 more gFact
      obtained N valid next steps, with diff subbing of 1 more gFact
      recursively call on these N next steps again
    return
      all valid completed subbings?
  data structure for gRule sub res?
*/
const facts = [
  "char1 action1 char2 at 0",
  "char1 has item1 at -1",
  "item1 can action1",
  // set 2
  "char1 action1 char2 at 10",
  "char1 has item2 at -11",
  "item2 can action1",
  // test NOTs
  "char2 action2 char1 at 5",
]

const gRules = [
]

// data structure for forward inference results:
const forwardInferenceRes = {
  factsBeforeInference: [],
  factsAfterInference: [],
  forwardInferences: [
    {
      rule: {},
      factsUsed: [],  //is lhs of rule
      factsInferenced: [],
    }
  ],
  // gRuleInstantiations will be included in forward inferences in fact, if rule as gRule instance includes instantiation info. But having instantiation history can help check if there are unused instances?
  gRuleInstantiations: [

  ],
  checkNotsFails: [
    {
      gRule: {},

    }
  ],
  // report contradictions and request for priority clarification?
  contradictions: [
    
  ]
}

const gRulesPriorityGroups = {
  priorities: [],
  groups: {
    0: [],
    1: [],
  }
}

module.exports = {
  facts,
  gRules
}