const facts = [
  'c1 is in room1 at time 0',
  'c1 is in room2 at time 1',
]

// gRules with relationship functions
const gRulesV1 = [
  {
    lhs: [
      '$1 is in $2 at time $3',
      '$2 has termination at time $3'
    ],
    // consequence can be N new facts
    rhs: [
      '$1 is terminated at time $sum($3,1)',
    ]
  }
]

const gRulesV2 = [
  {
    lhs: [
      '${char} is in ${room} at time ${time}',
      '${room} has termination at time ${sum(time, -1)}',
    ],
    // consequence can be N new facts
    rhs: [
      '${char} is terminated at time ${sum(time, 1)}',
    ]
  }
]