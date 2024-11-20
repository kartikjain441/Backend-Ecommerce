const Address = require("../models/Address");

const AddAddress = async (req, res) => {
  try {
    let userId = req.id;
    let { name, country, state, city, pincode, number, AddressLine } = req.body;

    if (
      !userId ||
      !name ||
      !country ||
      !state ||
      !city ||
      !pincode ||
      !number ||
      !AddressLine
    ) {
      return res.json({ message: "All fields are required", success: false });
    }

    const Addres = await Address.create({
      userId,
      name,
      country,
      state,
      city,
      pincode,
      number,
      AddressLine,
    });

    res
      .status(201)
      .json({ message: "Address added successfully", Addres, success: true });
  } catch (error) {
    console.error("Error adding address:", error);
    res.json({
      message: "An error occurred while adding the address",
      success: false,
    });
  }
};

const LastAddress = async (req, res) => {
  try {
    let userId = req.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }

    const Addresses = await Address.find({ userId })
      .sort({ createdAt: -1 })
      .limit(1);
    const LastAddress = Addresses.length > 0 ? Addresses[0] : null;

    res.json({ message: "User's last address", LastAddress });
  } catch (error) {
    console.error("Error fetching last address:", error); 
    res.status(500).json({
      message: "An error occurred while fetching the last address",
      success: false,
    });
  }
};

module.exports = {
  AddAddress,
  LastAddress,
};
