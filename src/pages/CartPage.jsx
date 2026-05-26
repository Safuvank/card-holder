import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "Premium Product 1",
    price: 899,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Premium Product 2",
    price: 979,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80",
  },
];

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 font-medium">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="p-2 text-gray-600">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-medium">{item.quantity}</span>
                  <button className="p-2 text-gray-600">
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <button className="text-red-500 p-2 bg-red-50 rounded-full">
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xl font-bold text-gray-900">Total: ₹2857</span>
          <Link
            to="/checkout"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
