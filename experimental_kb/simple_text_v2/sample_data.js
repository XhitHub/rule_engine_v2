const facts = [
  'c1 is in room1 at time 0',
  'c1 is in room2 at time 1',
]

// gRules with relationship functions

const gRules = [
  {
    lhs: [
      '${char}$ is in ${room}$ at time ${time}$',
      '${room}$ has termination at time ${{func: "sum", args: [{arg:"time"}, "arg val X of type being string", 1]}}$',
      // nested funcs
      '${room}$ has termination at time ${{func: "sum", args: [{func: "product", args: [{arg: "time"}, 2]}]}}$',
    ],
    // consequence can be N new facts
    rhs: [
      // it is still possible to extract and parse functions in such form
      '${char}$ is terminated at time ${sum(time, 1)}$',
    ],
    searchForm: {
      lhs: []
    },
  },
  {
    lhs: [
      '${char}$ is created at time ${time}$',
    ],
    rhs: [
      '${char}$ is in ${room}$ at time ${{func: "sum", args: [{arg:"time"}, 1]}}$',
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
${}$ instead of ${} for easier regex selection for cases of having {} inside ${}
  {} inside don't need as they will be JSON parsed. only outermost one need this to locate it properly
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

const reversedFuncsMap = {
  // funcArgsMap: is about args to be supplied to the func
  sum: (res, funcArgsMap) => {
    if (funcArgsMap.a == null && funcArgsMap.b == null) {
      return;
    }
    if (funcArgsMap.a == null) {
      funcArgsMap.a = res - funcArgsMap.b
    }
    if (funcArgsMap.b == null) {
      funcArgsMap.b = res - funcArgsMap.a
    }
  }
}

const argSubMap = {
  'arg1': 1,
  'arg2': 'asd',
}

module.exports = {
  facts,
  gRules,
}