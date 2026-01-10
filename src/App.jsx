import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; 
import AdminAddProduct from './pages/AdminAddProduct';
import AdminProductList from './pages/AdminProductList';
import AdminOrders from './pages/AdminOrders';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- CUSTOMER FACING SITE --- */}
        {/* We use a wildcard (*) path for the main site so the Footer/Navbar don't show on Admin pages */}
        <Route path="*" element={
          <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
            <Navbar />
            <main className="flex-grow"> 
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path='/orders' element={<Order />} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                
              </Routes>
            </main>
            <Footer />
          </div>
        } />

        {/* --- ADMIN PANEL --- */}
        
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* AdminDashboard acts as the Layout (it has the sidebar and top bar) */}
        <Route path="/admin" element={<AdminDashboard />}>
          {/* Redirect /admin to /admin/add automatically */}
          <Route index element={<Navigate to="add" replace />} />
          <Route path="add" element={<AdminAddProduct />} />
          <Route path="list" element={<AdminProductList />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;