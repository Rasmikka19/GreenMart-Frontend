import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axios';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, search, setSearch }}>
      {children}
    </ProductContext.Provider>
  );
}