var RuleEngine = require("node-rules");

class RSController {
  constructor() {
    this.facts = {};
    this.rules = [];
    this.R = new RuleEngine();
  }
}