const rules = [
  {
    // items in arr are ANDs
    lhs: [
      {
        eq: {
          $kl: {
            action: atk($p2),
          },
          time: $t
        },
        le: {
          $kl: {
            wpn: {
              speed: $s
            }
          }
        },
        gt: {
          $vt: {
            fgt: {
              canDodge: $s
            }
          }
        }
      },
    ]
    /*
    comments
      only support val return funcs that has 2 args, as now at the nest leaf, key=arg1, val=arg2
    */
  }
  
]
