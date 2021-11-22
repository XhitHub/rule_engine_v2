const Char = require('./Char')

class Entity extends Char {
  update() {
    
  }

  atk(atkObj) {
    /* how, where to decide if atk success or not
    just impl the rules: set results as how wrd rules will results in
    res depends on how target react
    */
    this.handleActionCost(atkObj.cost)
    if (!atkObj.target.handleAtk(atkObj)) {
      // atkSuccess. effects to be handled inside handleAtk?
    }
  }

  handleAtk(atkObj) {
    // if have enough attention left, random pick and exec a doable (enough cost) reaction def action. else be atked
  }

  def(defObj) {

  }

  // test prevail handling designs
  doAction(action) {
    // pendingAction should not be in ts as it is about action that is already started DOMStringList, not just planned
    this.data.pendingAction = action
  }
  resolvePrevail(oppoFgter) {

  }
  

  handleActionCost(cost) {
    this.data.strength -= cost.strength
    this.data.balance -= cost.balance
    this.data.attention -= cost.attention
  }
}



// data samples ############################################################################################################

var sampleThisData = {
  // basic abilities
  hp: 10,
  position: {
    x: 0,
    y: 0,
    z: 1,
  },
  strength: 10,
  balance: 10,
  attention: 10,

  state: 'READY',
  healthState: {
    injs: []
  },
  /*
  poss states:
    READY, 
  */
  equipments: {
    wpn: {},
    shield: {},
    armour: {},
  },
}

// or sample action obj?
var sample_AtkParam_or_AtkObj = {
  target: {}, //char/fgter obj
  position: 'CORE',
  type: 'ST',
  force: 4,
  cost: {}, //cost obj
}

var sample_defObj_1 = {
  type: 'DGD',
  cost: {},
}
var sample_defObj_2 = {
  type: 'RESTRIKE',
  atk: {},
  cost: {},
}

var sampleCostObj = {
  strength: 2,
  balance: 2,
  attention: 2,
}

/*
or each type of atk / moves hv their own instance, instead of being params?
when to have new class
  need control of consistent data structure?
    js class and this this.data approach cannot control this
  need the regular update func


action prevail logic
0
simple prevail
  action1 > action2
  action1 > action3
  ...
1
prevail score
  weighted score of some attributes
2
prevail chance
  weighted score to set P(prevail) ratio for the 2 poss outcomes of [ which action prevails ]
3
logic controlled conditional prevail
  need to implement prevail outcome determining for each pair of actions
structure
  v1
    do action create action instances, store at [pending actions] to be resolved
    for each pair of clashing actions, resolve prevail
      resolvePrevail(clashingAction)
    how to know if actions are clashing
      see which pairs of chars are fgting
        opposing chars actions are clashing
    if resolve returned true (prevailed), add action to [prevailed actions] list
  v2
    after char picked action, create action instance and assign to self's [pendingAction] attr
    for each pair of clashing fgters
      resolve prevail for their pendingAction
        action's resolvePrevail func?
          cannot access char's some attrs for deciding prevail res?
        fgter's resolvePrevail func?
        have bool flag of "resolved" to skip already resolved chars
    if resolve returned true (prevailed)
      do the action effects
        e.g. add inj to some bdy parts of oppo
    handle action cost effects regardless of prevail result
      should happen after prevail resolve as the resolve may use some of the attrs cost will change

tbi
  why need to obtn such [action prevail logic]
*/
module.exports = Entity;