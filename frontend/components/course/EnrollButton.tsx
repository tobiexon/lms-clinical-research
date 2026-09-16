'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';

interface Props {
  courseId: string;
  slug: string;
  title: string;
  price?: number;
  originalPrice?: number;
  thumbnailUrl?: string;
  category?: string;
  variant?: 'gold' | 'navy';
}

export default function EnrollButton({
  courseId,
  slug,
  title,
  price = 100.00,
  originalPrice,
  thumbnailUrl,
  category,
  variant = 'gold',
}: Props) {
  const { addItem, isInCart } = useCartStore();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const alreadyInCart = isInCart(courseId);

  const btnClass = variant === 'gold'
    ? 'w-full block text-center font-bold py-3 rounded-lg transition-all text-sm uppercase tracking-wide'
    : 'w-full block text-center font-bold py-3 rounded-lg transition-all text-sm uppercase tracking-wide';

  function handleAddToCart() {
    if (alreadyInCart) {
      // Already in cart — go to checkout
      router.push('/checkout');
      return;
    }

    addItem({ courseId, slug, title, price, originalPrice, thumbnailUrl, category });
    setAdded(true);

    // Reset "Added!" state after 2s
    setTimeout(() => setAdded(false), 2000);
  }

  if (alreadyInCart) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => router.push('/checkout')}
          className={`${btnClass} bg-green-600 hover:bg-green-700 text-white`}
        >
          ✓ Go to Checkout
        </button>
        <p className="text-xs text-center text-green-600 font-medium">
          This course is in your cart
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`${btnClass} ${
        added
          ? 'bg-green-500 text-white'
          : variant === 'gold'
          ? 'bg-[#c9a84c] hover:bg-[#b8973b] text-white'
          : 'bg-[#0d2233] hover:bg-[#1a3a5c] text-white'
      }`}
    >
      {added ? '✓ Added to Cart!' : 'Enrol Now'}
    </button>
  );
}
