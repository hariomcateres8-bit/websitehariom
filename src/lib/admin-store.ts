import { useEffect, useSyncExternalStore } from "react";
import { loadAdminData, saveAdminData } from "./admin-server";

let serverInitPromise: Promise<void> | null = null;
let isInitializedOnServer = false;

/**
 * Loads the shared server data into the localStorage cache so
 * the same dishes/packages added by the admin appear on every browser/device.
 * Server is the source of truth; localStorage is just a fast cache.
 */
export function initAdminData(forceRefresh = false): Promise<void> {
  if (serverInitPromise && !forceRefresh) return serverInitPromise;

  const promise = (async () => {
    try {
      const localDishes = readDishes();
      const localPackages = readPackages();
      const remote = (await loadAdminData()) as AdminSnapshot;

      if (remote && Array.isArray(remote.customDishes) && Array.isArray(remote.customPackages)) {
        if (remote.customDishes.length > 0 || remote.customPackages.length > 0) {
          // Server has data: merge or update local cache
          safeWrite(DISHES_KEY, JSON.stringify(remote.customDishes));
          safeWrite(PACKAGES_KEY, JSON.stringify(remote.customPackages));
          isInitializedOnServer = true;
        } else if (localDishes.length > 0 || localPackages.length > 0) {
          // If server is clean/empty (like on Vercel cold boot) but browser has items,
          // PRESERVE local items and seed the server store
          await saveAdminData({
            data: { customDishes: localDishes, customPackages: localPackages },
          } as never);
          isInitializedOnServer = true;
        } else {
          // Both are empty
          isInitializedOnServer = true;
        }
      }
    } catch {
      // Ignore network errors — fallback to localStorage cache
    } finally {
      invalidate();
      serverInitPromise = null;
    }
  })();

  serverInitPromise = promise;
  return serverInitPromise;
}

/** Pushes the current snapshot to the shared server store (fire-and-forget). */
function syncToServer(): void {
  if (typeof window === "undefined") return;
  const snapshot = { customDishes: readDishes(), customPackages: readPackages() };
  saveAdminData({ data: snapshot } as never).catch(() => {
    // Ignore persistence errors — localStorage cache still works.
  });
}

/**
 * Admin Store — client-side CRUD store backed by a SHARED server store.
 *
 * Menu items and packages added from the Admin Panel are persisted in
 * Cloudflare KV (via server functions) so the SAME data is visible on every
 * browser/device. A localStorage cache keeps the UI interactive, and the
 * server is the source of truth. Every mutation is pushed to the server so
 * all devices stay in sync.
 */

export interface CustomDish {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface CustomPackageCategory {
  name: string;
  count: number;
  note?: string;
  menuItems?: string[];
}

export interface CustomPackage {
  id: string;
  name: string;
  price: number;
  tagline: string;
  image: string;
  color: string;
  minPax: number;
  categories: CustomPackageCategory[];
}

export interface AdminSnapshot {
  customDishes: CustomDish[];
  customPackages: CustomPackage[];
}

const DISHES_KEY = "hariom_custom_dishes_v1";
const PACKAGES_KEY = "hariom_custom_packages_v1";

const listeners = new Set<() => void>();

function safeRead(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore quota / security errors.
  }
}

