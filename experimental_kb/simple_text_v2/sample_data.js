const facts = [
  'c1 is in room1 at time 0',
  'c1 is in room2 at time 1',
]

// gRules with relationship functions

const gRulesV3 = [
  {
    lhs: [
      '${char} is in ${room} at time ${time}',
      '${room} has termination at time ${{func: "sum", args: [{arg:"time"}, "arg val X of type being string", 1]}}',
      // nested funcs
      '${room} has termination at time ${{func: "sum", args: [{func: "product", args: [{arg: "time"}, 2]}]}}',
    ],
    // consequence can be N new facts
    rhs: [
      '${char} is terminated at time ${sum(time, 1)}',
    ]
  }
]
/*
JSON parse the func obj
  then get reverse version of func with the func key, from reversed funcs map
cannot distinguish arg and directValArg of string type
  valArgs: []? cannot as will lose order info
  indicator: args: [{arg:"time"}, "arg val X of type being string", 1]
    in processing: foreach arg: if (arg.arg) {is arg, need to lookup arg map} else {is direct val}
*/

// relationshipFuncMap
const funcsMap = {
  sum: (a, b) => {
    return a+b
  },
  product: (a, b) => {
    return a*b
  },
}

const reverseFuncsMap = {
  sum: (res, argsMap) => {
    if (argsMap.a == null) {
      
    }
  }
}