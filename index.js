const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 3000;
// app.use(
//   cors({
//     origin: "https://frontend-ecommerce-beta-two.vercel.app/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors({ origin: "*", credentials: false }));
app.use(express.json());
require("dotenv").config();

const UserRouter = require("./routes/user");
const productRouter = require("./routes/product");
const CartRouter = require("./routes/Cart");
const AddressRouter = require("./routes/Address");
const PaymentRouter = require("./routes/Payment");

mongoose
  .connect(
    "mongodb+srv://kj476960:hzpIrcbgxRtBRNDz@cluster0.7qqca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));
//user
app.use("/api/user", UserRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);
app.use("/api/Payment", PaymentRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
