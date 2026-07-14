// Shared in-memory cache for GET requests. Multiple components/hooks asking
// for the same resource (e.g. '/categories') share one cache entry and one
// in-flight request, instead of each firing its own network call.
const cache = new Map();     // key -> data
const inFlight = new Map();  // key -> Promise

export function getCached(key) {
  return cache.has(key) ? cache.get(key) : undefined;
}

export function setCached(key, data) {
  cache.set(key, data);
}

export function getInFlight(key) {
  return inFlight.get(key);
}

export function setInFlight(key, promise) {
  inFlight.set(key, promise);
  promise
    .finally(() => {
      if (inFlight.get(key) === promise) inFlight.delete(key);
    })
    .catch(() => {}); // avoid a duplicate unhandled-rejection warning; 
}

export function invalidate(keyOrPrefix) {
  for (const k of cache.keys()) {
    if (k === keyOrPrefix || k.startsWith(keyOrPrefix)) cache.delete(k);
  }
  for (const k of inFlight.keys()) {
    if (k === keyOrPrefix || k.startsWith(keyOrPrefix)) inFlight.delete(k);
  }
}