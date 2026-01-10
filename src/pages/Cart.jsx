import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus, ShieldCheck, Truck, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, updateQuantity } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 flex flex-col items-center justify-center text-center px-6">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm border border-gray-100">
            <ShoppingBag size={48} className="text-[#002B25]/10" />
        </div>
        <h2 className="text-4xl font-black text-[#002B25] tracking-tighter uppercase mb-4">Your Vault is Empty</h2>
        <p className="text-gray-400 font-medium max-w-xs mb-10">No artisan groceries have been secured in your collection yet.</p>
        <Link to="/" className="bg-[#002B25] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#58C191] hover:text-[#002B25] transition-all">
          Explore the Market
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
                <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-4">Review Your Collection</p>
                <h1 className="text-6xl font-black text-[#002B25] tracking-tighter uppercase leading-none">The Vault</h1>
            </div>
            <div className="flex items-center gap-4 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                <span className="w-8 h-[2px] bg-[#58C191]"></span>
                {cart.length} Artisan Items
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* LEFT SIDE: PRODUCT LIST */}
          <div className="lg:w-2/3 space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="group bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-xl hover:shadow-[#002B25]/5">
                {/* IMAGE */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#FAF9F6] rounded-[1.5rem] flex-shrink-0 p-4 group-hover:scale-105 transition-transform duration-500">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>

                {/* INFO */}
                <div className="flex-grow text-center md:text-left">
                  <span className="text-[#58C191] font-black text-[8px] uppercase tracking-[0.3em] mb-2 block">{item.category}</span>
                  <h3 className="font-black text-[#002B25] text-2xl uppercase tracking-tighter mb-2">{item.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-center md:justify-start gap-2">
                    <ShieldCheck size={12} className="text-[#58C191]" /> Quality Assured
                  </p>
                  
                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center justify-center md:justify-start bg-[#FAF9F6] rounded-full w-fit p-1 mx-auto md:mx-0">
                    <button 
                      onClick={() => updateQuantity(item._id, item.qty - 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#002B25] hover:bg-white rounded-full transition-all shadow-sm active:scale-90"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                    <span className="px-6 font-black text-[#002B25] text-sm">{item.qty}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.qty + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#002B25] hover:bg-white rounded-full transition-all shadow-sm active:scale-90"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                {/* PRICE & REMOVE */}
                <div className="flex flex-row md:flex-col items-center justify-between md:justify-center md:items-end gap-10 w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Subtotal</p>
                    <p className="font-black text-[#002B25] text-2xl tracking-tighter">₹{item.price * item.qty}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <Link to="/" className="inline-flex items-center gap-4 text-[#002B25] font-black text-[10px] uppercase tracking-[0.3em] mt-8 group">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#002B25] group-hover:text-white transition-all">
                <ArrowLeft size={14} />
              </div>
              <span>Return to Market</span>
            </Link>
          </div>

          {/* RIGHT SIDE:  SUMMARY */}
          <div className="lg:w-1/3">
            <div className="bg-[#002B25] text-white rounded-[2.5rem] p-10 sticky top-32 shadow-2xl shadow-[#002B25]/20">
              <div className="flex items-center gap-4 mb-10">
                <Receipt className="text-[#58C191]" size={24} />
                <h2 className="text-2xl font-black uppercase tracking-tighter">Investment</h2>
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <span>Gross Total</span>
                  <span className="text-white text-lg">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <span>Vault Delivery</span>
                  <span className="text-[#58C191]">Complimentary</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <span>Service Tax (2%)</span>
                  <span className="text-white">₹{tax.toFixed(0)}</span>
                </div>
                
                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#58C191] mb-2">Grand Total</p>
                    <p className="text-5xl font-black tracking-tighter">₹{total.toFixed(0)}</p>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="block w-full bg-[#58C191] text-[#002B25] text-center py-6 rounded-2xl font-black uppercase text-[12px] tracking-[0.3em] hover:bg-white transition-all shadow-lg shadow-[#58C191]/10 active:scale-95">
                Secure Order
              </Link>

              {/* TRUST BADGE */}
              <div className="mt-8 flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Truck size={18} className="text-[#58C191]" />
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                  Guaranteed Freshness & Cold-Chain delivery within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;