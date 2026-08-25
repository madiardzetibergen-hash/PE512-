'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  User,
  Share2,
  Package,
  Check,
} from 'lucide-react';

import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  image_url?: string;
  seller_id?: number;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const { user } = useAuth();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  const [favorite, setFavorite] =
    useState(false);

  const [adding, setAdding] =
    useState(false);

  const [added, setAdded] =
    useState(false);

  /*
   * LOAD PRODUCT
   */

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const { data } =
        await api.get('/products');

      const found = data.find(
        (item: Product) =>
          String(item.id) ===
          String(params.id)
      );

      setProduct(found || null);

      const favorites =
        localStorage.getItem(
          'favorites'
        );

      if (favorites) {
        const parsed =
          JSON.parse(favorites);

        setFavorite(
          parsed.includes(found?.id)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * FAVORITE
   */

  const toggleFavorite = () => {
    if (!product) return;

    const saved =
      localStorage.getItem(
        'favorites'
      );

    let favorites: number[] = [];

    if (saved) {
      try {
        favorites = JSON.parse(saved);
      } catch {
        favorites = [];
      }
    }

    if (favorites.includes(product.id)) {
      favorites = favorites.filter(
        (id) => id !== product.id
      );

      setFavorite(false);
    } else {
      favorites.push(product.id);

      setFavorite(true);
    }

    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    );
  };

  /*
   * ADD TO CART
   */

  const addToCart = async () => {
    if (!product) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'buyer') {
      alert(
        'Добавлять товары в корзину может только покупатель.'
      );

      return;
    }

    try {
      setAdding(true);

      await api.post('/cart', {
        product_id: product.id,
        quantity,
      });

      setAdded(true);

      window.dispatchEvent(
        new CustomEvent('cart-updated')
      );

      setTimeout(() => {
        setAdded(false);
      }, 2500);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          'Не удалось добавить товар'
      );
    } finally {
      setAdding(false);
    }
  };

  /*
   * PRICE
   */

  const formatPrice = (price: number) =>
    `$${Number(price).toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;

  /*
   * LOADING
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f4f1] p-3 sm:p-5">

        <div className="max-w-[1400px] mx-auto">

          <Header />

          <div className="mt-4 grid lg:grid-cols-[1fr_430px] gap-3">

            <div className="h-[700px] bg-white rounded-3xl animate-pulse" />

            <div className="h-[700px] bg-white rounded-3xl animate-pulse" />

          </div>

        </div>

      </main>
    );
  }

  /*
   * NOT FOUND
   */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f4f4f1] p-3 sm:p-5">

        <div className="max-w-[1400px] mx-auto">

          <Header />

          <div className="mt-4 bg-white rounded-3xl min-h-[600px] flex items-center justify-center">

            <div className="text-center">

              <Package
                size={35}
                strokeWidth={1.3}
                className="mx-auto text-neutral-300"
              />

              <h1 className="mt-5 text-2xl font-medium">
                Product not found
              </h1>

              <Link
                href="/"
                className="inline-flex mt-6 items-center gap-2 bg-black text-white rounded-full px-6 py-3 text-xs"
              >
                <ArrowLeft size={14} />
                Back to shop
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f4f1] p-3 sm:p-5">

      <div className="max-w-[1400px] mx-auto">

        <Header />

        <div className="mt-4 grid lg:grid-cols-[1fr_430px] gap-3">

          {/* PRODUCT IMAGE */}

          <section className="relative bg-white rounded-3xl min-h-[650px] lg:h-[calc(100vh-90px)] overflow-hidden">

            <div className="absolute top-5 left-5 z-10">

              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={1.7}
                />
              </Link>

            </div>

            {/* TOP ACTIONS */}

            <div className="absolute top-5 right-5 z-10 flex gap-2">

              <button
                onClick={toggleFavorite}
                className={`
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  backdrop-blur
                  transition
                  ${
                    favorite
                      ? 'bg-black text-white'
                      : 'bg-white/90 hover:bg-black hover:text-white'
                  }
                `}
              >
                <Heart
                  size={16}
                  strokeWidth={1.7}
                  fill={
                    favorite
                      ? 'currentColor'
                      : 'none'
                  }
                />
              </button>

              <button
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <Share2
                  size={16}
                  strokeWidth={1.7}
                />
              </button>

            </div>

            {/* IMAGE */}

            <div className="w-full h-full flex items-center justify-center p-10 sm:p-20">

              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain hover:scale-[1.03] transition duration-700"
                />
              ) : (
                <Package
                  size={100}
                  strokeWidth={1}
                  className="text-neutral-200"
                />
              )}

            </div>

            {/* BOTTOM */}

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">

              <div className="flex gap-2">

                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
                  <Search
                    size={15}
                    strokeWidth={1.7}
                  />
                </button>

                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
                  <Share2
                    size={15}
                    strokeWidth={1.7}
                  />
                </button>

              </div>

              <div className="flex items-center gap-1">

                <span className="w-7 h-[2px] bg-black rounded-full" />

                <span className="w-7 h-[2px] bg-black/10 rounded-full" />

                <span className="w-7 h-[2px] bg-black/10 rounded-full" />

              </div>

            </div>

          </section>

          {/* PRODUCT DETAILS */}

          <aside className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col">

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                Product
              </p>

              <h1 className="mt-4 text-3xl sm:text-4xl font-medium tracking-[-0.06em]">
                {product.title}
              </h1>

              <div className="mt-4 flex items-center gap-3">

                <span className="text-xl font-medium">
                  {formatPrice(product.price)}
                </span>

                <span className="text-[10px] px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500">
                  In stock
                </span>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-8 pt-7 border-t border-black/[0.06]">

              <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                Description
              </p>

              <p className="text-sm leading-6 text-neutral-500">
                {product.description ||
                  'A carefully selected product available from our marketplace.'}
              </p>

            </div>

            {/* QUANTITY */}

            <div className="mt-8">

              <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                Quantity
              </p>

              <div className="h-12 border border-black/10 rounded-full flex items-center w-fit">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                  className="w-12 h-full flex items-center justify-center hover:bg-neutral-100 rounded-l-full"
                >
                  <Minus size={15} />
                </button>

                <span className="w-12 text-center text-sm">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="w-12 h-full flex items-center justify-center hover:bg-neutral-100 rounded-r-full"
                >
                  <Plus size={15} />
                </button>

              </div>

            </div>

            {/* ADD */}

            <div className="mt-auto pt-8">

              <button
                onClick={addToCart}
                disabled={adding}
                className="w-full h-14 rounded-full bg-black text-white flex items-center justify-center gap-3 text-xs font-medium hover:bg-neutral-800 transition disabled:opacity-50"
              >

                {added ? (
                  <>
                    <Check size={16} />
                    Added to cart
                  </>
                ) : adding ? (
                  'Adding...'
                ) : (
                  <>
                    Add to cart
                    <ShoppingBag size={16} />
                  </>
                )}

              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-neutral-400">

                <Check size={12} />

                Secure checkout

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

/*
 * HEADER
 */

function Header() {
  return (
    <header>

      <div className="h-[58px] bg-white rounded-2xl border border-black/[0.06] px-4 sm:px-5 flex items-center justify-between">

        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.25em] font-semibold"
        >
          Market
        </Link>

        <div className="flex items-center gap-1">

          <Link
            href="/"
            className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"
          >
            <Search
              size={16}
              strokeWidth={1.7}
            />
          </Link>

          <Link
            href="/profile"
            className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"
          >
            <User
              size={16}
              strokeWidth={1.7}
            />
          </Link>

          <Link
            href="/cart"
            className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center"
          >
            <ShoppingBag
              size={16}
              strokeWidth={1.7}
            />
          </Link>

        </div>

      </div>

    </header>
  );
}