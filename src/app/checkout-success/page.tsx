'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  cartItemId: string;
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rarity: string;
  gameId: string;
}

interface OrderData {
  items: OrderItem[];
  total: number;
  orderDate: string;
  orderId: string;
}

export default function CheckoutSuccess() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('lastOrder');
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">No order data found.</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 rounded-full p-3">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-400">Thank you for your purchase.</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Order Receipt</h2>
              <span className="text-gray-400">#{orderData.orderId}</span>
            </div>

            <div className="space-y-4 mb-6">
              {orderData.items.map((item) => (
                <div key={item.cartItemId} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-gray-400">{item.rarity}</p>
                  </div>
                  <div className="text-yellow-400 font-medium">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Order Date</span>
                <span className="text-white">
                  {new Date(orderData.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-white">Total</span>
                <span className="text-yellow-400">${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
} 