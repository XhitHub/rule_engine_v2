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

const concatNoRepeat = (arr1, arr2) => {
  let arr3 = arr1.concat(arr2)
  let set = new Set(arr3)
  let arr4 = Array.from(set)
  return arr4
}

module.exports = {
  deepClone,
  allDefined,
  concatNoRepeat,
}