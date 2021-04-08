var RuleEngine = require("node-rules");


var largerThan = function(a,b) {
  return a > b
}


/* Creating Rule Engine instance */
var R = new RuleEngine();

/* Add a rule */
var rule = {
  "condition": function(R) {
      // console.log(this);
      R.when(this.transactionTotal < this.limit);
  },
  "consequence": function(R) {
      this.result = false;
      this.reason = "The transaction was blocked as it was less than 500";
      console.log('inferencing', this);
      R.stop();
  }
};
var rule2 = {
    "condition": function(R) {
        // console.log(this);
        // R.when(this.transactionTotal > this.limit && this.transactionTotal < 1000);
        R.when(largerThan(this.transactionTotal, this.limitGetter.getLimit()) && this.transactionTotal < 1000);
    },
    "consequence": function(R) {
        this.result = true;
        this.reason = "this.transactionTotal > this.limit && this.transactionTotal < 1000, rob all, this.transactionTotal = 0";
        this.transactionTotal = 0
        console.log('inferencing', this);
        R.next();
    }
};

/* Register Rule */
R.register(rule);
R.register(rule2);

/* Add a Fact with less than 500 as transaction, and this should be blocked */
var fact = {
    "name": "user4",
    "application": "MOB2",
    "transactionTotal": 600,
    "limit": 500,
    limitGetter: {
      getLimit: function() {
        return 500
      },
    },
    "cardType": "Credit Card"
};

/* Check if the engine blocks it! */
setInterval(function() {
  R.execute(fact, function (data) {
    console.log("data", data)
    fact = data
  });
  console.log("fact", fact)
}, 1000)

// can: click btn ==> R.execute

// R.execute(fact, function (data) {
//   console.log("data", data)
// });