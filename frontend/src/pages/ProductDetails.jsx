import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStar, FaArrowLeft, FaCheck } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import axios, { BACKEND_URL, getImageUrl } from "../axiosConfig";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState("info"); // "info", "ingredients", "directions" or null

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-sand-50">
        <p className="text-cocoa-600 italic">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-sand-50 px-6">
        <h2 className="text-2xl font-serif font-bold text-cocoa-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-cocoa-600 text-sm mb-6">
          The skincare item you are looking for might have been moved or removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition shadow-sm active:scale-97"
        >
          <FaArrowLeft className="text-[10px]" /> <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  // Pre-configured premium details for standard skincare products if missing
  const description = product.description || "A botanical skincare formula carefully blended to enhance your skin's natural vitality, locks in moisture, and shields against oxidative environmental stress.";
  const ingredients = "Purified Water (Aqua), Organic Aloe Barbadensis Leaf Juice, Organic Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Damascena (Rose) Flower Water, Glycerin, Sodium Hyaluronate, Tocopherol (Vitamin E), Anthemis Nobilis (Chamomile) Flower Extract, Phenoxyethanol, Ethylhexylglycerin.";
  const directions = "Apply a small amount to clean skin twice daily (morning and evening). Massage gently into face and neck in upward circular motions until fully absorbed. Follow with moisturizer or sunscreen.";

  return (
    <div className="bg-sand-50 min-h-[85vh] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-cocoa-600 hover:text-primary mb-10 transition-colors border-none bg-transparent cursor-pointer"
        >
          <FaArrowLeft className="text-[10px]" /> <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Product Image Column */}
          <div className="md:col-span-6 bg-white border border-sand-200/40 p-4 rounded-2xl shadow-sm">
            <div className="aspect-square bg-sand-100 rounded-xl overflow-hidden relative">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Product Info Column */}
          <div className="md:col-span-6 space-y-8">
            <div className="space-y-3">
              {product.category && (
                <span className="text-primary text-xs uppercase tracking-[0.2em] font-semibold block">
                  {product.category}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-cocoa-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-1.5 pt-1">
                <div className="flex text-yellow-400 text-[10px]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < (product.rating || 5) ? "" : "text-gray-200"}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-cocoa-600 tracking-wider">
                  ({product.rating || 5.0} / 5.0 Rating)
                </span>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-cocoa-900 pt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              {user ? (
                <button
                  onClick={handleAddToCart}
                  className={`w-full sm:w-auto inline-flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full shadow-sm transition-all duration-200 active:scale-97 cursor-pointer ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-primary hover:bg-primary-hover text-white"
                  }`}
                >
                  {added ? (
                    <>
                      <FaCheck className="text-xs" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="text-xs" />
                      <span>Add to Shopping Cart</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-cocoa-900/20 hover:border-cocoa-900 text-cocoa-900 hover:bg-sand-100/30 text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full transition active:scale-97"
                >
                  Login to Add to Cart
                </button>
              )}
            </div>

            {/* Collapsible Accordions (Apple specs style) */}
            <div className="border-t border-sand-200/80 pt-4 space-y-3">
              {/* Product Info Section */}
              <div className="border-b border-sand-200/60 pb-3">
                <button
                  onClick={() => toggleSection("info")}
                  className="w-full flex justify-between items-center py-2 text-left font-serif font-bold text-sm sm:text-base text-cocoa-900 uppercase tracking-wider cursor-pointer"
                >
                  <span>Product Info</span>
                  <span className="text-sm font-sans">{openSection === "info" ? "—" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSection === "info" ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-cocoa-600 text-sm leading-relaxed font-normal">
                    {description}
                  </p>
                </div>
              </div>

              {/* Key Ingredients Section */}
              <div className="border-b border-sand-200/60 pb-3">
                <button
                  onClick={() => toggleSection("ingredients")}
                  className="w-full flex justify-between items-center py-2 text-left font-serif font-bold text-sm sm:text-base text-cocoa-900 uppercase tracking-wider cursor-pointer"
                >
                  <span>Key Ingredients</span>
                  <span className="text-sm font-sans">{openSection === "ingredients" ? "—" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSection === "ingredients" ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-cocoa-600 text-sm leading-relaxed font-normal italic">
                    {ingredients}
                  </p>
                </div>
              </div>

              {/* How to Use Section */}
              <div className="border-b border-sand-200/60 pb-3">
                <button
                  onClick={() => toggleSection("directions")}
                  className="w-full flex justify-between items-center py-2 text-left font-serif font-bold text-sm sm:text-base text-cocoa-900 uppercase tracking-wider cursor-pointer"
                >
                  <span>How to Use</span>
                  <span className="text-sm font-sans">{openSection === "directions" ? "—" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSection === "directions" ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-cocoa-600 text-sm leading-relaxed font-normal">
                    {directions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
