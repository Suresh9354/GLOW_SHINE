import Order from "../models/orderModel.js";

// Create order
export const createOrder = async (req, res) => {
  const { items, customer, total } = req.body;

  if (!items || !customer || !total) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const order = await Order.create({ items, customer, total });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get orders by customer email
export const getMyOrders = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required" });
    }
    const orders = await Order.find({ "customer.email": email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching orders" });
  }
};
