"use client";

import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";

export const ShopCartButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/shop`);
  };

  return (
    <ActionTooltip label="Checkout" side="top" align="center">
      <Button
        onClick={onClick}
        className="bg-transparent border-0"
        variant="outline"
        size="icon"
      >
        <ShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>
    </ActionTooltip>
  );
};
