"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import useCart from '@/hooks/use-cart';

import Container from '@/components/ui/container';
import Summary from './components/summary';
import CartItem from './components/cart-item';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const t = useTranslations('Cart');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container>
      <main className="min-h-screen">
        <div className="py-16">
          <h1 className="text-3xl font-bold">{t('shoppingCart')}</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {
                cart.items.length === 0 && <p className="text-muted-foreground">
                  {t('noItems')}
                </p>
              }
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