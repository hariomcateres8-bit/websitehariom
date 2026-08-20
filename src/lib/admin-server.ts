import { createServerFn } from "@tanstack/react-start";
import type { CustomDish, CustomPackage } from "./admin-store";
import fs from "node:fs";
import path from "node:path";

/**
 * Server-side persistence layer for admin panel data.
 *
 * Admin dishes & packages are stored in Cloudflare KV or local JSON file storage
 * so that whatever is added in the Admin Panel is persisted on the server
 * and visible across ALL browsers and devices.
 */

export interface AdminSnapshot {
  customDishes: CustomDish[];
  customPackages: CustomPackage[];
}

const KV_KEY = "hariom_admin_data_v1";
const KV_BINDING = "ADMIN_KV";
const DATA_FILE = path.join(process.cwd(), ".data", "admin_store.json");

type KVNamespace = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
};

function getKV(): KVNamespace | null {
  const env = (globalThis as unknown as { __env__?: Record<string, unknown> }).__env__;
  const kv = env?.[KV_BINDING];
  return (kv as KVNamespace) ?? null;
}

/** In-memory fallback used when no KV binding is available. */
let memoryStore: AdminSnapshot = {
  customDishes: [],
  customPackages: [],
};

function readFromFile(): AdminSnapshot | null {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed?.customDishes) && Array.isArray(parsed?.customPackages)) {
        return parsed as AdminSnapshot;
      }
    }
  } catch (err) {
    console.error("Failed to read admin store file:", err);
  }
  return null;
}

function writeToFile(snapshot: AdminSnapshot): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(snapshot, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write admin store file:", err);
  }
}

export const loadAdminData = createServerFn({ method: "GET" }).handler(async () => {
  const kv = getKV();
  if (kv) {
    try {
      const raw = await kv.get(KV_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AdminSnapshot;
        if (Array.isArray(parsed.customDishes) && Array.isArray(parsed.customPackages)) {
          return parsed;
        }
      }
    } catch {
      // fall through to file or memory store
    }
  }

  const fileData = readFromFile();
  if (fileData) {
    memoryStore = fileData;
    return fileData;
  }

  return memoryStore;
});

export const saveAdminData = createServerFn({ method: "POST" }).handler(async ({ data }) => {
  const snapshot = data as AdminSnapshot;
  const kv = getKV();
  if (kv) {
    try {
      await kv.put(KV_KEY, JSON.stringify(snapshot));
    } catch {
      // ignore persistence errors
    }
  }

  memoryStore.customDishes = snapshot.customDishes;
  memoryStore.customPackages = snapshot.customPackages;
  writeToFile(snapshot);

  return { ok: true };
});
