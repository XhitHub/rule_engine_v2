const Diff = require('diff');

const kn = require('./knowledge');
const Controller = require('./Controller')
const wrds = require('./wrds')
const WrdCase = require('./WrdCase')

// t1
try{
  const f1 = {
    a: 1,
    b: 'asd',
  }
  console.log(f1.a)
  console.log(f1.b)
  console.log(f1.c)
} catch(e) {
  console.log("e", e)  
}
// Object.keys(f1).forEach(function (key) {
//   console.log("key", key)
// });


// // t2
// const c = new Controller();
// var {gRules, facts} = kn;
// console.log("kn", kn)
// var res = c.forwardSub(gRules[0], facts);
// console.log("res", JSON.stringify(res))


// // t3
// var {gRules, facts} = kn;
// const wc1 = new WrdCase(wrds.wrd1, facts)
// console.log("wc1.facts", JSON.stringify(wc1.facts))
// wc1.forwardOneStep()
// console.log("wc1.facts", JSON.stringify(wc1.facts))
// wc1.forwardOneStep()
// console.log("facts", facts)
// console.log("wc1.facts", JSON.stringify(wc1.facts, ' ', 2))
// console.log("wc1", JSON.stringify(wc1, ' ', 2))
// // wc1.forwardOneStep()

// t4 diff test
const s1 = '$c1 st $c2 at $t1'
const s2 = 'char1 st char2 at this morning'
const s5 = 'char1 st char2 the asd qwe at this morning'

const s3 = "$c1 $c2 $c3 are in group $g1"
const s4 = "char1 char3 asd qwe char2 are in group group1"

var diff = Diff.diffWords(s1, s2);
console.log("diff", diff)
var diff = Diff.diffWords(s3, s4);
console.log("diff", diff)
var diff = Diff.diffWordsWithSpace(s3, s4);
console.log("diff", diff)
var diff = Diff.diffWordsWithSpace(s1, s5);
console.log("diff", diff)