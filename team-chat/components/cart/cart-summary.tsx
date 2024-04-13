'use client';

import { useCart } from '@/hooks/use-cart-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Currency from '@/components/currency';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartSummary = () => {
  const { totalPrice, items, clear } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get('success')) {
      toast.success('Order processed successfully!');
      clear();
    }
    if (searchParams?.get('canceled')) {
      toast.error('Failed to process order');
    }
  }, [searchParams, clear]);

  const handleCheckout = async () => {
    const response = await axios.post('/api/checkout', {
      itemIds: items.map((item) => item.id),
    });

    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg px-4 py-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 bg-zinc-200/90 dark:bg-zinc-700/75 text-zinc-500 dark:text-zinc-400">
      <h2 className="text-lg font-medium">Order Summary</h2>
      <div className="mt-6 space-y-4 ">
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        <div className="flex items-center justify-between pt-4">
          <div className="text-base font-medium">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="w-full mt-6 dark:bg-zinc-800/35 dark:text-zinc-400 bg-zinc-400/35 hover:bg-zinc-400/50 text-zinc-500 dark:hover:bg-zinc-800/50"
      >
        Checkout
      </Button>
    </div>
  );
};
