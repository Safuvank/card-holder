import React, { useContext } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.offerPrice * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cart.length > 0 ? (
            cart.map((item) => (
              <li
                key={item.id}
                className="p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4"
              >
                {/* Product Info */}
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

                    <p className="text-gray-600 font-medium">
                      ₹{item.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      className="p-2 text-gray-600 cursor-pointer"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="px-4 font-medium">
                      {item.quantity || 1}
                    </span>

                    <button
                      className="p-2 text-gray-600 cursor-pointer"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 p-2 bg-red-50 rounded-full cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500">Cart is empty</div>
          )}
        </ul>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xl font-bold text-gray-900">
            Total: ₹{totalPrice}
          </span>

          <Link
            to="/checkout"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
