import React from "react";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import Checkout from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <div>
      <Navbar />

      {/* Route Pages */}
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
