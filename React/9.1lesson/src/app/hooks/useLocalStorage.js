"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // Инициализируем состояние. Проверяем, на клиенте ли мы.
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        try {
          return JSON.parse(saved);
        } catch {
          return saved;
        }
      }
    }
    return initialValue;
  });

  // Следим за изменениями значения и пишем в localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}