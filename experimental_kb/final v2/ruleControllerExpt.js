const facts = [
  {
    // facts that are T regardless of time
    room1: {
      connected: [
        room2
      ]
    },
    room2: {

    }
  },
  {
    time: 0,
    vt: {
      position: room1,
      fgt: {
        canDodge: 0.8
      }
    },
    room1: {
      box: {
        items: [
          {
            type: 'wpn',
            name: 'kn',
            speed: 1,
          }
        ]
      }
    }
  }
]

const searchForPossGRuleSubbing = function(gRule, facts) {

}