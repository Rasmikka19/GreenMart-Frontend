import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Percent,
  ArrowRight,
  Zap,
  Gift,
  UtensilsCrossed,
  ShieldCheck,
  Globe,
  Flame,
  Sparkles,
  Plus,
  Mail
} from "lucide-react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, loading, search } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  /* ---------------------------------- DATA ---------------------------------- */
  const categories = [
    { name: "Organic Vegetables", color: "bg-[#E8F5E9]", img: "https://cdn-icons-png.flaticon.com/512/2329/2329865.png" },
    { name: "Fresh Fruits", color: "bg-[#FCE4EC]", img: "https://cdn-icons-png.flaticon.com/512/3194/3194591.png" },
    { name: "Cold Drinks", color: "bg-[#FFF8E1]", img: "https://cdn-icons-png.flaticon.com/512/2405/2405479.png" },
    { name: "Instant Food", color: "bg-[#E0F2F1]", img: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png" },
    { name: "Dairy Products", color: "bg-[#FFF3E0]", img: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png" },
    { name: "Bakery & Breads", color: "bg-[#E3F2FD]", img: "https://cdn-icons-png.flaticon.com/512/3014/3014502.png" },
    { name: "Ice Cream", color: "bg-[#F3E5F5]", img: "https://cdn-icons-png.flaticon.com/512/938/938063.png" },
    { name: "Grains & Cereals", color: "bg-[#FFEBEE]", img: "https://cdn-icons-png.flaticon.com/512/2674/2674638.png" }
  ];

  // To get products images by index from  context 
  const getProducts = (indexes) => indexes.map(i => products[i]).filter(Boolean);

  // Filter products for the category section
  const categoryProducts = products.filter(item => {
    if (!selectedCategory) return false;
    const btnName = selectedCategory.toLowerCase();
    const dbCat = item.category.toLowerCase();
    return btnName.includes(dbCat) || dbCat.includes(btnName);
  });

  return (
    <div className="pt-20 bg-[#FAF9F6] text-[#002B25] overflow-x-hidden font-sans">
      
      {/* OFFER TAG MOVING */}
      <div className="bg-[#002B25] py-4 mt-20 lg:mt-5 md:mt-5 top-0 z-[100] overflow-hidden border-b border-white/10">
        <div className="flex animate-marquee-slow whitespace-nowrap text-white text-[10px] tracking-[0.4em] uppercase font-black">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-12 flex items-center gap-3">
              <Percent size={14} className="text-[#58C191]" />
              Flash Deal: Use <span className="text-[#58C191]">GREEN50</span> for 50% Off • Farm Fresh Today • 15-Min Delivery
              <Sparkles size={14} className="text-yellow-400" />
            </span>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#001A16]">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          alt="Hero"
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-[#58C191] font-black tracking-[0.6em] mb-6 block text-xs uppercase animate-pulse">The Artisan Collection</span>
          <h1 className="text-white text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.8] mb-12 drop-shadow-2xl">
            GROCERIES <br /> <span className="italic font-serif font-light text-[#58C191]">Redefined.</span>
          </h1>
          <Link to="/products" className="group bg-white text-black px-16 py-6 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-[#58C191] hover:text-white transition-all duration-500 flex items-center gap-4 mx-auto w-fit">
            Enter The Vault <Plus className="group-hover:rotate-90 transition-transform" />
          </Link>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section className="py-10 px-6 container mx-auto">
        <div className="flex items-center justify-between gap-6 mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic whitespace-nowrap">Shop by <span className="text-[#58C191]">Category</span></h2>
          <div className="flex-grow h-[1px] bg-gray-200"></div>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory('')} className="text-[10px] font-black text-red-500 uppercase tracking-widest border-b-2 border-red-500 hover:text-red-700 transition-colors">
              Clear Category
            </button>
          )}
        </div>
        <div className="p-5 flex gap-7 overflow-x-auto pb-12 no-scrollbar snap-x">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex-shrink-0 w-40 h-56 ${cat.color} rounded-[3rem] flex flex-col items-center justify-center cursor-pointer transition-all snap-start border-4 ${selectedCategory === cat.name ? 'border-[#002B25] scale-105 shadow-2xl' : 'border-transparent hover:shadow-xl'} group`}
            >
              <div className="w-24 h-24 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm p-4 overflow-hidden group-hover:rotate-6 transition-transform">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain" />
              </div>
              <p className="text-[#00473E] font-black text-center text-[10px] uppercase tracking-widest px-2">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY RESULTS (BY CLICKING ON IT SHOWS THOSE RELATED THINGS) */}
      {selectedCategory && (
        <section className="container mx-auto px-6 py-10 bg-[#f0f9f6] rounded-[4rem] mb-5 animate-fade-in border border-[#58C191]/20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-[#00473E] tracking-tighter uppercase italic">{selectedCategory} <span className="text-[#58C191]"></span></h2>
              <p className="text-gray-500 font-medium">Curated items from our {selectedCategory.toLowerCase()} collection.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryProducts.length > 0 ? (
              categoryProducts.map((item) => <ProductCard key={item._id} product={item} />)
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400 italic font-medium">Inventory arriving soon for this vault...</div>
            )}
          </div>
        </section>
      )}

      {/* REORDERING SECTION */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#002B25] tracking-tighter uppercase">Most <span className="text-[#58C191]">Reordered</span></h2>
            <p className="text-gray-400 font-medium">Trusted by households every single week.</p>
          </div>
          <Link to="/products" className="text-[#58C191] font-black text-xs uppercase tracking-widest border-b-2 border-[#58C191]">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"> 
          {getProducts([9, 3, 16, 22]).map(p => (
            <div key={p._id} className="hover:scale-[1.02] transition-transform">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* KITCHEN CURATED SECTION */}
      <section className="bg-[#002B25] text-white py-10 rounded-[6rem] mx-4 md:mx-10 shadow-3xl">
        <div className="container mx-auto px-6 text-center">
          <UtensilsCrossed size={64} className="text-[#58C191] mx-auto mb-10 animate-bounce-slow" />
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">
            Curated For <br /> <span className="italic font-serif font-light text-[#58C191]">Your Kitchen</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-20 text-lg">Chef-approved selections • Small batch harvests • Audited Quality</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {getProducts([23, 21, 19, 17, 14, 7, 6, 5]).map(p => (
              <div key={p._id} className="bg-white/5 p-4 rounded-[3.5rem] border border-white/5 hover:bg-white/10 transition-all">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY’S STOCK-UP ZONE */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#002B25] tracking-tighter uppercase">Stock-Up <span className="text-[#58C191]">Zone</span></h2>
            <p className="text-gray-400 font-medium">Bulk choices for the prepared pantry.</p>
          </div>
          <Link to="/products" className="text-[#58C191] font-black text-xs uppercase tracking-widest border-b-2 border-[#58C191]">View All</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {getProducts([0, 4, 6, 11]).map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      {/* BENTO BOX GRID (OFFERS/DISCOUNTS) */}
      <section className="container mx-auto px-6 py-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[300px]">
          <div className="md:col-span-7 bg-[#002B25] rounded-[4rem] p-16 flex items-center justify-between group overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <span className="text-[#58C191] font-black text-[10px] uppercase tracking-widest mb-4 block flex items-center gap-2"><Flame size={14} /> Trending Zone</span>
              <h3 className="text-white text-5xl font-black tracking-tighter uppercase leading-none mb-10">Fresh Morning <br /> Arrivals</h3>
              <Link to="/products" className="bg-[#58C191] text-[#002B25] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest">Shop Zone</Link>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/3014/3014502.png" className="w-56 h-56 object-contain opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700" alt="Icon" />
          </div>
          <div className="md:col-span-5 bg-[#F4FAF8] rounded-[4rem] p-16 flex flex-col justify-center relative overflow-hidden group border border-[#58C191]/20">
            <Percent size={200} className="absolute -right-20 -bottom-20 text-[#002B25]/5 group-hover:rotate-12 transition-transform duration-1000" />
            <h3 className="text-[#002B25] text-5xl font-black tracking-tighter mb-8 relative z-10 leading-none uppercase">Get 20% <br /> <span className="text-[#58C191]">Vault</span> <br /> Access.</h3>
            <button className="bg-[#002B25] text-white w-fit px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest">Join Club</button>
          </div>
        </div>
      </section>

      {/* 15-MINUTE MADNESS */}
      <section className="container mx-auto px-6 py-24 bg-white rounded-[5rem] border border-gray-50 shadow-sm">
        <div className="flex items-center gap-6 mb-20">
          <div className="w-16 h-16 bg-[#58C191] rounded-full flex items-center justify-center text-[#002B25] shadow-lg"><Zap size={28}/></div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic whitespace-nowrap">15-Minute <span className="text-[#58C191]">Madness</span></h2>
          <p className="text-gray-400 font-medium">Need it now? We're already on our way. We value your time.</p>
          <div className="flex-grow h-[1px] bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {getProducts([7, 8, 12, 14, 20, 22, 25, 26]).map((product, idx) => (
            <div key={product._id} className={`p-4 bg-[#FAF9F6] rounded-[4rem] hover:shadow-2xl transition-all border border-gray-100 ${idx % 2 !== 0 ? 'md:translate-y-16' : ''}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION SECTION */}
      <section className="container mx-auto px-6 py-10">
        <div className="relative bg-[#002B25] rounded-[5rem] p-16 md:p-24 overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#58C191] opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="z-10 md:w-1/2">
            <h2 className="text-white text-6xl font-black tracking-tighter leading-tight mb-6 uppercase">Join the <br /> <span className="text-[#58C191] italic font-serif">Wellness Club</span></h2>
            <p className="text-white/50 font-medium mb-10 max-w-sm uppercase text-xs tracking-widest">Receive secret drops and midnight bakery alerts directly in your inbox.</p>
            <div className="flex bg-white/5 backdrop-blur-xl rounded-full p-2 border border-white/10 shadow-2xl max-w-md">
              <input type="email" placeholder="YOUR EMAIL" className="bg-transparent px-8 py-5 outline-none text-white placeholder:text-white/30 flex-grow font-black text-[10px] tracking-widest" />
              <button className="bg-[#58C191] text-[#002B25] px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Invite Me</button>
            </div>
          </div>
          <div className="hidden md:flex md:w-1/3 relative justify-center">
            <div className="w-64 h-80 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 rotate-6 flex flex-col justify-center items-center shadow-2xl">
              <Mail size={80} className="text-[#58C191] mb-6 animate-pulse" />
              <p className="text-white font-black text-2xl uppercase tracking-tighter">Secret Drop</p>
              <p className="text-[#58C191] font-black uppercase text-[10px] tracking-widest mt-2">Coming This Friday</p>
            </div>
          </div>
        </div>
      </section>

      {/* ELITE FEATURES */}
      <section className="container mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-16 border-t border-gray-100">
        {[
          { icon: Zap, title: "Velocity", desc: "15-min delivery" },
          { icon: ShieldCheck, title: "Purity", desc: "Organic Audited" },
          { icon: Globe, title: "Roots", desc: "Global Sourcing" },
          { icon: Gift, title: "Privilege", desc: "Member Gifts" }
        ].map((f, i) => (
          <div key={i} className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-white shadow-xl rounded-[2.5rem] flex items-center justify-center text-[#58C191] mb-6 group-hover:bg-[#002B25] group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700">
              <f.icon size={28} />
            </div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-[#002B25] mb-2">{f.title}</h4>
            <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">{f.desc}</p>
          </div>
        ))}
      </section>


     {/* THESE ARE THE STYLES USED IN */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } 
        .animate-marquee-slow { animation: marquee 30s linear infinite; }
        .animate-bounce-slow { animation: bounce 5s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(-7%); } 50% { transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>

    </div>
  );
};

export default Home;