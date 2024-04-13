'use client';

import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { Separator } from '@/components/ui/separator';

import { useCart } from '@/hooks/use-cart-store';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { items } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {items.length === 0 && (
              <p className="text-zinc-400 dark-text-zinc-500">
                No items added to cart
              </p>
            )}
            <ul>
              {items.map((item) => (
                <>
                  <CartItem key={item.id} itemModel={item} />
                  <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
                </>
              ))}
            </ul>
          </div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
