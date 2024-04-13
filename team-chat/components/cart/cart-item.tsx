import { ShopItemModel } from "@/types";

import Image from "next/image";

import { X } from "lucide-react";

interface CartItemProps {
  itemModel: ShopItemModel;
}

export const CartItem = ({ itemModel }: CartItemProps) => {
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden ">
        <Image
          className="object-cover object-center"
          fill
          src={itemModel.imageUrl}
          alt=""
        />
        <div className="relative ml-4 flex flex-1 flex-col justify-between">
          <div className="absolute z-10 right-0 top-0"></div>
        </div>
      </div>
    </li>
  );
};
