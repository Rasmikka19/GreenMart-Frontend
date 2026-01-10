import React from 'react';
import { PlusCircle, List, ShoppingCart, LayoutDashboard, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ showSidebar, setShowSidebar }) => {
  const location = useLocation();
  const menuItems = [
    { name: 'Add Product', path: '/admin/add', icon: <PlusCircle size={20} /> },
    { name: 'Product List', path: '/admin/list', icon: <List size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop: Dims the screen when sidebar is open */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:top-20 top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-100 p-6 flex flex-col transition-transform duration-300 lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#58C191] rounded-lg flex items-center justify-center text-white">
              <LayoutDashboard size={18} />
            </div>
            <h2 className="text-xl font-bold text-[#00473E]">Admin Panel</h2>
          </div>
          
          {/* Close button - Only shows on mobile view */}
          <button onClick={() => setShowSidebar(false)} className="lg:hidden text-gray-400">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setShowSidebar(false)} // Closes sidebar when link is clicked
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                location.pathname === item.path 
                ? 'bg-[#E6F5F0] text-[#58C191]' 
                : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;