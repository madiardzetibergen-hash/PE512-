'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShoppingBag,
} from 'lucide-react';

import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const { login } = useAuth();

  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const { data } =
        await api.post('/login', {
          email,
          password,
        });

      login(
        data.token,
        data.user
      );

      router.push('/');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Ошибка авторизации'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f4f1] p-3 sm:p-5">

      <div className="max-w-[1300px] mx-auto">

        {/* HEADER */}

        <header>

          <div className="h-[58px] bg-white rounded-2xl border border-black/[0.06] px-5 flex items-center justify-between">

            <Link
              href="/"
              className="text-[11px] uppercase tracking-[0.25em] font-semibold"
            >
              Market
            </Link>

            <Link
              href="/"
              className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"
            >
              <ShoppingBag
                size={16}
                strokeWidth={1.7}
              />
            </Link>

          </div>

        </header>

        {/* LOGIN */}

        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">

          <div className="w-full max-w-[430px]">

            <div className="bg-white rounded-3xl p-6 sm:p-8">

              {/* ICON */}

              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">

                <LockKeyhole
                  size={19}
                  strokeWidth={1.6}
                />

              </div>

              <p className="mt-7 text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                Welcome back
              </p>

              <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em]">
                Sign in
              </h1>

              <p className="mt-2 text-xs text-neutral-400">
                Sign in to continue shopping.
              </p>

              {/* ERROR */}

              {error && (
                <div className="mt-6 rounded-2xl bg-red-50 text-red-600 px-4 py-3 text-xs">
                  {error}
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >

                {/* EMAIL */}

                <div>

                  <label className="text-[9px] uppercase tracking-wider text-neutral-400">
                    Email
                  </label>

                  <div className="mt-2 h-12 border border-black/10 rounded-2xl flex items-center px-4 focus-within:border-black transition">

                    <Mail
                      size={15}
                      strokeWidth={1.6}
                      className="text-neutral-400 shrink-0"
                    />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      placeholder="you@example.com"
                      className="w-full ml-3 bg-transparent outline-none text-sm"
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <label className="text-[9px] uppercase tracking-wider text-neutral-400">
                    Password
                  </label>

                  <div className="mt-2 h-12 border border-black/10 rounded-2xl flex items-center px-4 focus-within:border-black transition">

                    <LockKeyhole
                      size={15}
                      strokeWidth={1.6}
                      className="text-neutral-400 shrink-0"
                    />

                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder="••••••••"
                      className="w-full ml-3 bg-transparent outline-none text-sm"
                    />

                  </div>

                </div>

                {/* BUTTON */}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 mt-2"
                >
                  {loading
                    ? 'Signing in...'
                    : 'Sign in'}

                  {!loading && (
                    <ArrowRight
                      size={15}
                      strokeWidth={1.8}
                    />
                  )}

                </Button>

              </form>

              {/* REGISTER */}

              <div className="mt-7 pt-6 border-t border-black/[0.06] text-center">

                <p className="text-xs text-neutral-400">

                  Don't have an account?{' '}

                  <Link
                    href="/register"
                    className="text-black font-medium hover:underline"
                  >
                    Create one
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}