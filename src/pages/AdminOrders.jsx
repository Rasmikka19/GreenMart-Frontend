import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Package, MapPin, CreditCard, Calendar, ChevronRight, Search } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/order/list');
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching vault orders", error);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-4">Operations Center</p>
          <h2 className="text-5xl font-black text-[#002B25] tracking-tighter uppercase leading-none">Dispatch <span className="text-[#58C191]">Logs</span></h2>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#58C191] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search Vault ID..." 
            className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#58C191]/5 transition-all text-sm font-bold text-[#002B25] w-full md:w-64"
          />
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-gray-200">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No active dispatches found in the vault.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#002B25]/5 transition-all duration-500 flex flex-col lg:flex-row items-center gap-10">
              
              {/* ORDER STATUS & ID */}
              <div className="flex flex-col items-center lg:items-start gap-4 min-w-[180px]">
                <div className={`px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] ${getStatusColor(order.status)}`}>
                  {order.status || 'Processing'}
                </div>
                <div className="text-center lg:text-left">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Manifest ID</p>
                    <h3 className="font-black text-[#002B25] text-lg uppercase">#{order._id.slice(-8)}</h3>
                </div>
              </div>

              {/* ITEM PREVIEW */}
              <div className="flex-1 border-y lg:border-y-0 lg:border-x border-gray-50 px-0 lg:px-10 py-6 lg:py-0 w-full">
                <div className="flex items-center gap-3 mb-4">
                    <Package size={16} className="text-[#58C191]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Secured</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {order.items.map((i, idx) => (
                        <span key={idx} className="bg-[#FAF9F6] px-4 py-2 rounded-xl text-[11px] font-bold text-[#002B25] border border-gray-100">
                            {i.name} <span className="text-[#58C191] ml-1">×{i.qty}</span>
                        </span>
                    ))}
                </div>
              </div>

              {/* LOGISTICS & VALUATION */}
              <div className="flex flex-col md:flex-row lg:flex-col gap-8 w-full lg:w-auto min-w-[220px]">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FAF9F6] rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0">
                        <MapPin size={18} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-[#002B25] uppercase tracking-widest">{order.address.city}</p>
                        <p className="text-[10px] font-medium text-gray-400 leading-tight mt-1">{order.address.street}, {order.address.pincode}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between lg:justify-start gap-6 border-t lg:border-t-0 pt-6 lg:pt-0">
                    <div>
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Total Valuation</p>
                        <p className="text-3xl font-black text-[#002B25] tracking-tighter">₹{order.amount}</p>
                    </div>
                    <button className="w-12 h-12 bg-[#002B25] text-white rounded-2xl flex items-center justify-center hover:bg-[#58C191] transition-all group/btn shadow-lg shadow-[#002B25]/10">
                        <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* FOOTER  */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#002B25] p-8 rounded-[2rem] text-white">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#58C191] mb-2">Total Volume</p>
            <p className="text-3xl font-black">{orders.length} Active Shipments</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;