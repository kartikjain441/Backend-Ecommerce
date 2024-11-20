const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: "rzp_test_iHGS91ZuD3OrFT",
  key_secret: "aNl8BOMa9RHvVsQ5jN1dvQLx",
});

const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });
  res.json({ message: "payment Successful..", success: true, orderConfirm });
};

const userOrder = async (req, res) => {
  let userId = req.id;
  let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 });
  res.json(orders);
};

const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 });
  res.json(orders);
};

module.exports = { checkout, verify, userOrder, allOrders };
