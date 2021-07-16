const deepClone = obj => {
  let s = JSON.stringify(obj);
  return JSON.parse(s);
}

module.export = {
  deepClone
}