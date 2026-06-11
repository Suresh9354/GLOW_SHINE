import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      required: true,
      default: "Placed",
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
