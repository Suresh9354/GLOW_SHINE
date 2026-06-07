import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String },
    rating: { type: Number, default: 5 }, // optional
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
