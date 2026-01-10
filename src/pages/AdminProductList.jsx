import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Trash2, Edit3, Package, Layers, IndianRupee, ExternalLink } from 'lucide-react';
import axios from '../utils/axios';
import Swal from 'sweetalert2';

const AdminProductList = () => {
  const { products, fetchProducts } = useContext(ProductContext);

  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: '<span style="font-family: sans-serif; font-weight: 900; letter-spacing: -0.05em;">REMOVE FROM VAULT?</span>',
      text: "This artisan item will be permanently delisted from the collection.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#002B25',
      cancelButtonColor: '#FAF9F6',
      confirmButtonText: 'CONFIRM REMOVAL',
      cancelButtonText: 'CANCEL',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-black text-[10px] tracking-widest uppercase py-4 px-8',
        cancelButton: 'rounded-xl font-black text-[10px] tracking-widest uppercase py-4 px-8 text-[#002B25]'
      }
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/product/remove/${id}`);
        Swal.fire({
          title: 'REMOVED',
          text: 'The catalog has been updated.',
          icon: 'success',
          confirmButtonColor: '#002B25'
        });
        fetchProducts(); 
      } catch (err) {
        Swal.fire('ERROR', 'System security prevented the removal.', 'error');
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-4">Inventory Management</p>
          <h2 className="text-5xl font-black text-[#002B25] tracking-tighter uppercase leading-none">Artisan <span className="text-[#58C191]">Catalog</span></h2>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <Package size={16} className="text-[#58C191]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#002B25]">{products.length} Items Listed</span>
        </div>
      </div>

      {/* PRODUCT TABLE CONTAINER */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-[#002B25]/5 overflow-hidden border border-gray-50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100">
                <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Preview</th>
                <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Artisan Details</th>
                <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Classification</th>
                <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Valuation</th>
                <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Curation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((item) => (
                <tr key={item._id} className="group hover:bg-[#FAF9F6]/50 transition-all duration-300">
                  {/* IMAGE */}
                  <td className="px-8 py-6">
                    <div className="relative w-16 h-16 bg-white rounded-2xl p-2 border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                        <img src={item.image[0] || item.image} className="w-full h-full object-contain" alt={item.name} />
                    </div>
                  </td>

                  {/* NAME */}
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest mb-1">ID: {item._id.slice(-6)}</span>
                        <span className="text-base font-black text-[#002B25] tracking-tight group-hover:text-[#58C191] transition-colors">{item.name}</span>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                        <Layers size={14} className="text-gray-300" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.category}</span>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1 font-black text-[#002B25] text-lg">
                        <span className="text-[#58C191] text-xs">₹</span>
                        <span>{item.price}</span>
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 bg-white text-gray-400 hover:text-[#002B25] hover:shadow-md rounded-xl transition-all border border-transparent hover:border-gray-100">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(item._id)} 
                        className="p-3 bg-white text-gray-400 hover:text-red-500 hover:shadow-md rounded-xl transition-all border border-transparent hover:border-gray-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                <Package size={40} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">The vault is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;