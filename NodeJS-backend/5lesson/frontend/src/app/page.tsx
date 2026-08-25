'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import {
  ArrowRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  X,
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

export default function HomePage() {
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const [favorites, setFavorites] = useState<number[]>([]);

  const [cartCount, setCartCount] = useState(0);

  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Sports',
    'Beauty',
    'Furniture',
  ];

  /*
   * ==========================================
   * PRODUCTS
   * ==========================================
   */

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data } = await api.get('/products');

      setProducts(data);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * ==========================================
   * CART
   * ==========================================
   */

  useEffect(() => {
    if (!user || user.role !== 'buyer') {
      setCartCount(0);
      return;
    }

    loadCartCount();
  }, [user]);

  const loadCartCount = async () => {
    try {
      const { data } = await api.get('/cart');

      const count = data.reduce(
        (sum: number, item: any) =>
          sum + Number(item.quantity),
        0
      );

      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  /*
   * ==========================================
   * FAVORITES
   * ==========================================
   */

  useEffect(() => {
    const saved = localStorage.getItem('favorites');

    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = (
    e: React.MouseEvent,
    productId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorites((current) => {
      const exists = current.includes(productId);

      const updated = exists
        ? current.filter((id) => id !== productId)
        : [...current, productId];

      localStorage.setItem(
        'favorites',
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  /*
   * ==========================================
   * ADD TO CART
   * ==========================================
   */

  const addToCart = async (
    e: React.MouseEvent,
    productId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (user.role !== 'buyer') {
      alert('Добавлять товары в корзину может только покупатель.');
      return;
    }

    try {
      await api.post('/cart', {
        product_id: productId,
        quantity: 1,
      });

      await loadCartCount();

      window.dispatchEvent(
        new CustomEvent('cart-updated')
      );
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          'Не удалось добавить товар в корзину'
      );
    }
  };

  /*
   * ==========================================
   * CART EVENT
   * ==========================================
   */

  useEffect(() => {
    const handler = () => {
      loadCartCount();
    };

    window.addEventListener(
      'cart-updated',
      handler
    );

    return () => {
      window.removeEventListener(
        'cart-updated',
        handler
      );
    };
  }, [user]);

  /*
   * ==========================================
   * FILTER
   * ==========================================
   */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.title
            ?.toLowerCase()
            .includes(query) ||
          product.description
            ?.toLowerCase()
            .includes(query)
      );
    }

    return result;
  }, [products, search]);

  const popularProducts =
    filteredProducts.slice(0, 4);

  const featuredProduct =
    filteredProducts[0];

  /*
   * ==========================================
   * PRICE
   * ==========================================
   */

  const formatPrice = (price: number) => {
    return `$${Number(price).toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f4f1] px-3 sm:px-5 py-3">

        <div className="max-w-[1300px] mx-auto">

          <Header
            cartCount={0}
            search={search}
            setSearch={setSearch}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />

          <div className="mt-4 grid lg:grid-cols-[1.5fr_0.8fr] gap-3">

            <div className="h-[430px] rounded-3xl bg-neutral-200 animate-pulse" />

            <div className="h-[430px] rounded-3xl bg-neutral-200 animate-pulse" />

          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[300px] bg-white rounded-3xl animate-pulse"
              />
            ))}

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f4f1] px-3 sm:px-5 py-3">

      <div className="max-w-[1300px] mx-auto">

        {/* HEADER */}

        <Header
          cartCount={cartCount}
          search={search}
          setSearch={setSearch}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />

        {/* HERO */}

        {featuredProduct && (
          <section className="mt-4 grid lg:grid-cols-[1.5fr_0.8fr] gap-3">

            {/* MAIN FEATURE */}

            <Link
              href={`/products/${featuredProduct.id}`}
              className="relative min-h-[430px] lg:h-[520px] rounded-3xl overflow-hidden bg-white group"
            >

              <div className="absolute inset-0 bg-[#e8e7e2]" />

              {featuredProduct.image_url && (
                <img
                  src={featuredProduct.image_url}
                  alt={featuredProduct.title}
                  className="absolute inset-0 w-full h-full object-contain p-10 mix-blend-multiply group-hover:scale-[1.03] transition duration-700"
                />
              )}

              {/* OVERLAY */}

              <div className="absolute inset-x-4 bottom-4">

                <div className="bg-black/75 backdrop-blur-xl text-white rounded-2xl p-5 flex items-end justify-between gap-5">

                  <div>

                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">
                      <Sparkles size={11} />
                      Featured product
                    </div>

                    <h1 className="text-xl sm:text-2xl font-medium tracking-[-0.04em]">
                      {featuredProduct.title}
                    </h1>

                    <p className="text-xs text-white/50 mt-1 line-clamp-1">
                      {featuredProduct.description ||
                        'Discover something new.'}
                    </p>

                  </div>

                  <div className="shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                    />
                  </div>

                </div>

              </div>

            </Link>

            {/* SIDE PRODUCT */}

            <Link
              href={`/products/${featuredProduct.id}`}
              className="relative min-h-[430px] lg:h-[520px] rounded-3xl overflow-hidden bg-white group"
            >

              <div className="absolute top-5 left-5 flex gap-1">

                <span className="w-4 h-4 rounded-full bg-black" />

                <span className="w-4 h-4 rounded-full bg-neutral-400" />

                <span className="w-4 h-4 rounded-full bg-neutral-200 border border-black/10" />

              </div>

              {featuredProduct.image_url && (
                <img
                  src={featuredProduct.image_url}
                  alt={featuredProduct.title}
                  className="w-full h-full object-contain p-16 group-hover:scale-105 transition duration-700"
                />
              )}

              <div className="absolute left-5 right-5 bottom-5">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2">
                      Selected
                    </p>

                    <h2 className="text-lg font-medium tracking-[-0.03em]">
                      {featuredProduct.title}
                    </h2>

                    <p className="text-xs text-neutral-400 mt-1">
                      Premium selection
                    </p>

                  </div>

                  <span className="text-sm font-medium">
                    {formatPrice(
                      featuredProduct.price
                    )}
                  </span>

                </div>

              </div>

            </Link>

          </section>
        )}

        {/* POPULAR */}

        <section
          id="popular"
          className="pt-10"
        >

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
                Discover
              </p>

              <h2 className="text-2xl font-medium tracking-[-0.05em]">
                Popular products
              </h2>

            </div>

            <div className="flex items-center gap-2 overflow-x-auto">

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`
                    shrink-0
                    px-4
                    py-2
                    rounded-full
                    text-[10px]
                    border
                    transition
                    ${
                      category === item
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-neutral-500 border-black/10 hover:border-black/30'
                    }
                  `}
                >
                  {item}
                </button>
              ))}

              <button className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0">
                <SlidersHorizontal
                  size={14}
                  strokeWidth={1.7}
                />
              </button>

            </div>

          </div>

          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">

            {popularProducts.map((product) => {

              const isFavorite =
                favorites.includes(product.id);

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-3xl overflow-hidden"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-square bg-[#eeeeec]">

                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-contain p-7 group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        <PackageIcon />
                      </div>
                    )}

                    <button
                      onClick={(e) =>
                        toggleFavorite(
                          e,
                          product.id
                        )
                      }
                      className={`
                        absolute
                        top-3
                        right-3
                        w-9
                        h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        backdrop-blur
                        transition
                        ${
                          isFavorite
                            ? 'bg-black text-white'
                            : 'bg-white/90 text-black hover:bg-white'
                        }
                      `}
                    >
                      <Heart
                        size={15}
                        strokeWidth={1.7}
                        fill={
                          isFavorite
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>

                  </div>

                  {/* INFO */}

                  <div className="p-4">

                    <div className="flex justify-between gap-3">

                      <div className="min-w-0">

                        <h3 className="text-sm font-medium truncate">
                          {product.title}
                        </h3>

                        <p className="text-[10px] text-neutral-400 mt-1 truncate">
                          Marketplace
                        </p>

                      </div>

                      <p className="text-sm font-medium shrink-0">
                        {formatPrice(
                          product.price
                        )}
                      </p>

                    </div>

                    <button
                      onClick={(e) =>
                        addToCart(
                          e,
                          product.id
                        )
                      }
                      className="mt-4 w-full h-9 rounded-full bg-neutral-100 hover:bg-black hover:text-white text-[10px] font-medium transition flex items-center justify-center gap-2"
                    >
                      Add to cart
                      <ShoppingBag
                        size={13}
                        strokeWidth={1.7}
                      />
                    </button>

                  </div>

                </Link>
              );
            })}

          </div>

          {popularProducts.length === 0 && (
            <div className="bg-white rounded-3xl py-20 text-center">

              <Search
                size={28}
                className="mx-auto text-neutral-300"
              />

              <p className="mt-4 text-sm text-neutral-500">
                Nothing found
              </p>

            </div>
          )}

        </section>

        {/* BANNER */}

        <section
          id="new"
          className="mt-4 rounded-3xl bg-black text-white min-h-[280px] p-7 sm:p-10 flex flex-col justify-between"
        >

          <div className="flex justify-between items-start">

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                New collection
              </p>

              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-[-0.06em] max-w-lg">
                Find things worth keeping.
              </h2>

            </div>

            <Sparkles
              size={24}
              strokeWidth={1.4}
              className="text-white/50"
            />

          </div>

          <div className="flex justify-between items-end gap-5 mt-10">

            <p className="text-xs text-white/40 max-w-sm">
              Explore carefully selected products
              from independent sellers and modern
              brands.
            </p>

            <Link
              href="#popular"
              className="shrink-0 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
            >
              <ArrowRight
                size={16}
                strokeWidth={1.8}
              />
            </Link>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="py-10 flex flex-col sm:flex-row justify-between gap-3 text-[10px] text-neutral-400">

          <span>© 2026 MARKET</span>

          <span>
            Simple marketplace for everyone
          </span>

        </footer>

      </div>

    </main>
  );
}

/*
 * ==========================================
 * HEADER
 * ==========================================
 */

function Header({
  cartCount,
  search,
  setSearch,
  searchOpen,
  setSearchOpen,
}: {
  cartCount: number;
  search: string;
  setSearch: (value: string) => void;
  searchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
}) {
  return (
    <header className="relative z-50">

      <div className="h-[58px] bg-white rounded-2xl border border-black/[0.06] shadow-sm px-4 sm:px-5 flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <button className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center">
            <Menu
              size={17}
              strokeWidth={1.7}
            />
          </button>

          <Link
            href="/"
            className="hidden sm:block text-[11px] uppercase tracking-[0.25em] font-semibold"
          >
            Market
          </Link>

        </div>

        {/* DESKTOP NAV */}

        <nav className="hidden md:flex items-center gap-7">

          <Link
            href="/"
            className="text-[10px] text-neutral-500 hover:text-black"
          >
            Catalog
          </Link>

          <Link
            href="/#popular"
            className="text-[10px] text-neutral-500 hover:text-black"
          >
            Popular
          </Link>

          <Link
            href="/#new"
            className="text-[10px] text-neutral-500 hover:text-black"
          >
            New arrivals
          </Link>

        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-1">

          {searchOpen ? (
            <div className="hidden sm:flex items-center bg-neutral-100 rounded-full h-9 px-3">

              <Search
                size={14}
                strokeWidth={1.7}
              />

              <input
                autoFocus
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search..."
                className="w-28 bg-transparent border-none outline-none text-xs px-2"
              />

              <button
                onClick={() => {
                  setSearch('');
                  setSearchOpen(false);
                }}
              >
                <X
                  size={13}
                  strokeWidth={1.7}
                />
              </button>

            </div>
          ) : (
            <button
              onClick={() =>
                setSearchOpen(true)
              }
              className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"
            >
              <Search
                size={16}
                strokeWidth={1.7}
              />
            </button>
          )}

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
            className="relative w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center"
          >
            <ShoppingBag
              size={16}
              strokeWidth={1.7}
            />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-black text-white text-[8px] flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </Link>

        </div>

      </div>

    </header>
  );
}

/*
 * ==========================================
 * PACKAGE ICON
 * ==========================================
 */

function PackageIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
      <ShoppingBag
        size={20}
        strokeWidth={1.4}
      />
    </div>
  );
}