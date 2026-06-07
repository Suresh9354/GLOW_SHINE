import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!name || !address || !email) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        customer: { name, address, email },
        total: totalPrice,
      };

      // Send order to backend
      await axios.post("/orders", orderData);
      clearCart();
      setStatus("success");
    } catch (error) {
      console.error("Checkout error:", error);
      setErrorMessage(error.response?.data?.message || "Error placing order. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-sand-50 px-6">
        <FaCheckCircle className="text-primary text-6xl mb-4" />
        <h2 className="text-3xl font-serif font-bold text-cocoa-900 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-cocoa-600 text-sm text-center max-w-md mb-8">
          Thank you for choosing Glow & Shine. A confirmation email has been sent to <span className="font-semibold text-cocoa-900">{email}</span>.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center bg-cocoa-900 hover:bg-cocoa-900/95 text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-sm active:scale-97"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-cocoa-900/20 text-cocoa-900 hover:bg-sand-100/30 text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-full transition active:scale-97"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sand-50 min-h-[85vh] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-semibold">Secure checkout</span>
          <h2 className="text-3xl font-serif font-bold text-cocoa-900 mt-1">Checkout</h2>
          <div className="h-0.5 w-12 bg-primary mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Checkout Form */}
          <div className="md:col-span-7 bg-white border border-sand-200/50 p-8 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-cocoa-900 pb-2 border-b border-sand-100">
              Shipping Address
            </h3>

            {status === "error" && (
              <div className="bg-red-50 border-l-2 border-red-500 text-red-700 text-xs px-4 py-2.5 rounded-lg">
                {errorMessage}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-sand-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all placeholder-cocoa-600/40 font-sans"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-sand-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all placeholder-cocoa-600/40 font-sans"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Shipping Address</label>
                <textarea
                  placeholder="Street address, apartment, city, state, postal code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-sand-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all placeholder-cocoa-600/40 font-sans resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Checkout Items Summary */}
          <div className="md:col-span-5 bg-white border border-sand-200/50 p-8 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-cocoa-900 pb-4 border-b border-sand-100">
              Your Order
            </h3>

            {/* List */}
            <div className="divide-y divide-sand-100 max-h-60 overflow-y-auto pr-2 space-y-4 scrollbar-none">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-sm pt-4 first:pt-0">
                  <div className="pr-4">
                    <p className="font-serif font-bold text-cocoa-900">{item.name}</p>
                    <p className="text-cocoa-600 text-xs mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-cocoa-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-sand-100 pt-4 space-y-3.5 text-sm text-cocoa-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-cocoa-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-primary uppercase tracking-wider text-[10px] font-semibold">Free</span>
              </div>
              <div className="border-t border-sand-100 pt-4 flex justify-between items-center text-base">
                <span className="font-serif font-bold text-cocoa-900">Total</span>
                <span className="text-lg font-bold text-cocoa-900">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={status === "loading" || cartItems.length === 0}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-semibold transition-all duration-200 uppercase text-xs tracking-wider shadow-sm disabled:opacity-50 active:scale-97 cursor-pointer"
            >
              {status === "loading" ? "Processing..." : "Place Order"}
            </button>

            <Link
              to="/cart"
              className="flex items-center justify-center space-x-2 text-xs text-cocoa-600 hover:text-primary transition-colors font-medium underline underline-offset-4"
            >
              <FaArrowLeft className="text-[10px]" /> <span>Back to Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
