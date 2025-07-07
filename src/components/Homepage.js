import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';

function Homepage({ onProductClick, onViewAllProducts }) {
  const { dispatch } = useApp();
  const scrollRef = useRef(null);

  // Featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollIndex = 0;
    const cardWidth = 288 + 24; // w-72 (288px) + gap (24px)

    const autoScroll = () => {
      scrollIndex = (scrollIndex + 1) % featuredProducts.length;
      scrollContainer.scrollTo({
        left: scrollIndex * cardWidth,
        behavior: 'smooth'
      });
    };

    const interval = setInterval(autoScroll, 3000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <div className="text-white py-16" style={{backgroundColor: 'rgb(14, 33, 72)'}}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to SHRIJI</h1>
          <p className="text-xl mb-8">Discover amazing products for your home and lifestyle</p>
          <button
            onClick={onViewAllProducts}
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Offers Section */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 py-6 border-t-4 border-blue-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚚</span>
              <span className="font-semibold text-blue-800">Free Delivery on orders above ₹999</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <span className="font-semibold text-blue-800">Up to 50% OFF on Home Items</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="font-semibold text-blue-800">Same Day Delivery Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Featured Products</h2>
          <p className="text-slate-600">Handpicked items just for you</p>
        </div>

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide mb-8" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="flex space-x-6 pb-4" style={{scrollSnapType: 'x mandatory'}}>
            {featuredProducts.map(product => (
              <div key={product.id} className="flex-none w-72" style={{scrollSnapAlign: 'start'}}>
                <ProductCard product={product} onProductClick={onProductClick} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onViewAllProducts}
            className="text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:opacity-90" style={{backgroundColor: 'rgb(14, 33, 72)'}}
          >
            View All Products ({products.length})
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-b from-slate-50 to-blue-50 py-12 border-t-4 border-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-200 to-indigo-200 p-6 rounded-xl text-center hover:from-blue-300 hover:to-indigo-300 transition-colors cursor-pointer shadow-lg border-2 border-blue-300">
              <span className="text-4xl mb-4 block">📱</span>
              <h3 className="text-xl font-bold mb-2 text-blue-900">Electronics</h3>
              <p className="text-blue-700">Latest gadgets and tech accessories</p>
            </div>
            <div className="bg-gradient-to-br from-slate-200 to-gray-200 p-6 rounded-xl text-center hover:from-slate-300 hover:to-gray-300 transition-colors cursor-pointer shadow-lg border-2 border-slate-300">
              <span className="text-4xl mb-4 block">🏠</span>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Home</h3>
              <p className="text-slate-700">Beautiful items for your living space</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-200 to-purple-200 p-6 rounded-xl text-center hover:from-indigo-300 hover:to-purple-300 transition-colors cursor-pointer shadow-lg border-2 border-indigo-300">
              <span className="text-4xl mb-4 block">👜</span>
              <h3 className="text-xl font-bold mb-2 text-indigo-900">Accessories</h3>
              <p className="text-indigo-700">Stylish accessories for everyday use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;