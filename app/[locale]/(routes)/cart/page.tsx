"use client";

import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import Summary from './components/summary';
import CartItem from './components/cart-item';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container>
      <main className="bg-white">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {cart.items.map(({ product, quantity }) => (
                  <CartItem key={product.id} data={product} quantity={quantity} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
    </main>
      </Container>
  )
};

export default CartPage;