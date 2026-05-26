import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddToCart = (product) => {
    const alreadyExists = cart.find((item) => item.id === product.id);

    if (alreadyExists) {
      alert("Product already in cart");
      return;
    }

    setCart([...cart, product]);

    alert("Product added to cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Static Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none bg-gray-50"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>

              {/* Pricing details */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.offerPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.mrp}
                </span>
                <span className="text-sm font-medium text-green-600">
                  {product.discount}% OFF
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <Link
                  to="/checkout"
                  state={{ product }}
                  className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg text-center"
                >
                  Buy Now
                </Link>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center bg-gray-100 text-gray-800 font-medium py-2 rounded-lg"
                  >
                    <ShoppingCart size={18} className="mr-2" /> Add To Cart
                  </button>
                  <button className="flex items-center justify-center bg-red-50 text-red-500 font-medium p-2 w-12 rounded-lg">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
