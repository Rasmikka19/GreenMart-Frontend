import React, { useState, useEffect, useContext } from 'react';
import axios from '../utils/axios';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../context/ProductContext';
import { LayoutGrid, Leaf, ShoppingBasket, Wind, Snowflake, Coffee, Croissant, Wheat } from 'lucide-react';

const ProductListing = () => {
  const { loading, search } = useContext(ProductContext); 
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      // 2. Use the instance. Just provide the endpoint, not the full URL.
      // This will automatically use 'https://greenmart-backend-ttoh.onrender.com/api/product/list'
      const res = await axios.get('/product/list'); 
      
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchProducts();
}, []);

  // Categories To Shop By
  const categories = [
    { name: 'All', icon: <LayoutGrid size={16} /> },
    { name: 'Vegetables', icon: <Leaf size={16} /> },
    { name: 'Fruits', icon: <ShoppingBasket size={16} /> },
    { name: 'Dairy', icon: <Wind size={16} /> },
    { name: 'Ice Cream', icon: <Snowflake size={16} /> },
    { name: 'Cold Drinks', icon: <Coffee size={16} /> },
    { name: 'Bakery', icon: <Croissant size={16} /> },
    { name: 'Grains', icon: <Wheat size={16} /> },
  ];

  // Filter Products By This
  const filteredProducts = products.filter(p => 
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  //Loding If Products Gets Delayed
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#FAF9F6]">
       <p className="font-black uppercase tracking-[0.4em] text-[#002B25]/20 animate-pulse text-sm">
         Preparing the Harvest...
       </p>
    </div>
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-40 lg:pt-28 pb-24">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <p className="text-[#58C191] font-black text-[10px] uppercase tracking-[0.5em] mb-4">
            The GreenMart Collection
          </p>
          <h1 className="text-3xl md:text-6xl font-black text-[#002B25] tracking-tighter leading-none mb-6">
            {search ? "SEARCH RESULTS" : "THE VAULT"}
          </h1>
          <p className="text-gray-400 font-medium text-lg leading-relaxed">
            {search 
              ? `Displaying the freshest results for "${search}" found in our organic reserves.`
              : "Hand-selected, artisan-grade groceries sourced directly from local ethical farms. Freshness, secured in our boutique vault."
            }
          </p>
        </div>

        {/* CATEGORY FILTER (BENTO STYLE) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 ${
                category === cat.name 
                ? 'bg-[#002B25] text-white border-[#002B25] shadow-xl shadow-[#002B25]/20 scale-105' 
                : 'bg-white text-[#002B25] border-transparent hover:border-gray-200 shadow-sm'
              }`}
            >
              <span className={category === cat.name ? "text-[#58C191]" : "text-gray-400"}>
                {cat.icon}
              </span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-32 border-2 border-dashed border-gray-200 rounded-[4rem]">
              <p className="font-black uppercase tracking-widest text-gray-300 text-xs mb-2">No Items Found</p>
              <h4 className="text-[#002B25] font-black text-2xl tracking-tighter">The vault is quiet.</h4>
              <button 
                onClick={() => {setCategory('All'); window.location.reload();}}
                className="mt-6 text-[#58C191] font-black uppercase tracking-widest text-[9px] underline"
              >
                Reset Market View
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;