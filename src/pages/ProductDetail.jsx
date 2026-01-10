import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
// 1. CHANGE THIS IMPORT to use your custom instance
import axios from '../utils/axios'; 
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ShieldCheck, Truck, ArrowLeft, Minus, Plus, Leaf } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { addToCart, cart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 2. REMOVE the localhost URL. Just use the endpoint.
        // This now calls: https://greenmart-backend-ttoh.onrender.com/api/product/${id}
        const res = await axios.get(`/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Vault Fetch Error:", err);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // Check if this specific grocery item is already in the user's vault
  const cartItem = cart?.find((item) => item._id === id);

  if (!product) return (
    <div className="h-screen flex items-center justify-center bg-[#FAF9F6] font-black uppercase tracking-widest text-[#002B25]/20">
      Inspecting Freshness...
    </div>
  );

  return (
    <div className="pt-28  bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-12 hover:text-[#58C191] transition-colors text-[#002B25]">
          <ArrowLeft size={14} /> Back to Market
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* IMAGE SECTION */}
          <div className="aspect-square bg-white rounded-[4rem] overflow-hidden border border-gray-100 flex items-center justify-center p-12">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>

          {/* CONTENT SECTION */}
          <div>
            <span className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
                {product.category} — Harvested Fresh
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#002B25] tracking-tighter mb-8 uppercase leading-tight">
                {product.name}
            </h1>
            <p className="text-4xl font-black text-[#002B25] mb-8 italic">₹{product.price}</p>
            <p className="text-gray-500 font-medium leading-relaxed mb-12 text-lg border-l-4 border-[#58C191] pl-6">
                {product.description}
            </p>

            {/* INTERACTIVE ACTION AREA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {cartItem ? (
                /* SHOW THIS ONLY IF ITEM IS IN VAULT */
                <div className="flex items-center justify-between bg-white border-2 border-[#58C191] rounded-full px-8 py-5 w-full sm:w-64 shadow-md transition-all animate-in fade-in zoom-in duration-300">
                  <button 
                    onClick={() => updateQuantity(product._id, cartItem.qty - 1)}
                    className="text-[#002B25] hover:text-[#58C191] transition-colors"
                  >
                    <Minus size={20} strokeWidth={3} />
                  </button>
                  
                  <div className="flex flex-col items-center">
                    <span className="font-black text-[#002B25] text-xl leading-none">{cartItem.qty}</span>
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest mt-1">Units</span>
                  </div>

                  <button 
                    onClick={() => updateQuantity(product._id, cartItem.qty + 1)}
                    className="text-[#002B25] hover:text-[#58C191] transition-colors"
                  >
                    <Plus size={20} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                /* SHOW THIS INITIALLY */
                <button 
                  onClick={() => addToCart(product, 1)} 
                  className="flex-grow bg-[#002B25] text-white rounded-full py-6 px-12 font-black uppercase text-[12px] tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#58C191] hover:text-[#002B25] transition-all shadow-xl shadow-[#002B25]/20 active:scale-95"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>
              )}
            </div>

            {/* GROCERY BADGES */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-white rounded-[2.5rem] border border-gray-100 flex items-center gap-4">
                  <Leaf className="text-[#58C191]" size={20} />
                  <p className="text-[10px] font-black uppercase text-[#002B25]">Artisan Quality</p>
               </div>
               <div className="p-6 bg-white rounded-[2.5rem] border border-gray-100 flex items-center gap-4">
                  <Truck className="text-[#58C191]" size={20} />
                  <p className="text-[10px] font-black uppercase text-[#002B25]">Cold-Chain Delivery</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;