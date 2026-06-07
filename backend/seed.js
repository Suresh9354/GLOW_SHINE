import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

// Connect to Database
connectDB();

const products = [
  {
    name: "Gentle Foaming Cleanser",
    description: "A soothing botanical cleanser that gently lifts impurities, leaving your skin soft, refreshed, and hydrated.",
    price: 18.00,
    image: "/uploads/Gentle.jpg",
    category: "Cleansers",
    rating: 5,
  },
  {
    name: "Rejuvenating Vitamin C Serum",
    description: "A potent active complex packed with Vitamin C and Hyaluronic Acid to brighten dull skin, fade spots, and smooth texture.",
    price: 34.00,
    image: "/uploads/Serum.jpg",
    category: "Serums",
    rating: 5,
  },
  {
    name: "Broad Spectrum Sunscreen SPF 50",
    description: "Ultra-lightweight daily sunscreen offering broad-spectrum UVA/UVB protection without white cast or greasy residue.",
    price: 22.50,
    image: "/uploads/Sunscreen.jpg",
    category: "Sun Care",
    rating: 4,
  },
  {
    name: "Ultra Hydrating Face Cream",
    description: "A rich, whipped cream designed to restore skin barrier function, deeply hydrate dry areas, and lock in moisture for 24 hours.",
    price: 28.00,
    image: "/uploads/face-cream.jpg",
    category: "Hydrators",
    rating: 5,
  },
];

const seedData = async () => {
  try {
    // 1. Seed Products conditionally (Do NOT delete existing ones)
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(products);
      console.log("🌱 Default products seeded.");
    } else {
      console.log("ℹ️ Products already exist. Skipping product seeding.");
    }

    // 2. Seed Users conditionally (Check if admin exists first)
    const adminExists = await User.findOne({ email: "admin@glowandshine.com" });
    if (!adminExists) {
      const adminPassword = await bcrypt.hash("adminpassword", 10);
      const customerPassword = await bcrypt.hash("password", 10);

      await User.create([
        {
          name: "Admin User",
          email: "admin@glowandshine.com",
          password: adminPassword,
          isAdmin: true,
        },
        {
          name: "Test Customer",
          email: "customer@example.com",
          password: customerPassword,
          isAdmin: false,
        },
      ]);
      console.log("👤 Users (Admin + Customer) seeded successfully.");
    } else {
      console.log("ℹ️ Admin user already exists. Skipping user seeding.");
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
