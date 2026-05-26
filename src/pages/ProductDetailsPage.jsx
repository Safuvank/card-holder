import React, { useEffect, useState } from "react";
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!productData) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  const savedAmount = productData.mrp - productData.offerPrice;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="list-none p-0 inline-flex space-x-2">
          <li>Home</li>
          <li>/</li>
          <li>Products</li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Details</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT SIDE */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src={productData.image}
              alt={productData.name}
              className="w-full h-[450px] object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {productData.images?.map((img, idx) => (
              <div key={idx} className="h-24 rounded-xl overflow-hidden border">
                <img
                  src={img}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-6 space-y-6">
          {/* TITLE */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
              Premium Tier
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mt-3">
              {productData.name}
            </h1>

            <p className="text-gray-500 mt-2">{productData.tagline}</p>
          </div>

          {/* PRICE */}
          <div className="bg-gray-50 rounded-xl p-5 border">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{productData.offerPrice}
              </span>

              <span className="text-base text-gray-400 line-through">
                ₹{productData.mrp}
              </span>

              <span className="text-sm font-semibold text-green-600">
                ({productData.discount}% OFF)
              </span>
            </div>

            <div className="text-sm text-green-700 font-medium mt-1.5">
              You save ₹{savedAmount}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">
              Product Overview
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {productData.description}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="pt-6 border-t flex space-x-4">
            <button className="flex-1 bg-blue-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center">
              <ShoppingBag size={20} className="mr-2" />
              Add to Cart
            </button>

            <button className="px-4 py-3.5 border rounded-xl">
              <Heart size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
