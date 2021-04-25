class IFController {
  constructor() {
    this.characters = []
  }

  getCharacter(token) {
    // get character of request from token
  }

  getCurrentFacts(characterID) {
    // get current facts visible to character
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
1. custom code to define/control wt facts to be picked to show to player
2. some facts rules are about [ wt facts player can see ]
  eg
    character ts
      
*/