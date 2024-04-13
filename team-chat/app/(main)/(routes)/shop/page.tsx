'use client';

import { ShopCartButton } from '@/components/shop/shop-cart-button';
import { ShopItem } from '@/components/shop/shop-item';
import { ShopSearch } from '@/components/shop/shop-search';
import { Separator } from '@/components/ui/separator';
import { shopItems } from '@/lib/static-data';

import { useEffect, useState } from 'react';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(shopItems);

  useEffect(() => {
    const filtered = shopItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery]);

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex items-center flex-col p-10 overflow-y-auto">
      <div className="flex items-center mt-4 w-full px-4">
        <div className="flex-grow">
          <div className="w-1/2 mx-auto">
            <ShopSearch onChange={handleSearchChange} />
          </div>
        </div>
        <div className="flex-initial">
          <ShopCartButton />
        </div>
      </div>
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      <div className="flex flex-wrap w-full h-full p-8 gap-6">
        {filteredItems.map((item) => (
          <ShopItem key={item.id} itemModel={item} />
        ))}
        {!filteredItems.length && (
          <div className="h-full w-full flex justify-center font-bold text-zinc-500 dark:text-zinc-400">
            <p>Not Found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
