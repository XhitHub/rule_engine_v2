class myUtils {
  iterateObjKeyVal(obj, keyValAction) {
    // // ECMAScript 2017 needed
    // for (const [key, value] of Object.entries(obj)) {
    //   keyValAction(key, value)
    // }
    Object.keys(obj).forEach((key) => {
      keyValAction(key, obj[key])
    });
  }
  generateCombinationsFromPossPartsListsMap(possPartsListsMap) {
    var combinations = []
    var obj = possPartsListsMap
    Object.keys(obj).forEach((key) => {
      var val = obj[key]
      
    });
  }
  navAllObjsRecursive(target, operation) {
    if (this.isArray(target)) {
      target.forEach(item => {
        navAllObjsRecursive(item, operation)
      })
    }
    else if (this.isObject(target)) {
      // // ECMAScript 2017 needed
      // for (const [key, value] of Object.entries(target)) {
      //   navAllObjsRecursive(value, operation)
      // }
      Object.keys(target).forEach((key) => {
        navAllObjsRecursive(target[key], operation)
      });
    }
    else {
      // is simple val
      operation(target)
    }
  }
}