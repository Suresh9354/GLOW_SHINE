import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  return (
    <footer className="bg-cocoa-900 text-sand-50 py-16 px-6 border-t border-cocoa-900/10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">
        {/* Brand Column */}
        <div className="sm:col-span-2 md:col-span-5 space-y-4">
          <h2 className="text-xl font-serif font-bold tracking-widest text-white">
            GLOW & SHINE
          </h2>
          <p className="text-sand-200/60 text-xs sm:text-sm max-w-sm leading-relaxed font-light">
            Crafting premium skincare products to nourish, restore, and rejuvenate your skin's natural radiance.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-sans font-semibold text-[11px] uppercase tracking-widest text-white/40">Explore</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li>
              <button
                onClick={() => handleNavClick("home")}
                className="hover:text-primary transition-colors text-sand-200/70 hover:text-white cursor-pointer border-none bg-transparent p-0 text-left font-normal"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("products")}
                className="hover:text-primary transition-colors text-sand-200/70 hover:text-white cursor-pointer border-none bg-transparent p-0 text-left font-normal"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("about")}
                className="hover:text-primary transition-colors text-sand-200/70 hover:text-white cursor-pointer border-none bg-transparent p-0 text-left font-normal"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("contact")}
                className="hover:text-primary transition-colors text-sand-200/70 hover:text-white cursor-pointer border-none bg-transparent p-0 text-left font-normal"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Social Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-sans font-semibold text-[11px] uppercase tracking-widest text-white/40">Connect</h4>
          <p className="text-sand-200/60 text-xs sm:text-sm leading-relaxed font-light max-w-sm">
            Follow our journey on social media for recommendations, releases, and skin tips.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="bg-white/5 hover:bg-primary text-white p-2.5 rounded-full transition-all duration-200 active:scale-95"
            >
              <FaFacebookF className="text-xs" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="bg-white/5 hover:bg-primary text-white p-2.5 rounded-full transition-all duration-200 active:scale-95"
            >
              <FaInstagram className="text-xs" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="bg-white/5 hover:bg-primary text-white p-2.5 rounded-full transition-all duration-200 active:scale-95"
            >
              <FaTwitter className="text-xs" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="bg-white/5 hover:bg-primary text-white p-2.5 rounded-full transition-all duration-200 active:scale-95"
            >
              <FaLinkedinIn className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-sand-200/40 font-medium space-y-4 sm:space-y-0">
        <p>© {new Date().getFullYear()} Glow & Shine. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
