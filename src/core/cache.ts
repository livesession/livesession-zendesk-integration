import { SessionResponse } from "./objects";

interface Cache<T> {
  data: T;
  expiry: number;
}

export class LocalStorageCache {
  constructor() {}

  set<T>(key: string, data: T, ttlMs: number) {
    const now = new Date();

    const item: Cache<T> = {
      data,
      expiry: new Date(now.valueOf() + ttlMs).valueOf(),
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  get<T>(key: string): T | null {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr) as Cache<T>;
    const now = new Date();

    if (now.valueOf() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.data;
  }
}

const localstorageCache = new LocalStorageCache();

const ms = 1000;
const SESSIONS_CACHE_SECONDS = process.env.SESSIONS_CACHE_SECONDS
  ? parseInt(process.env.SESSIONS_CACHE_SECONDS, 10)
  : ms * 10;

export const DefaultLocalStorageCache = {
  Sessions() {
    return {
      get(issuerEmail: string): SessionResponse | null {
        return localstorageCache.get<SessionResponse>(
          `sessions.${issuerEmail}`
        );
      },
      set(issuerEmail: string, data: SessionResponse) {
        localstorageCache.set<SessionResponse>(
          `sessions.${issuerEmail}`,
          data,
          SESSIONS_CACHE_SECONDS
        );
      },
    };
  },
};
