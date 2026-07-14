class TTLCache {
  constructor() {
    this.store = new Map(); // key -> { value, expiresAt }
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key, value, ttlMs = 30_000) {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  // Deletes an exact key, or every key starting with a prefix
  invalidate(keyOrPrefix) {
    for (const key of this.store.keys()) {
      if (key === keyOrPrefix || key.startsWith(keyOrPrefix)) {
        this.store.delete(key);
      }
    }
  }

  clear() {
    this.store.clear();
  }
}

export default new TTLCache();