const rules = [
  {
    // items in arr are ANDs
    lhs: [
      {
        $p1: {
          action: atk($p2),
          wpn: {
            speed: $s,
          }
        },
        time: $t
      },
      {
        $p2: {
          fgt: {
            canDodge: gt($s)
          },

        },
        time: $t
      }
    ]
  }
]

/*
comments
  weird concept of [ return val func generator func ]
  same kind of action (atk), but 
*/