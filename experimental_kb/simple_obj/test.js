const kn = require('./knowledge');
const Controller = require('./Controller')
const wrds = require('./wrds')
const WrdCase = require('./WrdCase')

// // t1
// const f1 = {
//   a: 1,
//   b: 'asd',
// }
// console.log(f1.a)
// console.log(f1.b)
// Object.keys(f1).forEach(function (key) {
//   console.log("key", key)
// });


// // t2
// const c = new Controller();
// var {gRules, facts} = kn;
// console.log("kn", kn)
// var res = c.forwardSub(gRules[0], facts);
// console.log("res", JSON.stringify(res))


// t3
var {gRules, facts} = kn;
const wc1 = new WrdCase(wrds.wrd1, facts)
console.log("wc1.facts", JSON.stringify(wc1.facts))
wc1.forwardOneStep()
console.log("wc1.facts", JSON.stringify(wc1.facts))
wc1.forwardOneStep()
console.log("wc1.facts", JSON.stringify(wc1.facts))
// wc1.forwardOneStep()