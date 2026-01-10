import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, LayoutDashboard, Leaf } from 'lucide-react'; 
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { currentUser, logout } = useContext(AuthContext);
  const { search, setSearch } = useContext(ProductContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  // Mobile search visible only on Home and Products
  const showMobileSearch = location.pathname === "/" || location.pathname === "/products";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-2 md:px-10 pt-4">
        <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          
          {/* Logo Section - Text & Icon */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="bg-green-100 p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Leaf size={24} className="text-[#58C191]" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-[#00473E]">
              Green<span className="text-[#58C191]">Mart</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-2 bg-gray-100/50 p-1 rounded-full">
            <Link to="/" className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-green-600">Home</Link>
            <Link to="/products" className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-green-600">All Products</Link>
          </div>

          {/* Action Group */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* --- DESKTOP SEARCH BAR --- */}
            <div className="hidden md:flex items-center relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="bg-transparent border-b border-gray-200 py-1 px-2 w-32 focus:w-48 transition-all outline-none text-sm"
              />
              <Search className="text-gray-400" size={18} />
            </div>

            <Link to="/cart" className="relative p-2 hover:bg-green-50 rounded-full transition-colors">
              <ShoppingCart size={22} className="text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#58C191] text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {!currentUser ? (
              <Link to="/login" className="hidden sm:flex items-center space-x-2 bg-[#00473E] text-white px-5 py-2 rounded-xl hover:bg-[#58C191] transition-all text-sm font-semibold">
                <User size={16} />
                <span>Login</span>
              </Link>
            ) : (
              <button onClick={logout} className="hidden sm:block text-sm text-red-500 font-medium ml-2">Logout</button>
            )}

            <button 
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE SEARCH BAR  --- */}
        {showMobileSearch && (
          <div className="md:hidden mt-3 px-2">
            <div className="relative bg-white shadow-md rounded-xl overflow-hidden border border-green-50">
              <input 
                type="text" 
                placeholder="Search for vegetables, fruits..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="w-full py-3 px-4 text-sm outline-none bg-transparent"
              />
              <div className="absolute right-3 top-2.5 bg-[#58C191] p-1.5 rounded-lg text-white">
                <Search size={16} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        
        <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white shadow-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            {/* Sidebar Logo */}
            <div className="flex items-center space-x-2">
              <Leaf size={20} className="text-[#58C191]" />
              <span className="font-bold text-[#00473E]">GreenMart</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex flex-col space-y-6">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-lg font-semibold text-gray-800">
              <span className="w-1 h-6 bg-[#58C191] rounded-full"></span>
              <span>Home</span>
            </Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-lg font-semibold text-gray-800">
              <span className="w-1 h-6 bg-transparent"></span>
              <span>All Products</span>
            </Link>
            <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-lg font-semibold text-gray-800">
              <span className="w-1 h-6 bg-transparent"></span>
              <div className="flex items-center gap-2 text-[#00473E]"><LayoutDashboard size={20}/> Seller Panel</div>
            </Link>
          </div>

          <div className="mt-auto pb-10">
            {!currentUser ? (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 bg-[#58C191] text-white w-full py-4 rounded-2xl font-bold">
                <User size={20} />
                <span>Login / Register</span>
              </Link>
            ) : (
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full py-4 border-2 border-red-100 text-red-500 rounded-2xl font-bold">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;