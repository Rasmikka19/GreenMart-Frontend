import React, { useState, useContext } from 'react';
import axios from '../utils/axios'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, User, ArrowRight, Leaf } from 'lucide-react';

const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('/auth/login', { email, password });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setCurrentUser({ token: response.data.token });
          // User Login
          Swal.fire({
            title: 'ACCESS GRANTED',
            text: 'Welcome to the GreenMart Reserves.',
            icon: 'success',
            confirmButtonColor: '#002B25',
          });
          navigate('/'); 
        }
      } else {
        const response = await axios.post('/auth/register', { name, email, password });
        if (response.data) {
          // User Register 
          Swal.fire({
            title: 'MEMBERSHIP SECURED',
            text: 'Your vault access is ready. Please login.',
            icon: 'success',
            confirmButtonColor: '#002B25',
          });
          setPassword(''); 
          setIsLogin(true); 
        }
      }
    } catch (err) {
      // Not The User
      Swal.fire({
        title: 'SECURITY ALERT',
        text: err.response?.data?.message || "Credentials not recognized.",
        icon: 'error',
        confirmButtonColor: '#002B25',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-6 py-20">
      <div className="w-full max-w-lg bg-white p-12 md:p-16 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-[#002B25]/5 text-center">
        
        {/* LOGO & BADGE */}
        <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-16 bg-[#FAF9F6] rounded-3xl flex items-center justify-center text-[#58C191] mb-6 rotate-3">
                <Leaf size={32} />
            </div>
            <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-2">Exclusive Entry</p>
            <h2 className="text-4xl font-black text-[#002B25] tracking-tighter uppercase leading-none">
              {isLogin ? 'Vault Access' : 'Join the Reserve'}
            </h2>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-6 text-left">
          {/* NAME FIELD (SIGNUP ONLY) */}
          {!isLogin && (
            <div className="relative group">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10 transition-colors group-focus-within:text-[#58C191]">Full Name</label>
              <div className="relative">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="E.g. Alexander Green"
                    className="w-full pt-8 pb-4 px-12 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25] placeholder:text-gray-200" 
                />
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>
          )}

          {/* EMAIL FIELD */}
          <div className="relative group">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10 transition-colors group-focus-within:text-[#58C191]">Email Address</label>
            <div className="relative">
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="name@vault.com"
                    className="w-full pt-8 pb-4 px-12 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25] placeholder:text-gray-200" 
                />
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div className="relative group">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10 transition-colors group-focus-within:text-[#58C191]">Access Code</label>
            <div className="relative">
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    placeholder="••••••••"
                    className="w-full pt-8 pb-4 px-12 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25] placeholder:text-gray-200" 
                />
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#002B25] text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#58C191] transition-all shadow-xl shadow-[#002B25]/20 group active:scale-95"
          >
            {isLogin ? 'Enter Vault' : 'Secure Membership'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              {isLogin ? "New to the reserve?" : "Already a member?"}
            </p>
            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-[#002B25] font-black uppercase text-[10px] tracking-widest hover:text-[#58C191] transition-colors underline underline-offset-8"
            >
              {isLogin ? 'Create Membership' : 'Log into Vault'}
            </button>
        </div>

        {/* SECURITY FOOTER */}
        <div className="mt-12 flex items-center justify-center gap-3 text-gray-300">
            <ShieldCheck size={14} />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Secure Artisan Network</span>
        </div>
      </div>
    </div>
  );
};

export default Login;