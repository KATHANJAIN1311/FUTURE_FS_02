import React from 'react';
import { useApp } from '../context/AppContext';

function AdminDashboard({ onClose }) {
  const { state } = useApp();

  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = state.orders.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard - All Orders</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toFixed(0)}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Avg Order Value</h3>
            <p className="text-2xl font-bold text-purple-600">
              ₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0}
            </p>
          </div>
        </div>

        {state.orders.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {state.orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-600">Customer: {order.customerInfo.name}</p>
                    <p className="text-sm text-gray-600">Email: {order.customerInfo.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">₹{order.total.toFixed(0)}</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Items:</h4>
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-3 text-sm bg-white p-2 rounded">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity} × ₹{item.price} = ₹{(item.quantity * item.price).toFixed(0)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;