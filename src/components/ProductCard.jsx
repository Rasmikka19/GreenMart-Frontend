import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, Minus, ShoppingBag, Eye } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cart, updateQuantity } = useContext(CartContext);

  // check if item is already in cart
  const cartItem = cart.find((item) => item._id === product._id);

  // Handle image source (works if it's a string or an array)
  const productImage = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <div className="group relative bg-white rounded-[2.5rem] p-5 border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,43,37,0.12)] transition-all duration-500 overflow-hidden hover:-translate-y-2 flex flex-col h-full">
      
      {/*  IMAGE AREA */}
      <div className="relative h-56 w-full mb-6 bg-[#FAF9F6] rounded-[2rem] overflow-hidden flex-shrink-0">
        <Link to={`/product/${product._id}`} className="block h-full w-full">
          <img 
            src={productImage} 
            alt={product.name} 
            className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
        </Link>

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-[#002B25] text-[#58C191] text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] shadow-lg">
          {product.bestSeller ? 'Reserve' : 'New'}
        </span>

        {/* Floating Quick View Icon (EYE ICON) */}
        <Link 
            to={`/product/${product._id}`}
            className="absolute bottom-4 right-4 w-11 h-11 bg-white rounded-xl flex items-center justify-center text-[#002B25] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl z-20 hover:bg-[#58C191] hover:text-[#002B25]"
        >
            <Eye size={18} />
        </Link>
      </div>
      
      {/* PRODUCT INFO */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[#58C191] text-[10px] uppercase tracking-[0.3em] font-black">
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <Star size={8} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] text-gray-400 font-bold">4.0</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-black text-[#002B25] text-lg mb-3 truncate group-hover:text-[#58C191] transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* PRICE & ACTION AREA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#002B25] tracking-tighter leading-none">
              ₹{product.price}
            </span>
            <span className="text-[10px] text-gray-300 line-through mt-1 font-bold">
              ₹{product.oldPrice || product.price + 50}
            </span>
          </div>

          {/* QUANTITY CONTROL OR ADD BUTTON */}
          <div className="flex items-center">
            {cartItem ? (
              <div className="flex items-center bg-[#FAF9F6] rounded-2xl p-1 gap-1 border border-gray-100 shadow-inner">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(product._id, cartItem.qty - 1);
                  }}
                  className="w-9 h-9 flex items-center justify-center text-[#002B25] hover:bg-white rounded-xl transition-all"
                >
                  <Minus size={14} />
                </button>
                
                <span className="text-[#002B25] font-black text-xs min-w-[24px] text-center">
                  {cartItem.qty}
                </span>
                
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    updateQuantity(product._id, cartItem.qty + 1);
                  }}
                  className="w-9 h-9 flex items-center justify-center text-[#002B25] hover:bg-white rounded-xl transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="bg-[#002B25] text-white w-12 h-12 rounded-2xl hover:bg-[#58C191] hover:text-[#002B25] transition-all duration-500 shadow-lg shadow-[#002B25]/10 flex items-center justify-center group/btn active:scale-95"
              >
                <ShoppingBag size={18} className="group-hover/btn:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;