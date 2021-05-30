// global reusable conditions
const eq = (a,b) => a==b

// reusable conditions
var rc = {
  canDodge: (vt, wpn) => fact(
    [
      le(
        wpn.speed, $s
      ),
      gt(
        vt.fgt.canDodge, $s
      )
    ]
  )
  // vt canDodge or not in old facts should not decide whether vt canDodge in curr fact. 
  // if it is inside a fact() func, it should only consider the curr fact being processed inside the fact() func
}

// instead of just a "rc", can also be a nested obj, with leafs containing diff group of rules / conditions
const rc = {
  ppl: {
    fgt: {
      canDodge: (vt, wpn) => fact(
        [
          le(
            wpn.speed, $s
          ),
          gt(
            vt.fgt.canDodge, $s
          )
        ]
      )
    }
  }
}
/*
problems
  when developing, hard to remember placement of diff conditions. still better than totally no grouping though
*/

var rules = [
  {
    lhs: and(
      [
        fact(
          [
            eq(
              $kl.action.type, 'atk'
            ),
            eq(
              $kl.action.data.target, $vt
            ),
            eq(
              time, $t
            ),
            rc.canDodge(
              $vt,
              $kl.wpn
            )
          ]
        )
      ]
    ),
    rhs: {

    }
  },
  // use lang provided basic operations
  {
    lhs: [
      fact => (
        fact.$kl.action.type == 'atk'
        &&
        fact.$kl.action.data.target == $vt
        &&
        fact.time == $t
        &&
        rc.canDodge(fact.$vt, fact.$kl.wpn)
      )
    ],
    // lhs is AND on all facts in list of facts by default. each fact func check on single same fact obj. there may be too much implict things though
    // should not force condition to be must be within single fact obj, as it is poss for some relationship to be cross some fact objs
    rhs: {

    }
  }
]

/*
notes
  nested funcs as condition of rules
  the base and() of lhs may be redudandant if all lhs must have "and()" anyway
  can handling of args ($argX, ...) be implemented?
*/

// args
const rules = [
  (args) => (
    {
      args: {
        $vt,
        $kl
      },
      lhs: {

      }
    }
  )
  /*
    this will return a gRule instance
  */
]