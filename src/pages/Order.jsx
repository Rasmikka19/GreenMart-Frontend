import React, { useEffect, useState, useContext } from 'react';
import axios from '../utils/axios';
import { Package, Truck, CheckCircle } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/order/userorders');
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-4">History</p>
          <h2 className="text-5xl font-black text-[#002B25] tracking-tighter uppercase">My <span className="text-[#58C191]">Orders</span></h2>
        </div>

        <div className="space-y-6">
          {orders.length > 0 ? orders.map((order, index) => (
            <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#FAF9F6] rounded-2xl flex items-center justify-center text-[#002B25]">
                  <Package size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID: {order._id}</p>
                  <p className="text-xl font-black text-[#002B25]">₹{order.amount}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#58C191] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#002B25]">In Transit</span>
                </div>
                <button className="px-8 py-3 bg-[#002B25] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#58C191] transition-colors">
                  Track Order
                </button>
              </div>
            </div>
          )) : (
            <div className="text-center py-20">
              <p className="text-gray-400 uppercase tracking-widest font-black text-xs">No orders found in the vault.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;