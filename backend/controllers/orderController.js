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
// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching all orders" });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error updating order status" });
  }
};

// Delete/Cancel order (Admin only)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error deleting order" });
  }
};
