import Stripe from 'stripe';

import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { shopItems } from '@/lib/static-data';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const reqData = await req.json();
  const itemIds = reqData.itemIds as string[];

  if (!itemIds || itemIds.length === 0)
    return new NextResponse('Item ids are required', { status: 400 });

  const items = shopItems.filter((item) => itemIds.includes(item.id));

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  items.forEach((item) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.price * 100),
      },
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL!}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL!}/cart?canceled=1`,
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
