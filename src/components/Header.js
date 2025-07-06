import React from 'react';
import { useApp } from '../context/AppContext';

function Header({ onCartClick, onLoginClick }) {
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">SHRIJI</h1>
          
          <div className="flex items-center space-x-4">
            {state.userType === 'owner' && (
              <button
                onClick={() => window.adminDashboard && window.adminDashboard()}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Owner Panel
              </button>
            )}
            
            {state.userType === 'customer' && (
              <button
                onClick={onCartClick}
                className="relative bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
              >
                Cart ({state.cart.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            )}
            
            {state.user ? (
              <div className="flex items-center space-x-2">
                <span>Hi, {state.user.name} ({state.userType})</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;