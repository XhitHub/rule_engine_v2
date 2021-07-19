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

module.export = {
  deepClone,
  allDefined,
}