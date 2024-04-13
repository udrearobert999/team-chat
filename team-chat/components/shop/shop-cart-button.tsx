'use client';

import { Button } from '@/components/ui/button';

import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ActionTooltip } from '@/components/action-tooltip';
import { useCart } from '@/hooks/use-cart-store';

export const ShopCartButton = () => {
  const { items } = useCart();
  const cartSize = items.length;

  const router = useRouter();

  const onClick = () => {
    router.push(`/cart`);
  };

  return (
    <ActionTooltip label="Cart" side="top" align="center">
      <Button
        onClick={onClick}
        className="bg-transparent border-0 relative"
        variant="outline"
        size="icon"
      >
        <ShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all" />
        {cartSize > 0 && (
          <div className="absolute left-5 bottom-5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs text-white shadow-sm">
            {cartSize}
          </div>
        )}
      </Button>
    </ActionTooltip>
  );
};
