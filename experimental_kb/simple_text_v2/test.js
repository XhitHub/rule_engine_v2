const Controller = require('./controller');
const data = require('./sample_data')

const controller = new Controller()

// // t1
// var gRule = data.gRules[0]
// console.log("gRule", gRule)
// controller.addSearchForm(gRule)
// console.log("gRule", gRule)

// t2
var gRule = data.gRules[1]
controller.addSearchForm(gRule)
console.log("gRule", gRule)
console.log("data.facts", data.facts)
let res;
res = controller._isPossFitForward(data.facts, gRule)
console.log("res", res)
res = controller._isPossFitBackward(data.facts[0], gRule)
console.log("res", res)

// // t3
// var k = 'asd'
// var arg = {
//   user: 'A1234'
// }
// var testMap = {
//   [arg.user]: 'qwe'
// }
// console.log("testMap", testMap)
