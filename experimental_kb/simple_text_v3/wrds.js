var mu = require('../../myUtil');

const ad = mu.allDefined;

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
  wrdDfc3,
}