import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setCurrentUser({ token }); 
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  //  LOGOUT LOGIC
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('grocery_cart'); // Manually clear the cart storage
    setCurrentUser(null);
   
    window.location.href = '/login'; 
  };

  const value = {
    currentUser,
    logout,
    loading,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};