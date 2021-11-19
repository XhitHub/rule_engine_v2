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
*/
module.exports = Entity;