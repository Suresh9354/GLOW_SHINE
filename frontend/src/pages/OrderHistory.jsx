import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaCalendarAlt, FaHashtag } from "react-icons/fa";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/orders/myorders?email=${user.email}`);
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError("Failed to load your orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-sand-50">
        <p className="text-cocoa-600 italic">Loading your order history...</p>
      </div>
    );
  }

  return (
    <div className="bg-sand-50 min-h-[85vh] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-semibold">Dashboard</span>
          <h2 className="text-3xl font-serif font-bold text-cocoa-900 mt-1">My Orders</h2>
          <div className="h-0.5 w-12 bg-primary mt-3"></div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-2 border-red-500 text-red-700 text-xs px-4 py-2.5 mb-8 rounded-lg">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white border border-sand-200/50 p-12 text-center rounded-2xl shadow-sm">
            <FaShoppingBag className="text-sand-200/60 text-5xl mx-auto mb-4" />
            <h3 className="font-serif font-bold text-xl text-cocoa-900 mb-2">No Orders Found</h3>
            <p className="text-cocoa-600 text-sm mb-6 max-w-sm mx-auto">
              You haven't placed any orders yet. Explore our skincare collections to start shopping.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition shadow-sm active:scale-97"
            >
              <FaArrowLeft className="text-[10px]" /> <span>Shop Collection</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={order._id}
                  className="bg-white border border-sand-200/50 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  {/* Order Card Header */}
                  <div className="bg-sand-100/40 px-6 py-4.5 border-b border-sand-200/40 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center text-xs font-medium text-cocoa-600 space-x-4">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1.5 text-primary text-[10px]" />
                          {orderDate}
                        </span>
                        <span className="flex items-center">
                          <FaHashtag className="mr-1 text-primary text-[10px]" />
                          ID: <span className="font-sans font-semibold text-cocoa-900 ml-0.5">{order._id}</span>
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className={`border text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full ${
                        order.status === "Processing"
                          ? "bg-amber-50 border-amber-200/60 text-amber-700"
                          : order.status === "Shipped"
                          ? "bg-purple-50 border-purple-200/60 text-purple-700"
                          : order.status === "Delivered"
                          ? "bg-green-50 border-green-200/60 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-50 border-red-200/60 text-red-700"
                          : "bg-blue-50 border-blue-200/60 text-blue-700"
                      }`}>
                        {order.status || "Placed"}
                      </span>
                    </div>
                  </div>

                  {/* Order Card Body */}
                  <div className="p-6">
                    {/* Items List */}
                    <div className="divide-y divide-sand-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-4.5 first:pt-0 last:pb-0">
                          <div>
                            {/* In case user wants to link to detail, check if item has productId */}
                            {item.productId ? (
                              <Link
                                to={`/product/${item.productId}`}
                                className="font-serif font-bold text-cocoa-900 hover:text-primary transition-colors text-base"
                              >
                                {item.name}
                              </Link>
                            ) : (
                              <span className="font-serif font-bold text-cocoa-900 text-base">{item.name}</span>
                            )}
                            <p className="text-cocoa-600 text-xs mt-1">
                              Quantity: <span className="font-semibold text-cocoa-900">{item.quantity}</span> @ ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <span className="font-semibold text-cocoa-900 text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer / Summary */}
                    <div className="border-t border-sand-100 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-xs text-cocoa-600">
                        <p className="font-semibold text-cocoa-900">Ship to:</p>
                        <p className="mt-1 font-normal leading-relaxed max-w-xs">{order.customer.address}</p>
                      </div>
                      <div className="text-right sm:border-l sm:border-sand-100 sm:pl-8">
                        <span className="text-xs text-cocoa-600 font-semibold block uppercase tracking-wider">Total Charged</span>
                        <span className="text-2xl font-bold text-cocoa-900 block mt-0.5">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
