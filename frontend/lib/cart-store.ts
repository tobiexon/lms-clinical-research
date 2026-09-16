/**
 * Cart Store — Zustand
 * Persisted to localStorage so cart survives page refresh.
 * Courses are added when user clicks "Enrol Now".
 * Cleared after successful checkout / enrolment.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  courseId: string;
  slug: string;
  title: string;
  price: number;        // e.g. 100.00
  originalPrice?: number; // crossed-out price if on sale
  thumbnailUrl?: string;
  category?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        // Don't add duplicates
        if (get().isInCart(item.courseId)) return;
        set((state) => ({ items: [...state.items, item] }));
      },

      removeItem: (courseId) => {
        set((state) => ({
          items: state.items.filter((i) => i.courseId !== courseId),
        }));
      },

      clearCart: () => set({ items: [] }),

      isInCart: (courseId) => get().items.some((i) => i.courseId === courseId),

      total: () =>
        get().items.reduce((sum, item) => sum + item.price, 0),

      count: () => get().items.length,
    }),
    {
      name: 'crn-cart', // localStorage key
    }
  )
);
