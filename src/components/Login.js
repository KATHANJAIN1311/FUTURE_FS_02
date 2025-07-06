import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Login({ onClose }) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'customer'
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if owner login
    const isOwner = formData.email === 'owner@shriji.com' && formData.password === 'owner123';
    
    const user = {
      id: Date.now(),
      name: isOwner ? 'Owner' : formData.email.split('@')[0],
      email: formData.email
    };
    
    dispatch({ 
      type: 'LOGIN', 
      payload: { 
        user, 
        userType: isOwner ? 'owner' : 'customer' 
      }
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isSignup ? 'Sign Up' : 'Login'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="font-medium text-blue-800 mb-1">Demo Credentials:</p>
            <p className="text-blue-600">Owner: owner@shriji.com / owner123</p>
            <p className="text-blue-600">Customer: Any email / Any password</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;