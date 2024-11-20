const mongoose = require("mongoose");
const Paymentschema = mongoose.Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    payStatus: {
      type: String,
    },
  },
  { strict: false }
);
const Payment = mongoose.model("Payment", Paymentschema);
module.exports = Payment;
