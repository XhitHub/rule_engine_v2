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
    //lang translators
    {
      lhs: [
        '$content at time $t'
      ],
      rhs: [
        'at time $t, $content'
      ],
      priority: 999,
    },
    //fict rules
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
      ],
      argChecks: [
        args => !ad(args, ['c1','c2']) || (args["c1"] != args["c2"]),
      ]
    },
    // continuing rules
    {
      lhs: [
        'at time $t1, $c1 is in $r1'
      ],
      lhsNot: [
        // 'at time $t2, $c1 is in $r2',
        'at time $t1, $c1 do: go to $r2',
        'max time: $t1',
      ],
      rhs: [
        'at time $t2, $c1 is in $r1'
      ],
      argChecks: [
        args => !ad(args, ['r1','r2']) || (args["r1"] != args["r2"]),
        args => !ad(args, ['t1','t2']) || (args["t1"]+1 == args["t2"]),
      ],
      argDeterm: {
        t2: args => args['t1'] + 1,
      }
    },
    // conflict rules
    {
      lhs: [
        'at time $t1, $c1 is in $r1',
        'at time $t1, $c1 is in $r2'
      ],
      rhs: [
        'conflict: 1. at time $t1, $c1 is in $r1 ; 2. at time $t1, $c1 is in $r2'
      ],
      argChecks: [
        args => !ad(args, ['r1','r2']) || (args["r1"] != args["r2"]),
      ],
    }
  ],
}
/*
how to handle continuous facts?
  continuous facts:
    at time x, asd
    if no changes, then at time x+1, asd too
      everytime there is changes, add a 'at time x+1, asd F'?
    unless time x+1's one is specified, then at time x+1, asd too
      hv lowest priority so that the new at time x+1 one will be determined out first
  or to have rules going to use the continuous facts consider the closest fact instead?
  2 set of facts, one is history with valued times, one is curr moment?
    if there is change, will change curr moment
    even if there is curr moment, curr moment - 1's time's fact won't get created, rule cannot operate on it
  2 set of facts, one is history with valued times, one is latest version?
    if there is change, will change latest version
      but facts are all non-inplace, can only add new T facts, cannot modify already added facts
    rules to use latest version instead of valued time version
curr moment system:
  some rules operates with curr facts: they will have time being "at time curr" instead of at time integer val
  there is fact of curr time == integer val which will be progressing each turn
  inference non curr time version of the fact (int time version) with the curr time int val
    rules that works on non curr time will use these facts
non-inplace problems:
  too much facts in later stages
  sols
    remove early facts
    remove too infrequently used facts
      store usage count
        when used in lhs, count++
        at each turn, all facts count--
        when count == 0, fact dies out
  conflicts that are only discovered in later steps
    check/detect conflict
      conflict rules?
    resolve conflict
conflicts handling
  some conflicts can only be declared in rules and system wont be able to know by its own
    eg at same time T-x, char-x cannot be in 2 diff positions
*/

module.exports = {
  wrdDfc3,
  wrdDfc4,
}