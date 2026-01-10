import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import { Leaf, HelpCircle, ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        Swal.fire({
          title: 'AUTHORIZATION GRANTED',
          text: 'Welcome to the Management Vault.',
          icon: 'success',
          confirmButtonColor: '#002B25'
        });
        navigate('/admin/add'); 
      }
    } catch (err) {
      Swal.fire({
        title: 'ACCESS DENIED',
        text: err.response?.data?.message || 'Unauthorized Protocol',
        icon: 'error',
        confirmButtonColor: '#002B25'
      });
    }
  };

  const handleSupportClick = () => {
    Swal.fire({
      title: '<span style="font-family: sans-serif; font-weight: 900; letter-spacing: -0.05em;">CONCIERGE SUPPORT</span>',
      html: `
        <div style="text-align: left; font-family: sans-serif; padding: 10px;">
          <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em; color: #58C191; font-weight: 900; margin-bottom: 15px;">Seller Assistance</p>
          <p style="font-size: 14px; color: #002B25; font-weight: 600; margin-bottom: 20px;">For urgent access issues regarding the artisan collection, please contact dispatch control.</p>
          <div style="background: #F9F9F9; padding: 20px; border-radius: 20px;">
            <p style="margin-bottom: 8px; font-size: 12px;"><strong>Direct:</strong> support@greenmartvault.com</p>
            <p style="font-size: 12px;"><strong>Priority:</strong> +1 (800) 555-0199</p>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      
      {/* TOP BAR */}
      <nav className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-12 fixed top-0 w-full z-50">
        <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
                    <div className="bg-green-100 p-1.5 rounded-xl">
                      <Leaf size={24} className="text-[#58C191]" />
                    </div>
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-[#00473E]">
                      Green<span className="text-[#58C191]">Mart</span>
                    </span>
                  </Link>

        <button 
          onClick={handleSupportClick}
          className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white text-[#002B25] hover:bg-[#FAF9F6] transition-all border border-gray-100 font-black text-[10px] uppercase tracking-widest shadow-sm"
        >
          <HelpCircle size={14} className="text-[#58C191]" />
          <span>Help/Support</span>
        </button>
      </nav>

      {/* MAIN LOGIN CONTENT */}
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <div className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-2xl shadow-[#002B25]/5 w-full max-w-lg border border-gray-50 text-center relative overflow-hidden">
          
          {/* DECORATIVE ELEMENT */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#58C191]/5 rounded-bl-[5rem] -mr-8 -mt-8"></div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] rounded-full mb-8">
            <ShieldCheck size={14} className="text-[#58C191]" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#002B25]">Secure Management Terminal</span>
          </div>

          <h2 className="text-4xl font-black text-[#002B25] mb-10 tracking-tighter uppercase leading-none">
            Vault <span className="text-[#58C191]">Control</span>
          </h2>
          
          <form onSubmit={handleAdminLogin} className="space-y-6 text-left">
            <div className="group">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Personnel Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full p-5 pl-12 bg-[#FAF9F6] border-2 border-transparent rounded-2xl outline-none focus:border-[#58C191]/20 focus:bg-white transition-all font-bold text-[#002B25] placeholder:text-gray-200" 
                  placeholder="admin@greenmart.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>

            <div className="group">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Security Protocol (Password)</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full p-5 pl-12 bg-[#FAF9F6] border-2 border-transparent rounded-2xl outline-none focus:border-[#58C191]/20 focus:bg-white transition-all font-bold text-[#002B25] placeholder:text-gray-200" 
                  placeholder="••••••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#002B25] text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#58C191] transition-all shadow-xl shadow-[#002B25]/20 group active:scale-95"
            >
              Verify & Enter
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <p className="mt-10 text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em] leading-relaxed">
            Authorized Personnel Only. <br/> All actions within the vault are logged.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;