const Controller = require('./controller');
const data = require('./sample_data')

var gRule = data.gRules[0]
console.log("gRule", gRule)

const controller = new Controller()
controller.addSearchForm(gRule)
console.log("gRule", gRule)
