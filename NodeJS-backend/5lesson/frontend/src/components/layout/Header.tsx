'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingCart,
  User,
  LogOut,
  Store,
  Package,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
            <Store size={19} strokeWidth={2} />
          </div>

          <span className="text-lg font-bold tracking-tight text-gray-900">
            Jsprojects-shop
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 md:flex">

          <Link
            href="/"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive('/')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Главная
          </Link>

          <Link
            href="/products"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              pathname.startsWith('/products')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Товары
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-2 md:flex">

          {/* CART */}
          {user?.role === 'buyer' && (
            <Link
              href="/cart"
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${
                isActive('/cart')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title="Корзина"
            >
              <ShoppingCart size={20} strokeWidth={1.8} />
            </Link>
          )}

          {/* PROFILE */}
          {user ? (
            <>
              <Link
                href="/profile"
                className={`ml-1 flex items-center gap-2 rounded-xl border px-3 py-2 transition ${
                  isActive('/profile')
                    ? 'border-gray-300 bg-gray-100'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
                  <User size={15} />
                </div>

                <div className="hidden lg:block">
                  <p className="max-w-[150px] truncate text-xs font-medium text-gray-900">
                    {user.email}
                  </p>

                  <p className="text-[10px] text-gray-500">
                    {user.role === 'buyer'
                      ? 'Покупатель'
                      : user.role === 'seller'
                      ? 'Продавец'
                      : 'Администратор'}
                  </p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                title="Выйти"
              >
                <LogOut size={19} strokeWidth={1.8} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                Войти
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {mobileMenuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                isActive('/')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              <Store size={18} />
              Главная
            </Link>

            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600"
            >
              <Package size={18} />
              Товары
            </Link>

            {user?.role === 'buyer' && (
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive('/cart')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600'
                }`}
              >
                <ShoppingCart size={18} />
                Корзина
              </Link>
            )}

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600"
                >
                  <User size={18} />
                  Профиль
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600"
                >
                  Войти
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}