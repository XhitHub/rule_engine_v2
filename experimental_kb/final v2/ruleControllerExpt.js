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
    kl: {
      wpn: {
        name: 'asd',
        speed: 0.7
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

const gRule1 = {
  possArgs: {
    kl: [],
    vt: [],
  },
  argConditions: {
    kl: a => a.wpn != undefined,
    vt: a => a.fgt != undefined,
    a3: a => a.tag.includes('a3Tag'),
    simpleValArg1: a => a,
    /*
    argConditions can implement other poss arg filtering ideas like setting tags, ...
    besides arg's nested fields, the arg's parents may also matters, e.g. if the arg in the gRule is a.b.arg1.c.d, then it needs to be a child of a.b to be 
      can arg conditions about [ how parents are ] be specified?
    wt if arg condition involves some other args?
    arg that are vals
      need to pass by reference?
      usually arg conditions are about val's key/fieldname / parent
    */
  },
}

const searchForPossGRuleSubbing = function(gRule, facts) {

}

class RulesController {
  navAllObjs(newFacts, operation) {
    // nav through all obj in any nested/arr position, exec passed in operation(obj)
    
  }
  navAllObjsRecursive(target, operation) {
    if (this.isArray(target)) {
      target.forEach(item => {
        navAllObjsRecursive(item, operation)
      })
    }
    else if (this.isObject(target)) {
      // ECMAScript 2017 needed
      for (const [key, value] of Object.entries(object)) {
        navAllObjsRecursive(value, operation)
      }
    }
    else {
      // is simple val
    }
  }
  isArray(a) {
    return (!!a) && (a.constructor === Array);
  }
  isObject(a) {
    return (!!a) && (a.constructor === Object);
  }
}

const navAllObjs = function(newFacts, operation) {
  // nav through all obj in any nested/arr position, exec passed in operation(obj)

}


const fillPossArgs = function(gRule, facts) {

}