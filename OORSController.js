class OORSController {
  constructor() {
    this.watchList = []
  }

  register(instance) {
    this.watchList.push(instance)
  }

  inference() {
    this.watchList.forEach(inf => {
      inf.inference()
    })
  }
}