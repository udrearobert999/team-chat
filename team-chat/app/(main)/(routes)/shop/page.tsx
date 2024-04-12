"use client";

import { ShopCartButton } from "@/components/shop/shop-cart-button";
import { ShopItem } from "@/components/shop/shop-item";
import { ShopSearch } from "@/components/shop/shop-search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const shopItems: {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}[] = [
  {
    id: "29fda105-c71e-4c8c-8159-148716740c0d",
    title: "Love",
    imageUrl:
      "https://utfs.io/f/359dc343-826e-4e05-9e00-74d599155abc-ltv8xg.jpeg",
    price: 0.08,
  },
  {
    id: "75ad1d6a-c05b-41e7-97a6-a1b1e0d78f80",
    title: "Lovely Kiss",
    imageUrl:
      "https://utfs.io/f/359dc343-826e-4e05-9e00-74d599155abc-ltv8xg.jpeg",
    price: 1.08,
  },
  {
    id: "74575177-ee65-4477-87c2-3b410ee865ff",
    title: "Hate you!",
    imageUrl:
      "https://utfs.io/f/359dc343-826e-4e05-9e00-74d599155abc-ltv8xg.jpeg",
    price: 1.0,
  },
  {
    id: "276e632e-981d-468c-9215-123fa7f17f92",
    title: "Hate that!",
    imageUrl:
      "https://utfs.io/f/359dc343-826e-4e05-9e00-74d599155abc-ltv8xg.jpeg",
    price: 1.2,
  },
  {
    id: "743bdb45-a9c2-4a1c-b1c2-b8f9a27a1313",
    title: "New Hat",
    imageUrl:
      "https://utfs.io/f/359dc343-826e-4e05-9e00-74d599155abc-ltv8xg.jpeg",
    price: 0.2,
  },
  {
    id: "2ab60db4-5ad7-4c9d-b420-152c95b1d7d0",
    title: "Stylish Hat",
    imageUrl:
      "https://utfs.io/f/359dc343-826e-4e05-9e00-74d599155abc-ltv8xg.jpeg",
    price: 3.2,
  },
];

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    console.log("da");
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
          <ShopItem key={item.id} {...item} />
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
