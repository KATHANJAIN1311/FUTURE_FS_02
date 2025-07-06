import React from 'react';
import { useApp } from '../context/AppContext';

function OrderHistory({ onClose }) {
  const { state } = useApp();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {state.orders.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {state.orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{order.total.toFixed(0)}</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-3 text-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
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

export default OrderHistory;