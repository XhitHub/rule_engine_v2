// for reference of wt are the basic attrs, functions an entity should hv

class BaseEntity {
  constructor(data) {
    // wrap all attrs inside a single "data" obj
    this.data = data
  }

  // serialize() {
  //   // convert the instance's data to a persistable "data" json obj
  //   return this.data
  // }

  update() {
    // regular executing operations
  }
}

module.exports = BaseEntity