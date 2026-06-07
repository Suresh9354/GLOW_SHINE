import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus, FaList, FaUpload, FaTimes } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("list"); // "list" | "form"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchProducts();
    }
  }, [user]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    setError("");

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/upload", formData, config);
      setImage(data.imagePath);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Image upload failed");
      setUploading(false);
    }
  };

  // Handle add / edit form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
      setError("Name, Price, and Image are required.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const productData = {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        rating: parseInt(rating),
      };

      if (editingId) {
        // Edit product
        await axios.put(`/products/${editingId}`, productData, config);
        setSuccess("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("/products", productData, config);
        setSuccess("Product created successfully!");
      }

      resetForm();
      fetchProducts();
      setActiveTab("list");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Operation failed.");
      setLoading(false);
    }
  };

  // Handle edit selection
  const handleEditSelect = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price.toString());
    setCategory(product.category || "");
    setRating(product.rating || 5);
    setImage(product.image);
    setActiveTab("form");
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    setError("");
    setSuccess("");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.delete(`/products/${id}`, config);
      setSuccess("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete product.");
    }
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setRating(5);
    setImage("");
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="bg-sand-50 min-h-[85vh] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-primary uppercase tracking-widest text-[10px] font-semibold">Administrator Space</span>
            <h2 className="text-3xl font-serif font-bold text-cocoa-900 mt-1">Admin Dashboard</h2>
            <div className="h-0.5 w-10 bg-primary mt-3"></div>
          </div>

          {/* Tab buttons */}
          <div className="flex space-x-2 border-b border-sand-200">
            <button
              onClick={() => {
                setActiveTab("list");
                resetForm();
                setError("");
                setSuccess("");
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "list"
                  ? "bg-cocoa-900 text-white"
                  : "bg-white border border-sand-200 text-cocoa-600 hover:bg-sand-100"
              }`}
            >
              <FaList /> <span>Manage Products</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("form");
                resetForm();
                setError("");
                setSuccess("");
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "form"
                  ? "bg-cocoa-900 text-white"
                  : "bg-white border border-sand-200 text-cocoa-600 hover:bg-sand-100"
              }`}
            >
              <FaPlus /> <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Feedback alerts */}
        {error && (
          <div className="bg-red-50 border-l-2 border-red-500 text-red-700 text-xs px-4 py-2.5 mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError("")}><FaTimes /></button>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-2 border-green-500 text-green-700 text-xs px-4 py-2.5 mb-6 flex justify-between items-center">
            <span>{success}</span>
            <button onClick={() => setSuccess("")}><FaTimes /></button>
          </div>
        )}

        {/* Stats Cards */}
        {activeTab === "list" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white border border-sand-200/80 p-6 shadow-sm">
              <span className="text-cocoa-600 text-xs font-semibold uppercase tracking-wider block">Total Products</span>
              <span className="text-3xl font-serif font-bold text-cocoa-900 block mt-2">{products.length}</span>
            </div>
            <div className="bg-white border border-sand-200/80 p-6 shadow-sm">
              <span className="text-cocoa-600 text-xs font-semibold uppercase tracking-wider block">Total Categories</span>
              <span className="text-3xl font-serif font-bold text-cocoa-900 block mt-2">
                {new Set(products.map((p) => p.category).filter(Boolean)).size}
              </span>
            </div>
            <div className="bg-white border border-sand-200/80 p-6 shadow-sm">
              <span className="text-cocoa-600 text-xs font-semibold uppercase tracking-wider block">Premium Items (+$25)</span>
              <span className="text-3xl font-serif font-bold text-cocoa-900 block mt-2">
                {products.filter((p) => p.price > 25).length}
              </span>
            </div>
          </div>
        )}

        {/* Tab 1: Products Table */}
        {activeTab === "list" && (
          <div className="bg-white border border-sand-200/80 shadow-sm overflow-hidden">
            {products.length === 0 ? (
              <p className="text-center py-12 text-cocoa-600 italic">No products found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-sand-100/60 border-b border-sand-200 text-cocoa-900 uppercase text-[10px] tracking-widest font-semibold">
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100 text-cocoa-600">
                    {products.map((prod) => (
                      <tr key={prod._id} className="hover:bg-sand-50/40 transition-colors">
                        <td className="px-6 py-4">
                          <img
                            src={`http://localhost:5000${prod.image}`}
                            alt={prod.name}
                            className="w-12 h-12 object-cover border border-sand-200/40"
                          />
                        </td>
                        <td className="px-6 py-4 font-serif font-bold text-cocoa-900 text-base">
                          {prod.name}
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary">
                          {prod.category || "Uncategorized"}
                        </td>
                        <td className="px-6 py-4 font-semibold text-cocoa-900">
                          ${prod.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {deletingId === prod._id ? (
                            <div className="inline-flex items-center space-x-2">
                              <span className="text-xs text-red-500 font-semibold">Delete?</span>
                              <button
                                onClick={() => {
                                  handleDeleteProduct(prod._id);
                                  setDeletingId(null);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white text-[10px] uppercase font-bold px-2.5 py-1.5 transition shadow-sm"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setDeletingId(null)}
                                className="bg-sand-100 hover:bg-sand-200 text-cocoa-900 border border-sand-200 text-[10px] uppercase font-bold px-2.5 py-1.5 transition"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditSelect(prod)}
                                className="inline-flex items-center justify-center p-2 text-cocoa-600 hover:text-primary hover:bg-sand-100 transition"
                                title="Edit Product"
                              >
                                <FaEdit className="text-sm" />
                              </button>
                              <button
                                onClick={() => setDeletingId(prod._id)}
                                className="inline-flex items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                                title="Delete Product"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Add / Edit Product Form */}
        {activeTab === "form" && (
          <div className="bg-white border border-sand-200/80 p-8 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-cocoa-900 pb-4 border-b border-sand-100 mb-6">
              {editingId ? "Edit Product Details" : "Create New Product"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Cleansing Face Wash"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-sand-200 focus:outline-none focus:border-primary text-sm transition-colors font-sans"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Cleansers, Serums, Hydrators"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-sand-200 focus:outline-none focus:border-primary text-sm transition-colors font-sans"
                  />
                </div>
              </div>

              {/* Price & Rating */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 24.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-sand-200 focus:outline-none focus:border-primary text-sm transition-colors font-sans"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Rating (1-5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-sand-200 focus:outline-none focus:border-primary text-sm transition-colors font-sans"
                  >
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>
                        {val} Stars
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Product Description</label>
                <textarea
                  placeholder="Details about product benefits, skin types, use instructions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-sand-200 focus:outline-none focus:border-primary text-sm transition-colors font-sans resize-none"
                />
              </div>

              {/* Image upload */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Product Image</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* File Selector */}
                  <label className="flex items-center justify-center space-x-2 bg-sand-100 hover:bg-sand-200 text-cocoa-900 border border-sand-200 px-5 py-3 cursor-pointer transition text-xs font-semibold uppercase tracking-wider">
                    <FaUpload /> <span>{uploading ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <span className="text-xs text-cocoa-600 text-center sm:text-left">or enter file path:</span>
                  <input
                    type="text"
                    placeholder="e.g. /uploads/image.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white border border-sand-200 focus:outline-none focus:border-primary text-sm transition-colors font-sans"
                  />
                </div>

                {/* Preview */}
                {image && (
                  <div className="mt-4 border border-sand-200 p-2 w-32 h-32 relative group">
                    <img
                      src={`http://localhost:5000${image}`}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTimes className="text-[10px]" />
                    </button>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-widest px-8 py-3.5 shadow-sm disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? "Saving..." : editingId ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("list");
                    resetForm();
                  }}
                  className="border border-cocoa-900/20 text-cocoa-900 hover:bg-sand-100 text-xs font-semibold uppercase tracking-widest px-8 py-3.5 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
