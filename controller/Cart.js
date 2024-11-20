const Cart = require("../models/Cart");
const User = require("../models/user");

const AddToCart = async (req, res) => {
  let { productId, title, price, qty = 1, imgsrc } = req.body;
  let userId = req.id;

  let user = await User.findById(userId);
  if (!user) return res.json("user not found");

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    let newcart = await Cart.create({
      userId,
      items: [],
    });
    return res.json({ message: "Cart Added Successfully", cart: newcart });
  }
  let itemindex = cart?.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemindex > -1) {
    cart.items[itemindex].qty += qty;
    cart.items[itemindex].price += price * qty;
  } else {
    cart?.items.push({ productId, title, price, qty, imgsrc });
  }
  await cart?.save();

  return res.json({ message: "Item Added To Cart", cart });
};
const UserCard = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.json({ message: "User ID is required" });
    }

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.json({ message: "User not found" });
    }

    return res.status(200).json(userCart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
//remove product from the card
const RemoveCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;

    if (!userId) {
      return res.json({ message: "User ID is required" });
    }

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.json({ message: "User not found" });
    }

    // Filter out the item with the given productId
    userCart.items = userCart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save the updated cart
    await userCart.save();

    return res
      .status(200)
      .json({ message: "Product removed from cart", cart: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
// decrease qty
const decreaseQty = async (req, res) => {
  try {
    const userId = req.id;
    const productId = req.params.id;

    if (!userId) {
      return res.json({ message: "User ID is required" });
    }

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.json({ message: "User not found" });
    }

    const index = userCart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (index === -1) {
      return res.json({ message: "Product not found in cart" });
    }

    const item = userCart.items[index];

    if (item.qty > 1) {
      item.price -= item.price / item.qty; // Adjust price based on quantity
      item.qty -= 1; // Decrease quantity
    } else {
      userCart.items.splice(index, 1); // Remove the item from the cart
    }

    await userCart.save();

    return res
      .status(200)
      .json({ message: "Quantity updated", cart: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const clearCart = async (req, res) => {
  const userId = req.id;
  if (!userId) {
    return res.json({ message: "User ID is required" });
  }

  const userCart = await Cart.findOne({ userId });

  if (!userCart) {
    return res.status(404).json({ message: "User not found" });
  }

  userCart.items = [];
  await userCart.save();
  return res.status(200).json({ message: "cart successfully removed" });
};

const IncreaseQty = async (req, res) => {
  const userId = req.id;
  const productId = req.params.id;
  if (!userId) {
    return res.json({ message: "User ID is required" });
  }
  const userCart = await Cart.findOne({ userId });
  if (!userCart) {
    return res.json({ message: "User not found" });
  }
  const index = userCart.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );
  if (index === -1) {
    return res.json({ message: "Product not found in cart" });
  }
  const item = userCart.items[index];
  item.price += item.price / item.qty;
  item.qty += 1;
  await userCart.save();
  return res.status(200).json({ message: "Quantity updated", cart: userCart });
};

module.exports = {
  AddToCart,
  UserCard,
  RemoveCart,
  decreaseQty,
  clearCart,
  IncreaseQty,
};
