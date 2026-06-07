import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/myorders", getMyOrders);

export default router;
