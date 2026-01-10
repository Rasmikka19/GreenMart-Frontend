import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; 

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useContext(AuthContext); // Get user status
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('grocery_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  // If the user logs out, the cart state reset to empty
  useEffect(() => {
    if (!currentUser) {
      setCart([]);
      localStorage.removeItem('grocery_cart');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('grocery_cart', JSON.stringify(cart));
  }, [cart]);

  //  Rest of your existing functions (addToCart, updateQuantity, etc.)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item._id === product._id);
      if (isItemInCart) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}