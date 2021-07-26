var mu = require('../../myUtil');

const ad = mu.allDefined;

const wrdDfc3 = {
  facts: [],
  rules: [],
  gRules: [
    {
      // id is used for reference when checking inference results
      id: 1,
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

module.exports = {
  wrdDfc3,
}