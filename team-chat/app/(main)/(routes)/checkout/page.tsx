"use client";

import { CartItem } from "@/components/cart/cart-item";

import { useCart } from "@/hooks/use-cart-store";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { items } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <div className="px-5 py-16">
        <h1 className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
          Shopping Cart
        </h1>
        <div className="mt-12 grid grid-cols-12 items-start gap-x-12">
          <div className="col-span-7">
            {items.length === 0 && (
              <p className="text-zinc-400 dark-text-zinc-500">
                No items added to cart
              </p>
            )}
            <ul>
              {items.map((item) => (
                <CartItem key={item.id} itemModel={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
