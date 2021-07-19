var mu = require.main.require('./myUtil');

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
  {
    id: 1,
    user: 'c1',
    pos: 'room1',
    time: 0,
    wpn: 'kn',
  },
  {
    room: 'room1',
    hasTerm: true,
    time: -1,
  }
]

const gRules = [
  {
    // this searchForm only specify which args are of same val. info about relationships like sum(), +1, -1, ... are not included. Those are to be checked in real subbing
    searchForm: {
      lhs: [
        {
          user: '$user',
          pos: '$pos',
          time: '$time',
        },
        {
          room: '$pos',
          time: '$time2',
          hasTerm: true,
        },
      ],
      rhs: [
        {
          user: '$1',
          status: 'terminated',
          time: '$time3',
        }
      ]
    },
    /* use argConstraints for arg checking instead?
      // relationships between / constraints about args are specified here
      // actually can sub casually without checking, then just instantiate with the args map. invalid subbed rules wont get fired anyway?
      // some constraints like == are set by [using the same arg key]
      // this argConstraints checks whether relationships between / constraints about args are fullfilled
      can use search form to instantiate gRule?
        cannot instantiate args that are determ by relationship with some other determined args, e.g. $time3
        need to use the generator anyway
    */
    argConstraints: args => {(
      (!mu.allDefined(args, ['$time', '$time2']) || args['$time'] == args['$time2'] + 1)
      &&
      (!mu.allDefined(args, ['$time', '$time3']) || args['$time'] == args['$time3'] - 1)
      // need to handle arg not yet subbed case by !mu.allDefined
    )},
    // need 2 generators, 1 for foward, 1 for backward? as there may be problems when subbing arg that is relationship function returned val?
    generator: args => ({
      lhs: [
        {
          user: args.user,
          pos: args.pos,
          time: args.time,
        },
        {
          room: args.pos,
          time: args.time - 1,
          hasTerm: true,
        },
      ],
      rhs: [
        {
          user: args.user,
          status: 'terminated',
          time: args.time + 1,
        },
      ]
    })
  }
]

/*
group up data needed in the recursive operations
need to know
  the current argSubMap
  wt are the remaining gFacts to be subbed
  link to the gRule / wt the gRule is
    so that can know the info needed like arg constraints, ...
  the already subbed gFacts?
    may not need to know at all?
*/
const gRuleSubRes1 = {
  argSubMap: {

  },
  gRule: gr1,
  // remaining gFacts in searchForm lhs?
  remainingGFacts: [],
}

module.export = {
  facts,
  gRules
}