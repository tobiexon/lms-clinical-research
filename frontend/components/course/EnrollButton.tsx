'use client';

import { useState, useEffect } from 'react';
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
  price = 0,
  originalPrice,
  thumbnailUrl,
  category,
  variant = 'gold',
}: Props) {
  const { addItem, isInCart } = useCartStore();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only read cart state after mount to avoid hydration mismatch
  const alreadyInCart = mounted && isInCart(courseId);

  const btnClass =
    'w-full block text-center font-bold py-3 rounded-lg transition-all text-sm uppercase tracking-wide checkoutBtn';

  function handleAddToCart() {
    if (alreadyInCart) {
      router.push('/checkout');
      return;
    }

    addItem({ courseId, slug, title, price, originalPrice, thumbnailUrl, category });
    setAdded(true);

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
