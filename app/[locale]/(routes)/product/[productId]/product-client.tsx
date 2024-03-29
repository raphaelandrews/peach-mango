"use client"

import { useTranslations } from 'next-intl';

import { Product as PrismaProduct, Image } from '@/types';

import Container from '@/components/ui/container';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list'

interface Product extends PrismaProduct {
  images: Image[];
}

interface ProductPageClientProps {
  product: Product;
  suggestedProducts: Product[];
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({
  product,
  suggestedProducts
}) => {
  const t = useTranslations('Product');

  return (
      <Container>
        <div className="py-10 sm:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:mx-auto lg:items-start lg:gap-x-8 max-w-[1000px]">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title={t('relatedItems')} items={suggestedProducts} />
        </div>
      </Container>
  )
}

export default ProductPageClient;
