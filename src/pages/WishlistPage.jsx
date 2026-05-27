import React, { useContext } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  //cart

  const { cart, addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const added = addToCart(product);

    if (added) {
      removeFromWishlist(product.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative group"
          >
            {/* Static Remove button (Top Right) */}
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-gray-500"
            >
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
              <div className="mt-1 mb-4">
                <p className="text-lg font-bold text-gray-900">
                  ₹{item.offerPrice}
                </p>

                <p className="text-sm text-gray-500 line-through">
                  ₹{item.mrp}
                </p>

                <p className="text-sm text-green-600 font-medium">
                  {item.discount}% OFF
                </p>
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="w-full flex items-center justify-center bg-blue-50 text-blue-600 font-medium py-2 rounded-lg"
              >
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
