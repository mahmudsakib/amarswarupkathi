import { useState, useEffect, useCallback } from "react";
import { v4 } from "./uuid";

export interface CrudOptions<T> {
  storageKey: string;
  defaultData?: T[];
}

export function useLocalCrud<T extends { id: string }>(options: CrudOptions<T>) {
  const { storageKey, defaultData = [] } = options;

  const [items, setItems] = useState<T[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) return JSON.parse(stored);
      if (defaultData.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(defaultData));
        return defaultData;
      }
      return [];
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const addItem = useCallback((item: Omit<T, "id">) => {
    const newItem = { ...item, id: crypto.randomUUID?.() || Date.now().toString() } as T;
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<T>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getItem = useCallback(
    (id: string) => items.find((item) => item.id === id),
    [items]
  );

  return { items, setItems, addItem, updateItem, deleteItem, getItem };
}
