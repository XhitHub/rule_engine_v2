const Diff = require('diff');

const kn = require('./data_samples');
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

// // t4 diff test
// const s1 = '$c1 st $c2 at $t1'
// const s2 = 'char1 st char2 at this morning'
// const s5 = 'char1 st char2 the asd qwe at this morning'

// const s3 = "$c1 $c2 $c3 are in group $g1"
// const s4 = "char1 char3 asd qwe char2 are in group group1"

// const s7 = "$c1, $c2 and $c3 are in group $g1"
// const s8 = "char1, char3 asd qwe and char2 are in group group1"

// var diff = Diff.diffWords(s1, s2);
// console.log("diff", diff)
// var diff = Diff.diffWords(s3, s4);
// console.log("diff", diff)
// var diff = Diff.diffWordsWithSpace(s3, s4);
// console.log("diff", diff)
// var diff = Diff.diffWordsWithSpace(s1, s5);
// console.log("diff", diff)

// var c = new Controller()
// c._matchByDiff(s1,s2, {argSubMap: {}})
// c._matchByDiff(s1,s5, {argSubMap: {}})
// c._matchByDiff(s3,s4, {argSubMap: {}})
// c._matchByDiff(s7,s8, {argSubMap: {}})


// // t5
// const gRules = wrds.wrdDfc3.gRules
// const facts = kn.facts
// c.forwardSub(gRules[0], facts)

// // t6
// var {gRules, facts} = kn;
// const wc1 = new WrdCase(wrds.wrdDfc3, facts)
// wc1.forward()
// // console.log("wc1", wc1)
// console.log("wc1 forwardInferenceResults", JSON.stringify(wc1.forwardInferenceResults, ' ', 2))

// t7
const facts = [
  'at time 0, char1 is in room1',
  // 'at time 0, char2 is in room2',
  'char2 is in room2 at time 0',
  'room1 is connected to room2',
  'room1 is connected to room3',
  'room1 is connected to room4',
  'there is door1 between room1 and room4',
]
const wc1 = new WrdCase(wrds.wrdDfc4, facts)
// wc1.forward()
// wc1.forward()
wc1.forwardUntilNoChanges()
console.log("wc1 forwardInferenceResults", JSON.stringify(wc1.forwardInferenceResults, ' ', 2))
wc1.addFacts([
  'char1 do: go to room2 at time 0'
])
wc1.forwardUntilNoChanges()
console.log("wc1 forwardInferenceResults", JSON.stringify(wc1.forwardInferenceResults, ' ', 2))