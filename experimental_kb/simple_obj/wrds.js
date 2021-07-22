var mu = require('../../myUtil');

const ad = mu.allDefined;

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

const wrdDfc1 = {
  facts: [],
  rules: [],
  gRules: [
    {
      searchForm: {
        lhs: [
          {
            user: '$c1',
          }
        ]
      }
    }
  ],
}

const wrdDfc2 = {
  facts: [],
  rules: [],
  gRules: [
    {
      lhs: [
        {
          char: '$c1',
          action: 'st',
          target: '$c2',
          time: '$t1',
        },
        {
          char: '$c1',
          wpn: '$wpn1',
          time: '$t2',
        },
        {
          wpn: '$wpn1',
          canSt: true,
          canBlunt: false,
        }
      ],
      lhsNot: [
        {
          char: '$c2',
          action: 'dgd',
          target: '$c1',
          time: '$t3',
        }
      ],
      rhs: [
        {
          char: '$c2',
          sted: true,
          time: '$t4',
        }
      ],
      argChecks: [
        args => ad(args, ['t1','t2']) && (args["t2"] >= args["t1"]),
        args => ad(args, ['t1','t3']) && (args["t3"] <= args["t1"]),
        args => ad(args, ['t1','t4']) && (args["t4"] >= args["t1"]),
      ],
      argDeterm: {

      }
    }
  ],
  /*
    problems:
      hard to decide how the fact obj should be
      sols
        standard fact objs
          standard fields for N common kinds of facts
  */
}

const wrdDfc3 = {
  facts: [],
  rules: [],
  gRules: [
    {
      lhs: [
        "$c1 st $c2 at $t1",
        "$c1 has $wpn1 at $t2",
        "$wpn1 can st",
      ],
      lhsNot: [
        "$c2 dgd $c1 at $t3",
      ],
      rhs: [
        "$c2 is sted at $t4",
      ],
      argChecks: [
        args => ad(args, ['t1','t2']) && (args["t2"] >= args["t1"]),
        args => ad(args, ['t1','t3']) && (args["t3"] <= args["t1"]),
        args => ad(args, ['t1','t4']) && (args["t4"] >= args["t1"]),
      ],
      argDeterm: {
        t4: args => args["t1"] + 1,
      }
    }
  ],
}

module.exports = {
  wrd1,
}