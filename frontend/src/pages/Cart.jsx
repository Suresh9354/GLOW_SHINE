import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../axiosConfig";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-sand-50 px-6">
        <FaShoppingBag className="text-sand-200/60 text-6xl mb-4" />
        <h2 className="text-2xl font-serif font-bold text-cocoa-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-cocoa-600 text-sm mb-6">
          Add some premium skincare essentials to get started.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition shadow-sm active:scale-97"
        >
          <FaArrowLeft className="text-[10px]" /> <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-sand-50 min-h-[85vh] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-semibold">Your Selection</span>
          <h2 className="text-3xl font-serif font-bold text-cocoa-900 mt-1">Shopping Cart</h2>
          <div className="h-0.5 w-12 bg-primary mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center bg-white border border-sand-200/50 p-5 rounded-2xl shadow-sm transition-all duration-300"
              >
                {/* Image */}
                <Link to={`/product/${item._id}`} className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-sand-100 rounded-xl overflow-hidden border border-sand-200/30 block">
                  <img
                    src={`${BACKEND_URL}${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 flex flex-col sm:flex-row justify-between w-full">
                  <div className="space-y-1">
                    <Link to={`/product/${item._id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-serif font-bold text-lg text-cocoa-900 leading-tight">
                        {item.name}
                      </h3>
                    </Link>
                    {item.category && (
                      <p className="text-primary text-[9px] uppercase tracking-widest font-semibold">
                        {item.category}
                      </p>
                    )}
                    <p className="text-cocoa-900 font-semibold text-base pt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                    <div className="flex items-center border border-sand-200 bg-sand-50/50 rounded-full overflow-hidden h-9">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-1 text-cocoa-900 hover:bg-sand-200/60 transition disabled:opacity-50 text-sm font-semibold select-none cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold text-cocoa-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1 text-cocoa-900 hover:bg-sand-200/60 transition text-sm font-semibold select-none cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2 bg-red-50 hover:bg-red-100 rounded-full cursor-pointer active:scale-95"
                      title="Remove item"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-white border border-sand-200/50 p-8 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-cocoa-900 pb-4 border-b border-sand-100">
              Order Summary
            </h3>

            <div className="space-y-3.5 text-sm text-cocoa-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-cocoa-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-primary uppercase tracking-wider text-[10px] font-semibold mt-0.5">Free</span>
              </div>
            </div>

            <div className="border-t border-sand-100 pt-4 flex justify-between items-center">
              <span className="font-serif font-bold text-lg text-cocoa-900">Total Price</span>
              <span className="text-xl font-bold text-cocoa-900">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-semibold transition-all duration-200 uppercase text-xs tracking-wider shadow-sm active:scale-97 cursor-pointer"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-xs text-cocoa-600 hover:text-primary transition-colors font-medium underline underline-offset-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
