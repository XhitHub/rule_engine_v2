const deepClone = obj => {
  let s = JSON.stringify(obj);
  return JSON.parse(s);
}

const allDefined = (map, keys) => {
  let res = true
  keys.forEach(k => {
    if (map[k] == undefined) {
      res = false;
    }
  });
  return res;
}

const matchObjByStringify = (o1, o2) => {
  try {
    let s1 = JSON.stringify(o1)
    let s2 = JSON.stringify(o2)
    return s1.localeCompare(s2) == 0
  } catch (e) {
    console.log(e)
    return false
  }
}

const objIsMatchedInArrByStringify = (obj, arr) => {
  let match = false
  arr.forEach(aObj => {
    if (matchObjByStringify(obj, aObj)) {
      match = true
    }
  })
  return match
}

const concatNoRepeatByStringify = (arr1, arr2) => {
  let arr3 = [].concat(arr1)
  arr2.forEach(a2O => {
    if (!objIsMatchedInArrByStringify(a2O, arr3)) {
      arr3.push(a2O)
    }
  })
  return arr3
}

const matchObj = (o1, o2) => {
  let match = true
  Object.keys(o1).forEach(k => {
    if (o1[k] != o2[k]) {
      match = false;
    }
  })
  return match
}

const objIsMatchedInArr = (obj, arr) => {
  let match = false
  arr.forEach(aObj => {
    if (matchObj(obj, aObj)) {
      match = true
    }
  })
  return match
}

const concatNoRepeat = (arr1, arr2) => {
  let arr3 = [].concat(arr1)
  arr2.forEach(a2O => {
    if (!objIsMatchedInArr(a2O, arr3)) {
      arr3.push(a2O)
    }
  })
  return arr3
}

module.exports = {
  deepClone,
  allDefined,
  concatNoRepeat,
  concatNoRepeatByStringify,
}
