import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#002B25] text-white pt-24 pb-12  mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#58C191] rounded-2xl flex items-center justify-center rotate-3">
                <Leaf size={24} className="text-[#002B25]" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">
                Green<span className="text-[#58C191]">Mart</span>
              </h2>
            </div>
            <p className="text-white/50 text-lg leading-relaxed max-w-sm mb-10 font-medium">
              Your daily dose of <span className="text-white italic font-serif">freshness</span>, delivered with artisanal care and 15-minute precision.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#58C191] hover:text-[#002B25] transition-all duration-500">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3">
            <h3 className="text-[#58C191] font-black uppercase text-[10px] tracking-[0.3em] mb-10">Vault Navigation</h3>
            <ul className="space-y-5">
              {[
                { name: 'The Home', path: '/' },
                { name: 'Shop Products', path: '/products' },
                { name: 'My Selection', path: '/cart' },
                { name: 'Member Access', path: '/login' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/70 font-bold text-sm hover:text-[#58C191] flex items-center gap-2 group transition-all">
                    {link.name} 
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="md:col-span-4">
            <h3 className="text-[#58C191] font-black uppercase text-[10px] tracking-[0.3em] mb-10">Concierge</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#58C191] transition-colors">
                  <Mail size={16} className="group-hover:text-[#002B25]" />
                </div>
                <p className="text-sm font-bold tracking-tight">support@greenmart.com</p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#58C191] transition-colors">
                  <Phone size={16} className="group-hover:text-[#002B25]" />
                </div>
                <p className="text-sm font-bold tracking-tight">+91 98765 43210</p>
              </div>
            </div>
            <div className="mt-10 p-6 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
               <p className="text-[10px] font-black uppercase tracking-widest text-[#58C191]">Store Status</p>
               <p className="text-xs mt-2 font-bold text-white/80 leading-relaxed">London Flagship: Open until Midnight</p>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
            &copy; 2026 GreenMart — Curated Luxury Grocery.
          </p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-[#58C191]">Privacy</Link>
            <Link to="/" className="hover:text-[#58C191]">Terms</Link>
            <Link to="/" className="hover:text-[#58C191]">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;