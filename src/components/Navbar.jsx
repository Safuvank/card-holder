import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  CreditCard,
  LayoutGrid,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm shrink-0 z-50 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Static Logo Link - Routes to home/products */}
          <Link
            to="/"
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <CreditCard className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              CardHolder
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile screens */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <LayoutGrid size={18} className="mr-1.5" />
              Products
            </Link>

            <Link
              to="/cart"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart size={18} className="mr-1.5" />
              Cart
            </Link>
            
            <Link
              to="/wishlist"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Heart size={18} className="mr-1.5" />
              Wishlist
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button - Hidden on desktop screens */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none p-2 bg-gray-50 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50 transition-all">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <LayoutGrid size={20} className="mr-3 text-gray-500" />
              Products
            </Link>
            <Link
              to="/cart"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <ShoppingCart size={20} className="mr-3 text-gray-500" />
              Cart
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Heart size={20} className="mr-3 text-gray-500" />
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
