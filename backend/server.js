import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Fallback for missing uploads to prevent ORB/CORB blocking and provide a placeholder
app.use("/uploads", (req, res) => {
  res.status(404)
     .type("image/svg+xml")
     .send(`
       <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
         <rect width="100%" height="100%" fill="#f3efe9"/>
         <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="16" fill="#8d7f72">
           Image Not Found
         </text>
       </svg>
     `);
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Fallback for missing API endpoints
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Root route
app.get("/", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