function parseList<T>(key: string): T[] {
  const raw = safeRead(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

/**
 * Module-level caches keep the useSyncExternalStore snapshot referentially
 * stable (a new object every call would cause infinite re-renders).
 */
let cachedDishes: CustomDish[] | null = null;
let cachedPackages: CustomPackage[] | null = null;
let cachedSnapshot: AdminSnapshot | null = null;

function readDishes(): CustomDish[] {
  if (!cachedDishes) cachedDishes = parseList<CustomDish>(DISHES_KEY);
  return cachedDishes;
}

function readPackages(): CustomPackage[] {
  if (!cachedPackages) cachedPackages = parseList<CustomPackage>(PACKAGES_KEY);
  return cachedPackages;
}

function invalidate(): void {
  cachedDishes = null;
  cachedPackages = null;
  cachedSnapshot = null;
  listeners.forEach((l) => l());
}

function getSnapshot(): AdminSnapshot {
  if (!cachedSnapshot) {
    cachedSnapshot = { customDishes: readDishes(), customPackages: readPackages() };
  }
  return cachedSnapshot;
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

const SERVER_SNAPSHOT: AdminSnapshot = {
  customDishes: [],
  customPackages: [],
};

function getServerSnapshot(): AdminSnapshot {
  return SERVER_SNAPSHOT;
}

/** React hook — re-renders whenever admin data changes and syncs with server. */
export function useAdminData(): AdminSnapshot {
  useEffect(() => {
    initAdminData();

    const onFocus = () => {
      initAdminData(true);
    };

    window.addEventListener("focus", onFocus);
    const interval = setInterval(() => {
      initAdminData(true);
    }, 5000);

    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getCustomDishes(): CustomDish[] {
  return readDishes();
}

export function getCustomPackages(): CustomPackage[] {
  return readPackages();
}

function uid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function addCustomDish(dish: Omit<CustomDish, "id">): CustomDish {
  const newDish: CustomDish = { ...dish, id: uid() };
  safeWrite(DISHES_KEY, JSON.stringify([...readDishes(), newDish]));
  invalidate();
  syncToServer();
  return newDish;
}

export function updateCustomDish(id: string, patch: Partial<Omit<CustomDish, "id">>): void {
  const next = readDishes().map((d) => (d.id === id ? { ...d, ...patch } : d));
  safeWrite(DISHES_KEY, JSON.stringify(next));
  invalidate();
  syncToServer();
}

export function removeCustomDish(id: string): void {
  const next = readDishes().filter((d) => d.id !== id);
  safeWrite(DISHES_KEY, JSON.stringify(next));
  invalidate();
  syncToServer();
}

export function addCustomPackage(pkg: Omit<CustomPackage, "id">): CustomPackage {
  const newPkg: CustomPackage = { ...pkg, id: uid() };
  safeWrite(PACKAGES_KEY, JSON.stringify([...readPackages(), newPkg]));
  invalidate();
  syncToServer();
  return newPkg;
}

export function updateCustomPackage(id: string, patch: Partial<Omit<CustomPackage, "id">>): void {
  const next = readPackages().map((p) => (p.id === id ? { ...p, ...patch } : p));
  safeWrite(PACKAGES_KEY, JSON.stringify(next));
  invalidate();
  syncToServer();
}

export function removeCustomPackage(id: string): void {
  const next = readPackages().filter((p) => p.id !== id);
  safeWrite(PACKAGES_KEY, JSON.stringify(next));
  invalidate();
  syncToServer();
}

export function clearAllAdminData(): void {
  safeWrite(DISHES_KEY, JSON.stringify([]));
  safeWrite(PACKAGES_KEY, JSON.stringify([]));
  invalidate();
  syncToServer();
}

/** The 25 mocktail items to seed into the admin panel under "Mocktails & Beverages". */
export const SEED_MOCKTAILS = [
  "French Kiss",
  "Deep - Blue- Sea",
  "Virgin -Mojito",
  "Blue Heaven",
  "Purple Rain",
  "Rose - Martini",
  "Orange Blossom",
  "Winter Cool",
  "Green Dragon",
  "Hawaiian Kiss",
  "Guava Smoothie",
  "Strawberry Smoothie",
  "Pina Colada",
  "Coconut Litchi Mocktail",
  "Coconut Litchi Cooler",
  "Pink Lady",
  "Guava Strawberry",
  "Blue Logan",
  "Apple Bear",
  "Fruit Punch",
  "Guava Mojito",
  "Lovers Fly",
  "Orange Colada",
  "Pineapple Lemon Mojito",
  "Orange Strawberry",
];

/**
 * Idempotently adds all 25 mocktail items under the "Mocktails & Beverages" category.
 * Only adds items that are not already present so existing user data is preserved.
 */
export function seedMocktailDishes(): void {
  const existing = readDishes();
  const existingNames = new Set(existing.map((d) => d.name.trim().toLowerCase()));
  let added = false;

  for (const name of SEED_MOCKTAILS) {
    if (existingNames.has(name.trim().toLowerCase())) continue;
    existing.push({ id: uid(), name, category: "Mocktails & Beverages", image: "" });
    existingNames.add(name.trim().toLowerCase());
    added = true;
  }

  if (added) {
    safeWrite(DISHES_KEY, JSON.stringify(existing));
    invalidate();
  }
}
