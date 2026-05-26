import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";

const wishlistItems = [
  {
    id: 3,
    name: "Premium Product 3",
    price: 1059,
    image:
      "https://plus.unsplash.com/premium_vector-1728014382605-964cef4b201a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JlZGl0JTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Premium Product 4",
    price: 1139,
    image:
      "https://plus.unsplash.com/premium_vector-1728014382605-964cef4b201a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JlZGl0JTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function WishlistPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative group"
          >
            {/* Static Remove button (Top Right) */}
            <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-gray-500">
              <Trash2 size={18} />
            </button>

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-md font-semibold text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="text-lg font-bold text-gray-900 mt-1 mb-4">
                ₹{item.price}
              </p>

              <button className="w-full flex items-center justify-center bg-blue-50 text-blue-600 font-medium py-2 rounded-lg">
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
