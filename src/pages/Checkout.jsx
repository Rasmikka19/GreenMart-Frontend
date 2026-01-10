import React, { useContext, useState } from 'react';
import axios from '../utils/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { ShieldCheck, MapPin, CreditCard, Lock, ArrowLeft, PackageCheck, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState({ street: '', city: '', pincode: '' });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!address.street || !address.city || !address.pincode) {
      return Swal.fire({
        title: '<span style="font-family: sans-serif; font-weight: 900;">DESTINATION REQUIRED</span>',
        text: 'Please specify the artisan dispatch coordinates.',
        icon: 'warning',
        confirmButtonColor: '#002B25',
        customClass: { popup: 'rounded-[2rem]' }
      });
    }

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      return Swal.fire({
        title: '<span style="font-family: sans-serif; font-weight: 900;">GATEWAY OFFLINE</span>',
        text: 'The secure payment infrastructure could not be initialized.',
        icon: 'error',
        confirmButtonColor: '#002B25',
        customClass: { popup: 'rounded-[2rem]' }
      });
    }

    try {
      // 2% Vault Service Fee
      const amount = Math.round((getCartTotal() * 1.02)); 
      
      const { data } = await axios.post('/order/create', { 
        amount, 
        items: cart,
        address 
      });

      const options = {
        key: "rzp_test_Rzj8IQ1OMfKFtO", 
        amount: data.amount,
        currency: data.currency,
        name: "GREENMART VAULT",
        description: "Artisan Shipment Protocol",
        order_id: data.id,
        handler: async (response) => {
          const verifyRes = await axios.post('/order/verify', response);
          if (verifyRes.data.success) {
            Swal.fire({
              title: 'DISPATCH SECURED',
              text: 'Your artisan collection is now in transit.',
              icon: 'success',
              confirmButtonColor: '#58C191',
              customClass: { popup: 'rounded-[2rem]' }
            });
            clearCart();
            navigate('/');
          }
        },
        prefill: {
          email: currentUser?.email || "",
          name: currentUser?.name || "Artisan Member"
        },
        theme: { color: "#002B25" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: '<span style="font-family: sans-serif; font-weight: 900; letter-spacing: -0.05em;">PROTOCOL INTERRUPTED</span>',
        html: '<p style="font-size: 14px; color: #666;">Vault security or a network anomaly has paused the transaction. Please verify your credentials.</p>',
        icon: 'error',
        confirmButtonColor: '#002B25',
        confirmButtonText: 'ACKNOWLEDGE',
        customClass: {
          popup: 'rounded-[2rem] border-2 border-red-50',
          confirmButton: 'rounded-xl font-black text-[10px] tracking-widest uppercase py-4 px-8',
        }
      });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#FAF9F6] min-h-screen animate-in fade-in duration-1000">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-16">
            <Link to="/cart" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#002B25]">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#002B25] group-hover:text-white transition-all">
                    <ArrowLeft size={14} />
                </div>
                Return to Collection
            </Link>
            <div className="hidden md:flex items-center gap-3">
                <Globe size={14} className="text-[#58C191]" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Secured Node: India</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: DISPATCH ADDRESS FORM */}
          <div className="lg:col-span-7">
            <div className="mb-12">
                <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-4">Logistics</p>
                <h2 className="text-5xl font-black text-[#002B25] tracking-tighter uppercase leading-none">Shipping <span className="text-[#58C191]">Vault</span></h2>
            </div>

            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#FAF9F6] rounded-2xl flex items-center justify-center text-[#002B25]">
                    <MapPin size={22} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#002B25]">Artisan Destination</h3>
              </div>

              <div className="space-y-6">
                <div className="relative group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-6 top-4 group-focus-within:text-[#58C191] transition-colors">Street Residence</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 7th Heaven Estate" 
                    className="w-full pt-10 pb-4 px-6 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/10 focus:bg-white transition-all font-bold text-[#002B25]"
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-6 top-4 group-focus-within:text-[#58C191] transition-colors">City</label>
                    <input 
                      type="text" 
                      placeholder="Mumbai" 
                      className="w-full pt-10 pb-4 px-6 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/10 focus:bg-white transition-all font-bold text-[#002B25]"
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                    />
                  </div>
                  <div className="relative group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-6 top-4 group-focus-within:text-[#58C191] transition-colors">Pincode</label>
                    <input 
                      type="text" 
                      placeholder="400001" 
                      className="w-full pt-10 pb-4 px-6 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/10 focus:bg-white transition-all font-bold text-[#002B25]"
                      onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Secure Info Box */}
              <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex items-start gap-4 p-6 bg-[#FAF9F6] rounded-[2rem]">
                    <ShieldCheck size={20} className="text-[#58C191] mt-1" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#002B25]">Cold-Chain Logistics</p>
                        <p className="text-[9px] text-gray-400 font-medium leading-relaxed mt-1">Every order is temperature-mapped and tracked via secure transit protocols.</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INVESTMENT SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-[#002B25] p-10 md:p-12 rounded-[3.5rem] text-white sticky top-32 shadow-2xl shadow-[#002B25]/20">
              <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[#58C191]">Valuation</h3>
                <PackageCheck size={20} className="text-white/20" />
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Market Value</span>
                    <span className="font-bold text-lg">₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Vault Curation (2%)</span>
                    <span className="font-bold text-lg text-[#58C191]">₹{(getCartTotal() * 0.02).toFixed(0)}</span>
                </div>
                
                <div className="pt-8 mt-4 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#58C191] mb-2">Total Investment</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black tracking-tighter">₹{(getCartTotal() * 1.02).toFixed(0)}</span>
                        <span className="text-[10px] text-white/30 font-black uppercase">INR</span>
                    </div>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className="w-full bg-[#58C191] text-[#002B25] py-7 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-white transition-all shadow-xl shadow-black/20 group active:scale-95"
              >
                <CreditCard size={18} /> 
                Authorize Dispatch
              </button>

              <div className="mt-8 flex items-center justify-center gap-3 text-white/20">
                <Lock size={12} />
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">Razorpay Encrypted Infrastructure</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;