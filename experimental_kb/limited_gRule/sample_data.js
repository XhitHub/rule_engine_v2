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

// is rule generator? pass in arg to decide how the rule is, decided rule instance that will be returned by the generator
// upon fire: add inferenced rhs facts
// how to search for args to sub to be able to fire: search poss sub and try sub?
// if rhs has custom func it is hard to search for arg sub in reversing. have a reverse version of the rule for [ search for arg sub in reversing ], with reversed version of custom func applied to fields in lhs instead?
const gRules = [
  arg => ({
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
        time: arg.time
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
]

module.export = {
  facts,
  gRules,
}