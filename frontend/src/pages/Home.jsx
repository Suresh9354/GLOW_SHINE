import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import axios from "../axiosConfig";
import About from "./About";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div id="home" className="bg-sand-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative -mt-20 h-screen flex items-center justify-start px-6 sm:px-12 md:px-20 lg:px-32 overflow-hidden">
        {/* Full Bleed Background Image Container */}
        <div className="absolute inset-0 z-0 bg-sand-50">
          <img
            src="/hero_products.png"
            alt="Premium Skincare Collection"
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Elegant sand horizontal gradient overlay to blend left side text space */}
          <div className="absolute inset-0 bg-gradient-to-r from-sand-50 via-sand-50/85 to-sand-50/10"></div>
          {/* Subtle bottom gradient to blend the hero image into the products section below */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-sand-50 to-transparent"></div>
        </div>

        {/* Hero Content (Left-Aligned in Sand Space) */}
        <div className="relative z-10 max-w-md md:max-w-xl space-y-6 px-2 sm:px-0" data-aos="fade-right">
          <span className="text-primary uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold block">Glow & Shine Skincare</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-cocoa-900 leading-tight">
            Premium Skincare <br />
            Crafted from Nature
          </h1>
          <p className="text-cocoa-600/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-lg">
            Wide range of products for all skin types, crafted from organic, hand-selected natural ingredients for radiant, healthy, and glowing skin.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                const el = document.getElementById("products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center space-x-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-8 py-3.5 rounded-full transition-all shadow-md tracking-wider uppercase active:scale-97 cursor-pointer"
            >
              <span>Shop Collection</span>
              <FaArrowRight className="text-[10px]" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-semibold">Our Collection</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cocoa-900 mt-2">
            Signature Grooming Essentials
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-cocoa-600 italic py-10">
              Loading products...
            </p>
          ) : (
            products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="group flex flex-col justify-between bg-white border border-sand-200/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                data-aos="fade-up"
              >
                {/* Product Image Link */}
                <Link to={`/product/${product._id}`} className="block overflow-hidden relative aspect-square bg-sand-100">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div className="mb-4">
                    {/* Category */}
                    {product.category && (
                      <span className="text-primary text-[9px] uppercase tracking-widest font-semibold block mb-1">
                        {product.category}
                      </span>
                    )}
                    {/* Title */}
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-serif text-lg font-bold text-cocoa-900 group-hover:text-primary transition-colors line-clamp-1 mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    {/* Rating */}
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`mr-0.5 text-[10px] ${
                            i < (product.rating || 5)
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Price */}
                    <p className="text-cocoa-900 font-semibold text-lg mb-4">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Button */}
                    {user ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full flex items-center justify-center bg-cocoa-900 hover:bg-primary text-white py-2.5 rounded-full font-medium transition-all duration-200 uppercase text-[10px] tracking-wider active:scale-97 cursor-pointer"
                      >
                        <FaShoppingCart className="mr-2 text-[10px]" /> Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full text-center border border-cocoa-900/20 text-cocoa-900/70 hover:border-cocoa-900 hover:text-cocoa-900 py-2.5 rounded-full font-medium transition-all duration-200 uppercase text-[10px] tracking-wider active:scale-97 cursor-pointer"
                      >
                        Login to Shop
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {products.length > 8 && (
          <div className="text-center mt-16" data-aos="fade-up">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 border border-cocoa-900/20 hover:border-cocoa-900 text-cocoa-900 hover:bg-sand-100/30 text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full transition active:scale-97"
            >
              <span>View More Products</span>
            </Link>
          </div>
        )}
      </section>

      {/* About Section */}
      <About />

      {/* Testimonials (User Experience) Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
