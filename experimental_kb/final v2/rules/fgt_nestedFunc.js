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
      hard to reuse
    */
  },

  // v2
  {
    lhs: function() {
      and(
        [
          fact(
            [
              eq(
                $kl.action, 'atk'
              ),
              eq(
                time, $t
              ),
              // if class func
              $vt.canDodge(
                $kl.wpn
              ),
              // if simple reusable func
              canDodge(
                $vt,
                $kl.wpn,
                $place
              )
            ]
          )
        ]
      )
    }
    /*
    comments
      there is classes and class funcs, e.g. Char canDodge
      alternatively, canDodge can be just a condition func
        then it is creating reusable condition funcs
        putting reusable condition func into diff classes is organizing the condition funcs
      simple reusable func
        and(), eq(), gt(), ... are also simple reusable func?
        some reusable func are not associated with any specific types/objs. there is no reason to have them as class func
        func content
          1
          custom coded
          2
          nested condition func
      simple reusable func vs class func
        class func: 
          directly access fields of associated obj
        simple reusable func:
          separate data and logic
      use class func in conditions, consequences of rules
      each relation is spreaded out, e.g. if there are N eq relations inside a nested obj, there will be N eq() spreaded out
    */
  }
]

// v2 classes
class vt {
  //  vt fields
  canDodge(wpn) {
    // ...
  }
}
