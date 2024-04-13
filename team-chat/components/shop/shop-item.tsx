'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import Image from 'next/image';

import { ShoppingCartIcon } from 'lucide-react';

import { ShopItemModel } from '@/lib/types';
import { useCart } from '@/hooks/use-cart-store';
import Currency from '@/components/currency';
import toast from 'react-hot-toast';

interface ShopItemProps {
  itemModel: ShopItemModel;
}

export const ShopItem = ({ itemModel }: ShopItemProps) => {
  const { title, imageUrl, price } = itemModel;

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(itemModel);

    toast.success('Added item to cart');
  };

  return (
    <Card className="shadow-lg border-none flex flex-col items-center justify-center w-72 h-96 p-2 bg-zinc-200/90 dark:bg-zinc-700/75 text-zinc-500 dark:text-zinc-400">
      <CardHeader className="">{title}</CardHeader>
      <CardContent className="flex-1 justify-center items-center py-10 w-full">
        <div className="h-full w-full flex justify-center items-center">
          <div className="relative size-32 rounded-full overflow-hidden">
            <Image src={imageUrl} fill alt="shop-item" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-4">
        <Button
          onClick={handleAddToCart}
          className="space-x-2 dark:bg-zinc-800/35 dark:text-zinc-400 bg-zinc-400/35 hover:bg-zinc-400/50 text-zinc-500 dark:hover:bg-zinc-800/50"
        >
          <ShoppingCartIcon />
          <Currency value={itemModel.price} />
        </Button>
      </CardFooter>
    </Card>
  );
};
