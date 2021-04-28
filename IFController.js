class IFController {
  constructor() {
    // store list of characters in RS facts, which need to be accessed
    this.characters = []
  }

  getCharacter(token) {
    // get character of request from token
  }

  getCurrentFacts(characterID) {
    // get current facts visible to character of the token
    var character = this.characters.find(c => c.id == characterID)
    if (character) {
      return character.ts.observedFacts
    }
  }

  takeAction(characterID, action) {
    // directly exec action func of character?
    //   no if gms is not real time (e.g. takes turns)
  }

  getAvailableActions(characterID) {

  }
}

/*
interactions with RS
1. Directly change some facts in RS
  Structure facts of the RSIF, so that
    some facts are facts about actions to do
    some facts are facts about data to be presented in RSIF?

RSIF data
1. custom code to define/control wt facts to be picked to show to user
2. some facts rules are about [ wt facts user can see ]. Probably make more sense as it should be gms logic which controls 
  eg
    character ts
  then custom code in IFController to pick facts of [wt user-x can see] to return for user-x's request
      
*/