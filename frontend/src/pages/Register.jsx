import React, { useState, useContext } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("/users/register", {
        name,
        email,
        password,
      });
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-sand-50 py-16 px-6">
      <div className="bg-white border border-sand-200/50 p-8 w-full max-w-md rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-semibold">Join Glow & Shine</span>
          <h2 className="text-3xl font-serif font-bold text-cocoa-900 mt-1">
            Create Account
          </h2>
          <div className="h-0.5 w-12 bg-primary mx-auto mt-3"></div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-2 border-red-500 text-red-700 text-xs px-4 py-2.5 mb-6 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Full Name</label>
            <div className="flex items-center border border-sand-200 rounded-xl px-3.5 py-3 bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <FaUser className="text-sand-200 mr-3 text-sm" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full outline-none text-sm font-sans bg-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Email Address</label>
            <div className="flex items-center border border-sand-200 rounded-xl px-3.5 py-3 bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <FaEnvelope className="text-sand-200 mr-3 text-sm" />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full outline-none text-sm font-sans bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Password</label>
            <div className="flex items-center border border-sand-200 rounded-xl px-3.5 py-3 bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <FaLock className="text-sand-200 mr-3 text-sm" />
              <input
                type="password"
                placeholder="Create password"
                className="w-full outline-none text-sm font-sans bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-semibold transition-all duration-200 uppercase text-xs tracking-wider shadow-sm mt-2 active:scale-97 cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="text-center text-xs text-cocoa-600 mt-6 border-t border-sand-100 pt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary-hover font-semibold underline underline-offset-4 pl-1">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
