import React, { useState } from 'react'; 
import { Outlet, useNavigate, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { Leaf, Menu } from 'lucide-react'; 

const AdminDashboard = ({ setAdminToken }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false); //  mobile view

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    if (setAdminToken) {
      setAdminToken('');
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="h-20 bg-white border-b flex items-center justify-between px-6 md:px-10 fixed top-0 w-full z-30">
        <div className="flex items-center gap-3">
          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setShowSidebar(true)} 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="bg-green-100 p-1.5 rounded-xl">
              <Leaf size={24} className="text-[#58C191]" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-[#00473E]">
              Green<span className="text-[#58C191]">Mart</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-500 hidden sm:block">Hi! Admin</span>
          <button
            onClick={handleLogout}
            className="bg-[#58C191] text-white px-5 py-2 rounded-full font-bold text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex pt-20">
        {/* Sidebar */}
        <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {/* Main Content Area  */}
        <div className="flex-1 lg:ml-64 p-4 md:p-8 transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;