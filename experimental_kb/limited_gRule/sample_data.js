const facts = [
  {
    c1: {
      position: 'room1'
    },
    time: 0
  },
  {
    c1: {
      position: 'room2'
    },
    time: 1
  },
  {
    room1: {
      hasTerm: true,
    },
    time: 0
  }
]
// or very simple knowledge: no nested fields? can still solve problems of having extra fields, diff order/placement of info.
// nested facts should be able to be flattened?
// can also restrict args to be only avail for vals but not in key. force users to develop knowledge in such forms

// is rule generator? pass in arg to decide how the rule is, decided rule instance that will be returned by the generator
// upon fire: add inferenced rhs facts
// how to search for args to sub to be able to fire: search poss sub and try sub?
// if rhs has custom func it is hard to search for arg sub in reversing. have a reverse version of the rule for [ search for arg sub in reversing ], with reversed version of custom func applied to fields in lhs instead?
/*
arg subbing
  forward
    need to have all ANDs facts in lhs to be found being T in facts in order to fire
  backward
    need some of ANDs facts in rhs found T in facts
  matching
    obj facts dont need exact match
      for a fact to match, all key vals specified in xhs must exist, but can have extra fields, also can haVe diff ordering of fields
        allow being in diff nested position? may be too complicated, handle these by translators instead
        stringify to find poss fit? but it cannot handle extra fields and diff orderings
        separate case/handling for 1. arg being nested key, 2. arg being nested val?
          nested key
            how to determ if sub or not
              key, vals of curr nested key obj all match
              or content all match recursively?
            there may be N parts/nested key that is suitable for the subbing
            subbing of more outer nested key affects subbing of inner nested key
      key vals specified in the same fact obj have its meaning, should not split to find in diff facts objs in all facts
*/
const gRules = [
  {
    // can directly use this search form to generate instances, no need to use generator?
    searchForm: {
      lhs: [
        {
          $user: {
            position: $pos
          },
          time: $time
        }
      ]
    },
    generator: arg => ({
      lhs: [
        {
          [arg.user]: {
            position: arg.pos
          },
          time: arg.time
        },
        {
          [arg.pos]: {
            hasTerm: true
          },
          time: arg.time - 1
        }
      ],
      rhs: [
        {
          [arg.user]: {
            status: 'terminated'
          },
          time: arg.time + 1
        },
        {
          [arg.pos]: {
            hasTerm: false
          },
          time: customFunc(arg.time)
        }
      ]
    })
  }
]

module.export = {
  facts,
  gRules,
}