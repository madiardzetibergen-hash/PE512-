'use client';

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  User,
  Package,
} from 'lucide-react';

import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface CartItem {
  id: number;
  quantity: number;
  product_id: number;
  title: string;
  price: number;
  image_url: string;
}

export default function CartPage() {
  const router = useRouter();

  const { user } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] =
    useState(false);
  const [error, setError] = useState('');

  /*
   * LOAD CART
   */

  const loadCart = async () => {
    try {
      setLoading(true);
      setError('');

      const { data } = await api.get('/cart');

      setItems(data);
    } catch (err: any) {
      console.error(err);

      if (err.response?.status === 401) {
        router.push('/login');
        return;
      }

      setError(
        err.response?.data?.message ||
          'Не удалось загрузить корзину'
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * AUTH
   */

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'buyer') {
      setLoading(false);

      setError(
        'Корзина доступна только покупателям.'
      );

      return;
    }

    loadCart();
  }, [user]);

  /*
   * REMOVE
   */

  const removeItem = async (cartId: number) => {
    try {
      await api.delete(`/cart/${cartId}`);

      setItems((current) =>
        current.filter(
          (item) => item.id !== cartId
        )
      );

      window.dispatchEvent(
        new CustomEvent('cart-updated')
      );
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          'Не удалось удалить товар'
      );
    }
  };

  /*
   * QUANTITY
   */

  const updateQuantity = async (
    item: CartItem,
    quantity: number
  ) => {
    if (quantity < 1) {
      await removeItem(item.id);
      return;
    }

    try {
      await api.delete(`/cart/${item.id}`);

      await api.post('/cart', {
        product_id: item.product_id,
        quantity,
      });

      await loadCart();

      window.dispatchEvent(
        new CustomEvent('cart-updated')
      );
    } catch (err: any) {
      await loadCart();

      alert(
        err.response?.data?.message ||
          'Не удалось изменить количество'
      );
    }
  };

  /*
   * CHECKOUT
   */

  const checkout = async () => {
    if (!items.length) return;

    try {
      setCheckoutLoading(true);

      const { data } = await api.post(
        '/cart/checkout'
      );

      setItems([]);

      window.dispatchEvent(
        new CustomEvent('cart-updated')
      );

      alert(
        `${data.message}\nНомер заказа: ${data.orderId}`
      );
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          'Ошибка оформления заказа'
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  /*
   * TOTALS
   */

  const totalItems = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + Number(item.quantity),
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Number(item.price) *
            Number(item.quantity),
        0
      ),
    [items]
  );

  const total = subtotal;

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

        <div className="max-w-[1300px] mx-auto">

          <Header cartCount={0} />

          <div className="mt-5 grid lg:grid-cols-[1fr_380px] gap-4">

            <div className="h-[500px] bg-white rounded-3xl animate-pulse" />

            <div className="h-[350px] bg-white rounded-3xl animate-pulse" />

          </div>

        </div>

      </main>
    );
  }

  /*
   * ERROR
   */

  if (error) {
    return (
      <main className="min-h-screen bg-[#f4f4f1] p-3 sm:p-5">

        <div className="max-w-[1300px] mx-auto">

          <Header cartCount={0} />

          <div className="mt-5 bg-white rounded-3xl min-h-[500px] flex items-center justify-center">

            <div className="text-center">

              <ShoppingBag
                size={35}
                strokeWidth={1.3}
                className="mx-auto text-neutral-300"
              />

              <h1 className="mt-5 text-xl font-medium">
                Cart unavailable
              </h1>

              <p className="mt-2 text-sm text-neutral-400">
                {error}
              </p>

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

  /*
   * EMPTY
   */

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f4f4f1] p-3 sm:p-5">

        <div className="max-w-[1300px] mx-auto">

          <Header cartCount={0} />

          <div className="mt-5 min-h-[600px] bg-white rounded-3xl flex items-center justify-center">

            <div className="text-center">

              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">

                <ShoppingBag
                  size={27}
                  strokeWidth={1.4}
                />

              </div>

              <h1 className="mt-6 text-3xl font-medium tracking-[-0.05em]">
                Your cart is empty
              </h1>

              <p className="mt-3 text-sm text-neutral-400">
                Add something you love to your cart.
              </p>

              <Link
                href="/"
                className="inline-flex mt-7 items-center gap-2 bg-black text-white rounded-full px-7 py-3.5 text-xs"
              >
                Continue shopping
                <ArrowRight size={14} />
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }

  /*
   * MAIN
   */

  return (
    <main className="min-h-screen bg-[#f4f4f1] p-3 sm:p-5">

      <div className="max-w-[1300px] mx-auto">

        <Header
          cartCount={totalItems}
        />

        {/* TITLE */}

        <div className="py-10">

          <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
            Shopping bag
          </p>

          <div className="flex items-end justify-between mt-3">

            <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.06em]">
              Your cart
            </h1>

            <span className="text-xs text-neutral-400">
              {totalItems} items
            </span>

          </div>

        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-4 items-start">

          {/* PRODUCTS */}

          <section className="bg-white rounded-3xl p-5 sm:p-7">

            <div className="flex justify-between pb-5 border-b border-black/[0.06]">

              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                Products
              </span>

              <span className="text-[10px] text-neutral-400">
                {items.length} products
              </span>

            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 border-b border-black/[0.06] last:border-0"
              >

                <div className="flex gap-4">

                  {/* IMAGE */}

                  <Link
                    href={`/products/${item.product_id}`}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#eeeeec] shrink-0 overflow-hidden flex items-center justify-center"
                  >

                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-contain p-3 hover:scale-105 transition"
                      />
                    ) : (
                      <Package
                        size={28}
                        strokeWidth={1.3}
                        className="text-neutral-300"
                      />
                    )}

                  </Link>

                  {/* INFO */}

                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between gap-3">

                      <div>

                        <Link
                          href={`/products/${item.product_id}`}
                          className="text-sm font-medium hover:underline"
                        >
                          {item.title}
                        </Link>

                        <p className="text-[10px] text-neutral-400 mt-1">
                          Product #{item.product_id}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black"
                      >
                        <Trash2
                          size={15}
                          strokeWidth={1.6}
                        />
                      </button>

                    </div>

                    <div className="mt-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">

                      {/* QUANTITY */}

                      <div>

                        <p className="text-[9px] uppercase tracking-wider text-neutral-400 mb-2">
                          Quantity
                        </p>

                        <div className="h-9 flex items-center border border-black/10 rounded-full">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item,
                                item.quantity - 1
                              )
                            }
                            className="w-9 h-full flex items-center justify-center hover:bg-neutral-100 rounded-l-full"
                          >
                            <Minus
                              size={13}
                              strokeWidth={1.8}
                            />
                          </button>

                          <span className="w-8 text-center text-xs">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item,
                                item.quantity + 1
                              )
                            }
                            className="w-9 h-full flex items-center justify-center hover:bg-neutral-100 rounded-r-full"
                          >
                            <Plus
                              size={13}
                              strokeWidth={1.8}
                            />
                          </button>

                        </div>

                      </div>

                      {/* PRICE */}

                      <div className="sm:text-right">

                        <p className="text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                          Total
                        </p>

                        <p className="text-base font-medium">
                          {formatPrice(
                            Number(item.price) *
                              Number(item.quantity)
                          )}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))}

            <div className="pt-5">

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs hover:gap-3 transition-all"
              >
                <ArrowLeft size={14} />
                Continue shopping
              </Link>

            </div>

          </section>

          {/* SUMMARY */}

          <aside className="lg:sticky lg:top-5">

            <div className="bg-black text-white rounded-3xl p-6 sm:p-7">

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Order summary
              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.05em]">
                Summary
              </h2>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between text-sm">

                  <span className="text-white/40">
                    Subtotal
                  </span>

                  <span>
                    {formatPrice(subtotal)}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-white/40">
                    Shipping
                  </span>

                  <span>
                    Free
                  </span>

                </div>

                <div className="h-px bg-white/10" />

                <div className="flex justify-between items-end">

                  <span className="text-sm text-white/40">
                    Total
                  </span>

                  <span className="text-2xl font-medium">
                    {formatPrice(total)}
                  </span>

                </div>

              </div>

              <button
                onClick={checkout}
                disabled={checkoutLoading}
                className="w-full mt-8 h-12 bg-white text-black rounded-full text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition disabled:opacity-50"
              >

                {checkoutLoading ? (
                  'Processing...'
                ) : (
                  <>
                    Checkout
                    <ArrowRight size={14} />
                  </>
                )}

              </button>

            </div>

            {/* BENEFITS */}

            <div className="bg-white rounded-3xl p-5 mt-3">

              <Benefit
                icon={
                  <Check
                    size={15}
                    strokeWidth={1.7}
                  />
                }
                title="Free shipping"
                text="On all orders"
              />

              <Benefit
                icon={
                  <RefreshCcw
                    size={15}
                    strokeWidth={1.7}
                  />
                }
                title="Easy returns"
                text="30 day returns"
              />

              <Benefit
                icon={
                  <ShieldCheck
                    size={15}
                    strokeWidth={1.7}
                  />
                }
                title="Secure payment"
                text="Your data is protected"
              />

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

function Header({
  cartCount,
}: {
  cartCount: number;
}) {
  return (
    <header>

      <div className="h-[58px] bg-white rounded-2xl border border-black/[0.06] px-5 flex items-center justify-between">

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
            className="relative w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center"
          >
            <ShoppingBag
              size={16}
              strokeWidth={1.7}
            />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] rounded-full bg-black text-white text-[8px] flex items-center justify-center">
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
 * BENEFIT
 */

function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">

      <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
        {icon}
      </div>

      <div>

        <p className="text-xs font-medium">
          {title}
        </p>

        <p className="text-[10px] text-neutral-400 mt-0.5">
          {text}
        </p>

      </div>

    </div>
  );
}