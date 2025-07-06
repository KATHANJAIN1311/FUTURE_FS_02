import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import OrderHistory from './components/OrderHistory';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const { state } = useApp();
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Make admin function globally accessible
  window.adminDashboard = () => setShowAdmin(true);

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleBuyNow = () => {
    setShowProductDetail(false);
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setShowCart(true)}
        onLoginClick={() => setShowLogin(true)}
      />
      
      {/* Customer Navigation */}
      {state.userType === 'customer' && (
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-2">
            <button
              onClick={() => setShowOrders(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View My Orders
            </button>
          </div>
        </div>
      )}

      {/* Owner Navigation */}
      {state.userType === 'owner' && (
        <div className="bg-purple-50 shadow-sm border-b">
          <div className="container mx-auto px-4 py-2">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAdmin(true)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                View All Orders
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-purple-600 font-medium">
                Total Orders: {state.orders.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Show products only for customers or non-logged users */}
      {(state.userType === 'customer' || !state.user) && (
        <ProductList onProductClick={handleProductClick} />
      )}

      {/* Owner Dashboard View */}
      {state.userType === 'owner' && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total Orders</h3>
                <p className="text-2xl font-bold text-blue-600">{state.orders.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Total Revenue</h3>
                <p className="text-2xl font-bold text-green-600">
                  ₹{state.orders.reduce((sum, order) => sum + order.total, 0).toFixed(0)}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Completed Orders</h3>
                <p className="text-2xl font-bold text-purple-600">{state.orders.length}</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowAdmin(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                View Detailed Orders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {orderSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Order placed successfully! 🎉
        </div>
      )}

      {/* Customer Modals */}
      {state.userType === 'customer' && showProductDetail && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setShowProductDetail(false)}
          onBuyNow={handleBuyNow}
        />
      )}

      {state.userType === 'customer' && showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {state.userType === 'customer' && showCheckout && (
        <Checkout
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}

      {state.userType === 'customer' && showOrders && (
        <OrderHistory onClose={() => setShowOrders(false)} />
      )}

      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;