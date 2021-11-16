var data_sample = {
  count: 0,
  rate: 2,
}

class Test {
  constructor(data) {
    this.data = data
  }

  update() {
    if (this.data.count < 1000) {
      this.testIncrement();
    }
  }

  // test class specific function
  testIncrement() {
    this.data.count += this.data.rate;
  }
}

module.exports = Test