const rules = [
  {
    lhs: and(
      [
        fact(
          [
            eq(
              $kl.action, 'atk',
            ),
            eq(
              time, $t
            ),
            le(
              $kl.wpn.speed, $s
            ),
            gt(
              $vt.fgt.canDodge, $s
            )
          ]
        )
      ]
    ),
    rhs: {

    }
    /*
    comments
      quite unclear structure
      how to define if the conditions need to be within the same non-in-place fact obj? prev v2 define by placing all [ attr-x ==/>/... val-x ] in same nested obj?
        1. by a fact func that defines all things inside should be in the same fact obj
    */
  },

  // v2
  {
    lhs: and(
      [
        fact(
          [
            eq(
              $kl.action, 'atk'
            ),
            $vt.canDodge(
              $kl.wpn
            )
          ]
        )
      ]
    )
    /*
    comments
      there is classes and class funcs, e.g. Char canDodge
      use class func in conditions, consequences of rules
    */
  }
]
