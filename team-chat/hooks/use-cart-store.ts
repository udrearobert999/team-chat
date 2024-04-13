import { ShopItemModel } from '@/lib/types';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartStore {
  items: ShopItemModel[];
  totalPrice: number;
  addItem: (newItem: ShopItemModel) => void;
  removeItem: (itemId: string) => void;
  clear: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      totalPrice: 0,

      addItem: (newItem: ShopItemModel) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id
          );
          if (existingItem) {
            return { ...state };
          } else {
            const updatedItems = [...state.items, newItem];
            const updatedTotalPrice = state.totalPrice + newItem.price;

            return { items: updatedItems, totalPrice: updatedTotalPrice };
          }
        }),

      removeItem: (itemId: string) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== itemId);
          const updatedTotalPrice = updatedItems.reduce(
            (acc, item) => acc + item.price,
            0
          );
          return { items: updatedItems, totalPrice: updatedTotalPrice };
        }),
      clear: () =>
        set((state) => {
          return { items: [], totalPrice: 0 };
        }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
