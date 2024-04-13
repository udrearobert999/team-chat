import { ShopItemModel } from '@/lib/types';

import Image from 'next/image';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart-store';
import Currency from '@/components/currency';
import toast from 'react-hot-toast';

interface CartItemProps {
  itemModel: ShopItemModel;
}

export const CartItem = ({ itemModel }: CartItemProps) => {
  const { removeItem } = useCart();

  const handleRemoveItem = () => {
    removeItem(itemModel.id);
    toast.success('Removed item from cart');
  };

  return (
    <li className="flex py-6 text-zinc-500 dark:text-zinc-400">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          className="object-cover object-center"
          fill
          src={itemModel.imageUrl}
          alt=""
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button
            onClick={handleRemoveItem}
            size="icon"
            className="bg-transparent text-zinc-500 dark:text-zinc-400 hover:bg-transparent"
          >
            <X className="size-15" />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold ">{itemModel.title}</p>
          </div>
          <div className="mt-1 flex text-sm my-8"></div>
          <Currency value={itemModel.price} />
        </div>
      </div>
    </li>
  );
};
