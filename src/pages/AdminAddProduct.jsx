import React, { useState } from 'react';
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import { PackagePlus, Image as ImageIcon, Tag, IndianRupee, Layers, Info, Star } from 'lucide-react';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    image: '', 
    category: 'Vegetables',
    subCategory: '',
    bestSeller: false,
    countInStock: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        subCategory: formData.subCategory,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : Number(formData.price),
        countInStock: Number(formData.countInStock),
        image: [formData.image], 
        bestSeller: formData.bestSeller,
      };

      const response = await axios.post('/product/add', productData);
      
      if (response.status === 201 || response.data.success) {
        Swal.fire({
          title: 'COLLECTION UPDATED',
          text: 'The artisan product has been successfully cataloged.',
          icon: 'success',
          confirmButtonColor: '#002B25'
        });
        setFormData({
          name: '', description: '', price: '', oldPrice: '',
          image: '', category: 'Vegetables', subCategory: '',
          bestSeller: false, countInStock: ''
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'CATALOGING FAILED',
        text: err.response?.data?.message || 'Protocol Error',
        icon: 'error',
        confirmButtonColor: '#002B25'
      });
    }
  };

  return (
    <div className="max-w-5xl animate-in fade-in duration-700">
      <div className="mb-12">
        <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-4">Management Portal</p>
        <h2 className="text-5xl font-black text-[#002B25] tracking-tighter uppercase leading-none">Catalog New <span className="text-[#58C191]">Harvest</span></h2>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-[#002B25]/5 border border-gray-50 space-y-12">
        
        {/*  IDENTITY */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Tag size={18} className="text-[#58C191]" />
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Product Identity</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10">Artisan Name</label>
              <input type="text" required value={formData.name}
                className="w-full pt-8 pb-4 px-4 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25]"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Organic Hass Avocado" />
            </div>
            <div className="relative group">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10">Vault Category</label>
              <select className="w-full pt-8 pb-4 px-4 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25] appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Ice Cream">Ice Cream</option>
                <option value="Cold Drinks">Cold Drinks</option>
                <option value="Instant Food">Instant Food</option>
                <option value="Bakery">Bakery & Breads</option>
                <option value="Grains">Grains & Cereals</option>
              </select>
            </div>
          </div>
        </div>

        {/*  DESCRIPTION */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Info size={18} className="text-[#58C191]" />
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Provenance & Details</h3>
          </div>
          <div className="relative">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10">Artisan Description</label>
            <textarea required value={formData.description}
              className="w-full pt-10 pb-4 px-4 bg-[#FAF9F6] rounded-3xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25] h-32 resize-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the aromatic profile and freshness..."></textarea>
          </div>
        </div>

        {/*  VALUATION & INVENTORY */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <IndianRupee size={18} className="text-[#58C191]" />
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Valuation & Reserves</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10">Vault Price (₹)</label>
              <input type="number" required value={formData.price}
                className="w-full pt-8 pb-4 px-4 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25]"
                onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="relative">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10">Market MRP (₹)</label>
              <input type="number" value={formData.oldPrice}
                className="w-full pt-8 pb-4 px-4 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25]"
                onChange={(e) => setFormData({...formData, oldPrice: e.target.value})} />
            </div>
            <div className="relative">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10">Available Reserve</label>
              <input type="number" required value={formData.countInStock}
                className="w-full pt-8 pb-4 px-4 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25]"
                onChange={(e) => setFormData({...formData, countInStock: e.target.value})} />
            </div>
          </div>
        </div>

        {/*  ASSETS & TAGGING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <ImageIcon size={18} className="text-[#58C191]" />
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Visual Asset</h3>
            </div>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-[3.2rem] z-10">Image URL</label>
            <input type="text" required value={formData.image}
              className="w-full pt-12 pb-4 px-4 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25]"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="Secure CDN link..." />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Layers size={18} className="text-[#58C191]" />
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Refinement</h3>
            </div>
            <div className="relative">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute left-4 top-3 z-10">Sub-Category</label>
                <input type="text" value={formData.subCategory}
                className="w-full pt-8 pb-4 px-4 bg-[#FAF9F6] rounded-2xl outline-none border-2 border-transparent focus:border-[#58C191]/20 transition-all font-bold text-[#002B25]"
                onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                placeholder="e.g. Exotic Imports" />
            </div>
          </div>
        </div>

        {/* BEST SELLER TOGGLE */}
        {/* BEST SELLER TOGGLE */}
<div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-[2rem] border border-gray-100/50 hover:border-[#58C191]/30 transition-colors">
  <label className="relative flex items-center cursor-pointer gap-4 w-full">
    {/* Hidden Checkbox */}
    <input 
      type="checkbox" 
      id="bestseller" 
      checked={formData.bestSeller}
      className="sr-only peer"
      onChange={(e) => setFormData({...formData, bestSeller: e.target.checked})} 
    />
    
    {/* Visual Toggle Switch */}
    <div className="relative w-14 h-8 bg-gray-200 rounded-full peer 
      peer-focus:ring-4 peer-focus:ring-[#58C191]/10 
      peer-checked:bg-[#002B25] 
      after:content-[''] after:absolute after:top-[4px] after:left-[4px] 
      after:bg-white after:rounded-full after:h-6 after:w-6 
      after:transition-all after:duration-300
      peer-checked:after:translate-x-6">
    </div>

    {/* Label Text */}
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-widest text-[#002B25] flex items-center gap-2">
        <Star 
          size={12} 
          className={formData.bestSeller ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
        />
        Reserve Choice
      </span>
      <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
        Promote to Best Seller Status
      </span>
    </div>
  </label>
</div>

        <button type="submit" className="w-full bg-[#002B25] text-white py-6 rounded-2xl font-black uppercase text-[12px] tracking-[0.4em] shadow-2xl shadow-[#002B25]/20 hover:bg-[#58C191] transition-all flex items-center justify-center gap-4 group active:scale-95">
          <PackagePlus size={20} className="group-hover:rotate-12 transition-transform" />
          Authorize Dispatch to Shop
        </button>

      </form>
    </div>
  );
};

export default AdminAddProduct;