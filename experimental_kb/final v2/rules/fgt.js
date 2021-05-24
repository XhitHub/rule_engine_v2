const rules = [
  {
    // items in arr are ANDs
    lhs: [
      {
        $p1: {
          action: atk($p2),
          wpn: {

          }
        },
        time: $t
      },
      {
        $p2: {
          ts: {
            alert: gt(0.7)
          },
          fgt: {
            canDodge: gt(0.7)
          },

        },
        time: $t
      }
    ]
    /*
    comments
      same kind of action (atk), but 
    */
  }
]