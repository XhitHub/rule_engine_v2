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
        fact.$kl.action.type == 'dept_approve'
        &&
        fact.$kl.action.data.target == $vt
        &&
        fact.time == $t
        &&
        rc.canSubmit(fact.$vt, fact.$kl.wpn)
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
const gRules = [
  (args) => (
    {
      // conditions for a subbing to be valid, such that the subbed gRule is a valid rule / rule that is T
      argConditions: args => {
        return (
          args.kl.action
          &&
          args.vt.fgt
        )
      },
      /*
      should allow finding/searching fitting arg for each arg?
      */
      argConditionsV2: {
        // 1 condition func for each arg, for checking if arg candidate (arg) is valid arg or not
        kl: arg => arg.action != undefined,
        vt: arg => arg.fgt != undefined,
      },
      argCandidates: {
        kl:
      },
      possArgs: {
        kl: [],
        vt: [],
      },
      /*
      Usage:
        for each arg in argConditionsV2:
          for poss arg candidate (can be each nested field/obj) in facts
            check if arg candidate is valid
              if valid
                add to poss arg list for that arg
        in generating arg subbing combinations:
          generate with the lists of valid poss args
        
        or:
        lhsV2:
          LHS: have conditions grouped by args, when inference:
            for poss arg candidate (can be each nested field/obj) in facts
              check if arg candidate is valid and T
                if valid and T
                  add to arg list for that arg
            in inference:
              inference for each complete combination of all args
              if 1 arg is missing/unable to be subbed with T val, should have no inference
          problems
            cannot specify in same fact obj or not?
        or:
          argConditionsV3
            can only add to arg candidate if is valid and T
            it is only arg condition, not yet the lhs condition of rule
          lhs
            keep current lhs
          may have redundant things?
      */
      lhs: {

      },
      lhsV2: {
        kl: kl => {

        },
        vt: vt => {

        },
        // ...
      }
    }
  )
  /*
    gRule should be able to be generated from system's auto recognizing gRule from its instances?
    this will return a gRule instance
    wt is a fitting arg
      all accessed nested fields exist
        e.g. 
          $kl.action.data.target
          $kl.action.type
        this can already narrow down possibilities, filtering out things that cannot be subbed
      all accessed nested fields fits data type?
        may not need as at condition val check eq/gt/... or not would have already handled?
    for each arg
      list all of its access of nested fields
      when check if a thing can fit in the arg
        check if each nested fields exist for the thing
    gRule concepts
      args
        1  
          any thing can sub in
            vals, objs, obj with deep nested structures, rules?, ...
          if anything can sub in, in trying to sub a gRule, need to try all poss combination of subbing all diff things in the facts?
            too large amount of combinations
              needs narrowing / filtering
                break the poss combination when 1 subbing failed
        2
          limit subbing condition
            there needs to be subbing conditions anyway
    gRule subbing process

  */
]