import React, { useState } from "react";
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function AddressandPayment() {
  const { cart } = useContext(CartContext);

  const totalMRP = cart.reduce(
    (acc, item) => acc + item.mrp * item.quantity,
    0,
  );

  const finalPayable = cart.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0,
  );

  const totalOffers = totalMRP - finalPayable;

  // 1. Shipping Address State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    streetAddress: "",
    postalCode: "",
  });

  // 2. Payment Steps State
  const [selectedGateway, setSelectedGateway] = useState(""); // 'upi' | 'card' | 'netbanking'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  // Form Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Helper validation: Check if all address fields have values
  const isAddressValid =
    address.fullName.trim() !== "" &&
    address.phone.trim() !== "" &&
    address.streetAddress.trim() !== "" &&
    address.postalCode.trim() !== "";

  // Simulated Third-Party Gateway trigger (mimicking Razorpay/Stripe SDK pop-ups)
  const triggerGatewayPayment = () => {
    if (!isAddressValid || !selectedGateway) return;

    setIsProcessingPayment(true);

    // Simulating a 2-second processing time from the gateway server overlay
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentSuccessful(true);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingBag className="mr-3 text-blue-600" size={32} /> Secure
        Single-Page Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Input Details & Gateway */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Shipping Address Form */}
          <div
            className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${isAddressValid ? "border-green-200" : "border-gray-200"}`}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="mr-2 text-gray-400" size={20} /> 1. Shipping
                Address
              </h3>
              {isAddressValid && (
                <CheckCircle2 className="text-green-500" size={20} />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={address.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Postal Code (PIN)
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleInputChange}
                  placeholder="6-digit pincode"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Flat / Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={address.streetAddress}
                  onChange={handleInputChange}
                  placeholder="House number, apartment name, street details"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Payment Gateways (Locked until Step 1 is valid) */}
          <div
            className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${!isAddressValid ? "opacity-50 pointer-events-none bg-gray-50/50" : "border-gray-200"}`}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <CreditCard className="mr-2 text-gray-400" size={20} /> 2.
                Select Payment Gateway Method
              </h3>
              {selectedGateway && (
                <CheckCircle2 className="text-green-500" size={20} />
              )}
            </div>

            <div className="space-y-3">
              {/* UPI Gateway Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedGateway === "upi" ? "border-blue-600 bg-blue-50/20" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === "upi"}
                    onChange={() => setSelectedGateway("upi")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    Instant UPI (GPay, PhonePe, BHIM)
                  </span>
                </div>
              </label>

              {/* Card Gateway Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedGateway === "card" ? "border-blue-600 bg-blue-50/20" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === "card"}
                    onChange={() => setSelectedGateway("card")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    Credit / Debit Cards (Visa, Mastercard, RuPay)
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* STEP 3: Gateway Secure Authorizer Interface */}
          <div
            className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${!isAddressValid || !selectedGateway ? "opacity-50 pointer-events-none bg-gray-50/50" : "border-gray-200"}`}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              3. Process Gateway Authorization
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Click below to open the secure environment window and complete
              verification context mapping.
            </p>

            {isPaymentSuccessful ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center space-x-3">
                <CheckCircle2
                  className="text-green-600 shrink-0"
                  size={24}
                />
                <div>
                  <p className="font-bold text-sm">
                    Payment Authorized & Secured Successfully
                  </p>
                  <p className="text-xs text-green-700/90 mt-0.5">
                    Gateway Reference Token saved. Proceed to confirm your order
                    placement.
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={triggerGatewayPayment}
                disabled={isProcessingPayment}
                className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Contacting Bank Gateway Node...
                  </span>
                ) : (
                  `Pay Now via ${selectedGateway ? selectedGateway.toUpperCase() : "Gateway"}`
                )}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Total Configuration Summary & Lock Mechanisms */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Checkout Validation Summary
            </h3>

            {/* Verification Step Status List Tracker */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Step 1: Complete Address Fields
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${isAddressValid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {isAddressValid ? "Ready" : "Pending Inputs"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Step 2: Choose Active Gateway Node
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedGateway ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {selectedGateway ? "Selected" : "Missing Option"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Step 3: Secure Server Transaction
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPaymentSuccessful ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {isPaymentSuccessful
                    ? "Authorized"
                    : "Awaiting Authorization"}
                </span>
              </div>
            </div>

            {/* Total Value Overview Display block */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{totalMRP}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Total Savings</span>
                <span className="font-semibold">-₹{totalOffers}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">
                  Total
                </span>
                <span className="text-xl font-extrabold text-blue-600">
                  ₹{finalPayable}
                </span>
              </div>
            </div>

            {/* CRITICAL LOGIC ACTION BUTTON: 
                Only enabled if isPaymentSuccessful evaluate to true */}
            <button
              type="button"
              disabled={!isPaymentSuccessful}
              className={`w-full py-3.5 px-4 font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center ${
                isPaymentSuccessful
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              Confirm Order
            </button>

            <div className="mt-4 flex items-center justify-center space-x-1.5 text-xs text-gray-400">
              <ShieldCheck
                size={16}
                className={
                  isPaymentSuccessful ? "text-green-500" : "text-gray-300"
                }
              />
              <span>SSL Encryption Handshake Protocols Enforced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
