var mu = require('../../myUtil');

const ad = mu.allDefined;

const wrdDfc3 = {
  facts: [],
  rules: [],
  gRules: [
    {
      // id is used for reference when checking inference results
      id: 'n',
      lhs: [
        "$c1 action1 $c2 at $t1",
        "$c1 has $wpn1 at $t2",
        "$wpn1 can action1",
      ],
      lhsNot: [
        "$c2 action2 $c1 at $t3",
      ],
      rhs: [
        "$c2 is action1ed at $t4",
      ],
      argChecks: [
        args => !ad(args, ['t1','t2']) || (args["t2"] <= args["t1"]),
        args => !ad(args, ['t1','t3']) || (args["t3"] <= args["t1"]),
        args => !ad(args, ['t1','t4']) || (args["t4"] >= args["t1"]),
      ],
      argDeterm: {
        t4: args => args["t1"] + 1,
      }
    }
  ],
}



const wrdDfc4 = {
  facts: [],
  rules: [],
  gRules: [
    {
      id: 1,
      lhs: [
        '$r1 is connected to $r2',
        'there is $d1 between $r1 and $r2',
        'at time $t1, $c1 is in $r1',
        'at time $t1, $c1 do: go to $r2',
      ],
      lhsNot: [
        'at time $t1, $d1 is locked'
      ],
      rhs: [
        'at time $t2, $c1 is in $r2'
      ],
      argDeterm: {
        t2: args => args['t1'] + 1,
      }
    },
    {
      id: 1.1,
      lhs: [
        '$r1 is connected to $r2',
        'at time $t1, $c1 is in $r1',
        'at time $t1, $c1 do: go to $r2',
      ],
      rhs: [
        'at time $t2, $c1 is in $r2'
      ],
      argDeterm: {
        t2: args => args['t1'] + 1,
      }
    },
    {
      // id no one unlock d1, d1 remains locked
      id: 4,
      lhs: [
        'at time $t1, $d1 is locked',
      ],
      lhsNot: [
        'at time $t1, $c1 do: unlock $d1',
      ],
      rhs: [
        'at time $t2, $d1 is locked',
      ],
      // argChecks: [
      //   args => !ad(args, ['t1','t2']) || (args["t2"] = args["t1"] + 1),
      // ],
      argDeterm: {
        t2: args => args['t1'] + 1,
      }
    },
    {
      id: 2,
      lhs: [
        '$r1 is connected to $r2',
        'at time $t1, $c1 is in $r1',
      ],
      rhs: [
        'at time $t1, $c1 can: go to $r2'
      ]
    },
    {
      id: 3,
      lhs: [
        'at time $t1, $c1 is in $r1',
        'at time $t1, $c2 is in $r1',
      ],
      rhs: [
        'at time $t1, $c1 can: fgt $c2',
      ]
    }
  ],
}

module.exports = {
  wrdDfc3,
  wrdDfc4,
}