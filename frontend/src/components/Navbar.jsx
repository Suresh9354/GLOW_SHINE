import { useState, useContext, useEffect } from "react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaShoppingBag,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll to add shadow/opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "about", label: "About" },
    { id: "testimonials", label: "User Experience" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      // Wait for page load/navigation to finish, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-sand-50/80 backdrop-blur-lg shadow-sm border-b border-sand-200/40 py-2.5"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-2 text-xl font-serif font-bold tracking-widest text-cocoa-900 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <img src={logo} alt="Glow & Shine Logo" className="w-14 h-14 object-contain rounded-full" />
          <span className="hidden sm:inline">GLOW & SHINE</span>
          <span className="sm:hidden text-lg">GLOW & SHINE</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {location.pathname !== "/admin" &&
            sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.id)}
                className="text-cocoa-900/70 hover:text-primary font-sans font-medium tracking-widest text-[11px] uppercase transition-colors duration-200 cursor-pointer border-none bg-transparent"
              >
                {sec.label}
              </button>
            ))}
        </div>

        {/* Action Buttons & Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon */}
          {user && !user.isAdmin && (
            <div className="relative">
              <RouterLink to="/cart" className="text-cocoa-900 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-sand-100/30 block">
                <FaShoppingCart className="text-lg" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </RouterLink>
            </div>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              {user.isAdmin && (
                <RouterLink
                  to="/admin"
                  className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  Admin Dashboard
                </RouterLink>
              )}
              {user && !user.isAdmin && (
                <RouterLink
                  to="/orders"
                  className="flex items-center text-xs font-medium text-cocoa-900/80 hover:text-primary transition-colors"
                >
                  <FaShoppingBag className="mr-1 text-[10px] opacity-75" />
                  My Orders
                </RouterLink>
              )}
              <div className="flex items-center space-x-1 border-l border-sand-200 pl-3 h-4">
                <FaUserCircle className="text-lg text-primary/80" />
                <span className="text-xs font-medium text-cocoa-900/90">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-[10px] font-semibold uppercase tracking-wider text-cocoa-900/60 hover:text-cocoa-900 border border-cocoa-900/20 hover:border-cocoa-900 px-3 py-1 rounded-full transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <RouterLink
                to="/login"
                className="text-xs font-semibold uppercase tracking-wider text-cocoa-900/70 hover:text-primary transition-colors"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/register"
                className="text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-all shadow-sm active:scale-95"
              >
                Register
              </RouterLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center space-x-4">
          {user && !user.isAdmin && (
            <div className="relative mr-1">
              <RouterLink to="/cart" className="text-cocoa-900 hover:text-primary block p-1">
                <FaShoppingCart className="text-lg" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </RouterLink>
            </div>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-cocoa-900 hover:text-primary focus:outline-none p-1">
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-sand-50/95 backdrop-blur-xl border-b border-sand-200/50 shadow-inner px-6 py-6 space-y-4 transition-all duration-300">
          <div className="flex flex-col space-y-3">
            {location.pathname !== "/admin" &&
              sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleNavClick(sec.id)}
                  className="text-left text-sm font-semibold tracking-wider text-cocoa-900/80 hover:text-primary py-1 border-none bg-transparent uppercase"
                >
                  {sec.label}
                </button>
              ))}
          </div>

          <div className="pt-4 border-t border-sand-200 space-y-3">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 py-1">
                  <FaUserCircle className="text-xl text-primary/80" />
                  <span className="text-sm font-semibold text-cocoa-900">{user.name}</span>
                </div>
                {user.isAdmin && (
                  <RouterLink
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center text-sm font-semibold text-primary hover:text-primary-hover py-1"
                  >
                    Admin Dashboard
                  </RouterLink>
                )}
                {user && !user.isAdmin && (
                  <RouterLink
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center text-sm font-medium text-cocoa-900/90 hover:text-primary py-1"
                  >
                    <FaShoppingBag className="mr-2 opacity-75 text-xs" />
                    My Orders
                  </RouterLink>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-cocoa-900 hover:bg-cocoa-900/95 text-white py-2 rounded-full font-semibold transition active:scale-98"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <RouterLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center border border-cocoa-900/20 text-cocoa-900 py-2 rounded-full font-semibold hover:bg-sand-100/50 transition active:scale-98 text-xs uppercase tracking-wider"
                >
                  Login
                </RouterLink>
                <RouterLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-primary hover:bg-primary-hover text-white py-2 rounded-full font-semibold transition shadow-sm active:scale-98 text-xs uppercase tracking-wider"
                >
                  Register
                </RouterLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
