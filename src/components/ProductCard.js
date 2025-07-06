import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function ProductCard({ product, onProductClick }) {
  const { dispatch } = useApp();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <>
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    
    {showNotification && (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        Added to cart! 🛒
      </div>
    )}
    </>
  );
}

export default ProductCard;