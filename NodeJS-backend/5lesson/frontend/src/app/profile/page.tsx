"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f7f4] flex items-center justify-center">
        <span className="text-sm text-[#888]">
          Загрузка...
        </span>
      </div>
    );
  }

  const roleNames: Record<string, string> = {
    buyer: "Покупатель",
    seller: "Продавец",
    admin: "Администратор",
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4]">
      <header>
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="h-[74px] border-b border-black/10 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-[-0.04em]"
            >
              ESTORE
            </Link>

            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-white text-xs hover:bg-black hover:text-white transition"
            >
              ← Каталог
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-[1000px] mx-auto px-5 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#888]">
            Account
          </p>

          <h1 className="text-4xl lg:text-5xl font-medium tracking-[-0.05em] mt-2">
            Мой профиль
          </h1>
        </div>

        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-4">
          {/* PROFILE CARD */}
          <div className="bg-black text-white rounded-[28px] p-7 min-h-[330px] flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl font-medium uppercase">
                {user.email.charAt(0)}
              </div>

              <h2 className="text-xl mt-6 font-medium">
                {user.email}
              </h2>

              <p className="text-white/50 text-sm mt-1">
                {roleNames[user.role] || user.role}
              </p>
            </div>

            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="self-start px-5 py-2.5 rounded-full bg-white text-black text-xs"
            >
              Выйти из аккаунта
            </button>
          </div>

          {/* INFO */}
          <div className="bg-white rounded-[28px] p-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#888]">
              Account information
            </p>

            <h2 className="text-2xl font-medium mt-2 mb-7">
              Данные аккаунта
            </h2>

            <div className="space-y-2">
              <div className="p-5 rounded-[18px] bg-[#f5f5f2] flex justify-between items-center">
                <span className="text-sm text-[#777]">
                  ID пользователя
                </span>

                <span className="text-sm font-medium">
                  #{user.id}
                </span>
              </div>

              <div className="p-5 rounded-[18px] bg-[#f5f5f2] flex justify-between items-center gap-5">
                <span className="text-sm text-[#777]">
                  Email
                </span>

                <span className="text-sm font-medium truncate">
                  {user.email}
                </span>
              </div>

              <div className="p-5 rounded-[18px] bg-[#f5f5f2] flex justify-between items-center">
                <span className="text-sm text-[#777]">
                  Роль
                </span>

                <span className="px-3 py-1 rounded-full bg-black text-white text-[10px]">
                  {roleNames[user.role] || user.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}