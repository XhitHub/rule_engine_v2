var mu = require('../../myUtil');

const wrd1 = {
  // just data, func obj
  facts: [],
  rules: [],
  gRules: [
    {
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
      argConstraints: args => (
        (!mu.allDefined(args, ['time', 'time2']) || args['time'] == args['time2'] + 1)
        &&
        (!mu.allDefined(args, ['time', 'time3']) || args['time'] == args['time3'] - 1)
      ),
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
}

module.exports = {
  wrd1,
}