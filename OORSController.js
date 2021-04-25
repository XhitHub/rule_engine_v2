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
        // wt to do to be defined in each inferencable
    })
  }
}

/*
handling actions with diff time spent
1. cooldown
  character do action with time spent N
  --> within time N (e.g. N steps), character cannot do any other actions?

handling parallel actions
some actions may be do at once, eg walking and aiming
  control by logic
    eg
      can do action x or not is decided by whether R hand is available or not
*/