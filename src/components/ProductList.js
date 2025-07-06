import React from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';

function ProductList({ onProductClick }) {
  const { state, dispatch } = useApp();

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(state.searchTerm.toLowerCase());
    const matchesCategory = state.selectedCategory === 'All' || product.category === state.selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={state.searchTerm}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={state.selectedCategory}
          onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;