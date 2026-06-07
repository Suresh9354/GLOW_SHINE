import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import axios, { BACKEND_URL } from "../axiosConfig";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by category and search query
  useEffect(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  // Extract unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-sand-50">
        <p className="text-cocoa-600 italic">Loading our complete collection...</p>
      </div>
    );
  }

  return (
    <div className="bg-sand-50 min-h-[85vh] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-semibold">Complete Catalog</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-cocoa-900 mt-1">Shop All Products</h1>
          <div className="h-0.5 w-12 bg-primary mx-auto mt-3"></div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-white border border-sand-200/50 p-6 rounded-2xl shadow-sm w-full">
          {/* Categories Tab list (scrolling on mobile) */}
          <div className="flex flex-row overflow-x-auto scrollbar-none pb-2 md:pb-0 w-full md:w-auto gap-2 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-cocoa-900 text-white shadow-sm"
                    : "bg-sand-50 border border-sand-200 text-cocoa-600 hover:bg-sand-100/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-2.5 bg-sand-50/50 border border-sand-200 rounded-full focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all placeholder-cocoa-600/40 font-sans"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-cocoa-600 italic">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group flex flex-col justify-between bg-white border border-sand-200/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Product Image Link */}
                <Link to={`/product/${product._id}`} className="block overflow-hidden relative aspect-square bg-sand-100">
                  <img
                    src={`${BACKEND_URL}${product.image}`}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
