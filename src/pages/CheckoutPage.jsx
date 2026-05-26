import React from "react";
import {
  ShoppingBag,
  Tag,
  CreditCard,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useLocation } from "react-router-dom";


export default function CheckoutPage() {
  const location = useLocation();

  const product = location.state?.product;
  console.log(product);

  const cartItems = product
    ? [
        {
          ...product,
          quantity: 1,
        },
      ]
    : [];

  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.mrp * item.quantity,
    0,
  );

  const finalPayable = cartItems.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0,
  );

  const totalOffers = totalMRP - finalPayable;

  const offerPercentage =
    totalMRP > 0 ? Math.round((totalOffers / totalMRP) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingBag className="mr-3 text-blue-600" size={32} /> Secure Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Product Breakdown & Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Product Listing Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Product Listing ({cartItems.length} Items)
            </h3>

            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="py-4 flex items-start space-x-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-md font-medium text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>

                    {/* Individual Price Breakdown */}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-base font-bold text-gray-900">
                        ₹{item.offerPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* offers list */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Product offers
            </h3>

            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="py-4 flex items-start space-x-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center justify-between gap-4 w-full">
                    <h4 className="flex-1 text-md font-medium text-gray-900 truncate">
                      {item.name}
                    </h4>

                    <h4 className="text-blue-600 font-semibold whitespace-nowrap">
                      ₹150
                    </h4>

                    <h4 className="text-green-600 font-semibold whitespace-nowrap">
                      {item.discount}% OFF
                    </h4>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Pricing & Offers Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Order Summary
            </h3>

            {/* Price Calculations Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total Product Price</span>
                <span className="font-medium">₹{totalMRP}</span>
              </div>

              <div className="flex justify-between text-gray-600 pt-2">
                <span>Total Offer</span>
                <span className="text-green-600 font-medium">
                  {offerPercentage}%
                </span>
              </div>

              {/* Total Savings Highlighting */}
              <div className="bg-green-50/50 rounded-lg p-3 flex justify-between text-sm text-green-700 font-medium">
                <span>Your Total Savings</span>
                <span>₹{totalOffers}</span>
              </div>

              {/* Final Payable Price */}
              <div className="pt-4 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-900">
                  Total Payable Amount
                </span>
                <span className="text-2xl font-extrabold text-blue-600">
                  ₹{finalPayable}
                </span>
              </div>
            </div>

            
            <button className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all ">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
