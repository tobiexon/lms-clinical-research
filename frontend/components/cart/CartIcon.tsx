'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';

export default function CartIcon() {
  const { items, removeItem, total, count } = useCartStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const itemCount = count();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Cart button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-1.5 text-cyan-200 hover:text-white transition-colors p-1"
        aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
      >
        {/* Shopping cart icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>

        {/* Badge count */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#c9a84c] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#0d2233] px-4 py-3 flex items-center justify-between">
            <span className="text-white font-semibold text-sm">
              Your Cart ({itemCount} {itemCount === 1 ? 'course' : 'courses'})
            </span>
            {itemCount > 0 && (
              <span className="text-[#c9a84c] text-sm font-bold">
                £{total().toFixed(2)}
              </span>
            )}
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              <div className="text-3xl mb-2">🛒</div>
              <p className="text-sm">Your cart is empty</p>
              <Link href="/courses" onClick={() => setOpen(false)}
                className="text-xs text-[#c9a84c] hover:underline mt-2 inline-block">
                Browse courses →
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.courseId} className="flex items-start gap-3 p-3 hover:bg-gray-50">
                    {/* Thumbnail placeholder */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0d2233] to-[#1a4a6e] shrink-0 flex items-center justify-center">
                      <span className="text-cyan-400 text-xs font-bold">CR</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            £{item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-sm font-bold text-[#c9a84c]">
                          £{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.courseId)}
                      className="text-gray-300 hover:text-red-400 transition-colors shrink-0 p-1"
                      aria-label="Remove from cart"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Total</span>
                  <span className="text-lg font-extrabold text-[#0d2233]">
                    £{total().toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold py-2.5 rounded-lg text-sm transition-colors uppercase tracking-wide"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center text-gray-500 hover:text-gray-700 text-xs mt-2 transition-colors"
                >
                  Continue browsing
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
